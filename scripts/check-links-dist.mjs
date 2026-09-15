// 产物级回归:遍历每个 zh/en html 页面,把页面内所有内部 href
// 按该页 URL 目录解析,确认落在 dist 内的真实页面上
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, posix } from "node:path";

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p;
  });
}

let total = 0;
let bad = 0;
const pages = walk("dist").filter((f) => f.endsWith(".html"));
for (const page of pages) {
  const rel = page.replaceAll("\\", "/").replace(/^dist\//, "").replace(/index\.html$/, "");
  const html = readFileSync(page, "utf8");
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|#|\/\/)/.test(href)) continue;
    total++;
    let resolved;
    if (href.startsWith("/")) {
      // 绝对链接带 base 前缀(/modern-cpp-primer/...),剥掉后从 dist 根解析
      resolved = href.slice(1).replace(/^modern-cpp-primer\//, "").replace(/\/$/, "") || ".";
    } else {
      const noHash = href.split("#")[0].replace(/\/$/, "");
      resolved = posix.normalize(posix.join(rel, noHash || "."));
    }
    const targetHtml = resolved === "." ? "dist/index.html" : join("dist", resolved, "index.html");
    if (!existsSync(targetHtml) && !existsSync(join("dist", resolved + ".html"))) {
      bad++;
      if (bad <= 15) console.log("BROKEN", "/" + rel, "->", href);
    }
  }
}
console.log("internal hrefs:", total, "broken:", bad);
