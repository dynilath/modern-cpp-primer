// 一次性迁移脚本:src/zh(VuePress 源) -> src/content/docs/zh(Starlight 源)
// 用法:node scripts/migrate-content.mjs
// 可重复运行(幂等):源目录不存在时直接退出。
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src", "zh");
const DEST = path.join(ROOT, "src", "content", "docs", "zh");

if (!fs.existsSync(SRC)) {
  console.log(`源目录不存在(${SRC}),无需迁移。`);
  process.exit(0);
}

// 这些章节/子章节 README 是纯占位(frontmatter 只有 index:false + order),
// 标题已进 astro.config.mjs 的侧边栏,内容不迁移。
const SKIP_FILES = new Set(
  [
    "01-hello-world/README.md",
    "02-program-structure/README.md",
    "02-program-structure/expression/README.md",
    "03-types/README.md",
    "03-types/reference-type/README.md",
  ].map((p) => p.replaceAll("/", path.sep)),
);

// 容器类型映射:theme-hope -> Starlight aside
const CONTAINER_MAP = { info: "note", tip: "tip", important: "caution", note: "note" };

let stats = { files: 0, containers: 0, mdx: 0, quizzes: 0, h1: 0 };

function walk(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out;
}

function decodeEntities(s) {
  return s.replaceAll("&#34;", '"').replaceAll("&#92;", "\\").replaceAll("&#39;", "'");
}

function transformBody(body, rel) {
  const lines = body.split("\n");

  // 1) 容器首行映射:仅改首行,正文与结束 ::: 不动;tabs 留给手工处理
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^:::\s*(info|tip|important|note)\s*(.*)$/);
    if (m) {
      const type = CONTAINER_MAP[m[1]];
      const title = m[2].trim();
      lines[i] = title ? `::: ${type}[${title}]` : `::: ${type}`;
      stats.containers++;
    }
  }

  // 2) 去掉与 frontmatter title 重复的正文首 H1(Starlight 会渲染 title 为页头)
  const firstIdx = lines.findIndex((l) => l.trim() !== "");
  if (firstIdx !== -1) {
    const h1 = lines[firstIdx].match(/^#\s+(.+)$/);
    if (h1) {
      const t = h1[1].trim();
      const title = currentTitle;
      if (title === t || title.endsWith(t)) {
        lines.splice(firstIdx, 1);
        stats.h1++;
      }
    }
  }

  let text = lines.join("\n");

  // 3) <Choices :questions="..."/> -> <Quiz questions={...}/> 并补 import
  // 注意:捕获组必须直接包住 [^"]*;若写成 ((?:[^"]))*(捕获组套在量词里),
  // JS 只保留最后一次重复,捕获值会退化成单个字符。
  const choicesRe = /<Choices\s+:questions="([^"]*)"\s*\/>/gs;
  if (choicesRe.test(text)) {
    text = text.replace(choicesRe, (_m, attr) => {
      stats.quizzes++;
      return `<Quiz questions={${decodeEntities(attr)}} />`;
    });
  }

  return text;
}

// frontmatter 解析与清理
let currentTitle = "";
function transformFrontmatter(fm) {
  const lines = fm.split("\n");
  const kept = [];
  let title = "";
  for (const line of lines) {
    if (/^order:/.test(line) || /^index:\s*false\s*$/.test(line)) continue;
    const t = line.match(/^title:\s*(.+)$/);
    if (t) title = t[1].trim();
    kept.push(line);
  }
  currentTitle = title;
  return kept.join("\n");
}

const files = walk(SRC);
for (const rel of files) {
  if (SKIP_FILES.has(rel)) continue;
  if (!rel.endsWith(".md")) {
    // 非文档资源不迁移(孤儿图片等由删除源目录一并清掉)
    console.log(`  跳过并删除非文档文件:${rel}`);
    continue;
  }

  const raw = fs.readFileSync(path.join(SRC, rel), "utf8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  let body = raw.slice(fmMatch ? fmMatch[0].length : 0);
  let fm = fmMatch ? transformFrontmatter(fmMatch[1]) : "";

  const usesComponent =
    /<Choices|<DecOctHex|<Binary32|<ShikiRenderer/.test(body) ||
    rel.endsWith(path.join("02-program-structure", "cli-program.md")); // tabs 手工改写,也要 .mdx

  body = transformBody(body, rel);

  // 组件 import 注入到 frontmatter 之后
  const imports = [];
  if (/<Quiz /.test(body)) imports.push("import Quiz from '@components/Quiz.astro';");
  if (/<DecOctHex\s*\/>/.test(body)) imports.push("import DecOctHex from '@components/DecOctHex.astro';");
  if (/<Binary32\s*\/>/.test(body)) imports.push("import Binary32 from '@components/Binary32.astro';");

  const isIndex = rel === "README.md";
  let outRel = rel;
  if (isIndex) outRel = "index.md";
  if (usesComponent || imports.length) outRel = outRel.replace(/\.md$/, ".mdx");

  // zh/README.md 没有 frontmatter,补一个
  if (!fmMatch) {
    fm = "title: Modern C++ Primer";
  }
  if (isIndex && !/^title:/m.test(fm)) {
    fm = `title: Modern C++ Primer\n${fm}`;
  }

  const out = `---\n${fm.trim()}\n---\n\n${imports.length ? imports.join("\n") + "\n\n" : ""}${body.trimStart()}`;
  const dest = path.join(DEST, outRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
  stats.files++;
  if (outRel.endsWith(".mdx")) stats.mdx++;
}

// 迁移完成,删除源目录(含跳过的 README 与孤儿图片,孤儿图片此前已被确认无引用)
fs.rmSync(SRC, { recursive: true, force: true });

console.log(`迁移完成:${stats.files} 个 md 文件`);
console.log(`  容器改写:${stats.containers} 处`);
console.log(`  转为 .mdx:${stats.mdx} 个文件`);
console.log(`  Quiz 组件替换:${stats.quizzes} 处`);
console.log(`  去除重复 H1:${stats.h1} 处`);
