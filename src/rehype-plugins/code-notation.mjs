// rehype 插件:在 Expressive Code 渲染完成后处理 Shiki 风格行级标注
//   // [!code error]     -> 该行标记为错误(红色背景)
//   // [!code warning]   -> 该行标记为警告(黄色背景)
//   // [!code highlight] -> 该行标记为高亮(主题色背景)
// 说明:EC 官方 transformers 选项为实验特性且不支持修改代码文本的
// notation transformer;EC 插件的跨阶段钩子状态又不可靠,故在 hast
// 层一次性完成"剥离标注文本 + 标记行"。
// 匹配行内任意位置的标注注释(与 Shiki notation transformer 一致,
// 标注后可以还有其他正文,只移除标注注释本身)
const NOTATION_RE = /[ \t]*(?:\/\/|#)[ \t]*\[!code (error|warning|highlight)\]/;
const NOTATION_RE_GLOBAL = new RegExp(NOTATION_RE.source, "g");

const CLASS_MAP = {
  error: "highlighted-error",
  warning: "highlighted-warning",
  highlight: "highlighted",
};

/**
 * @param {any} node
 * @returns {string[]}
 */
function classNames(node) {
  const cls = node?.properties?.className;
  if (Array.isArray(cls)) return cls;
  if (typeof cls === "string") return cls.split(/\s+/);
  return [];
}

/**
 * 收集节点内(含自身 text)所有文本节点及其累积偏移
 * @param {any} node
 */
function collectTextNodes(node, out = [], offset = { value: 0 }) {
  if (node.type === "text") {
    out.push({ node, start: offset.value, end: offset.value + node.value.length });
    offset.value += node.value.length;
    return out;
  }
  for (const child of node.children ?? []) collectTextNodes(child, out, offset);
  return out;
}

/**
 * 从节点中删除字符区间 [start, end)(基于 textContent 坐标)
 * @param {any} root
 */
function removeTextRange(root, start, end) {
  const texts = collectTextNodes(root);
  for (const { node, start: s, end: e } of texts) {
    if (e <= start || s >= end) continue;
    const from = Math.max(start, s) - s;
    const to = Math.min(end, e) - s;
    node.value = node.value.slice(0, from) + node.value.slice(to);
  }
}

/** @returns {import('unified').Transformer} */
export function rehypeCodeNotation() {
  return (tree) => {
    const lineDivs = [];
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (classNames(node).includes("ec-line")) {
        lineDivs.push(node);
        return;
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);

    for (const div of lineDivs) {
      const texts = collectTextNodes(div);
      const full = texts.map((t) => t.node.value).join("");
      const m = full.match(NOTATION_RE);
      if (!m) continue;
      const start = full.indexOf(m[0]);
      removeTextRange(div, start, start + m[0].length);
      const cls = classNames(div);
      div.properties.className = [...cls, CLASS_MAP[m[1]]];
    }

    // 复制按钮的 data-code 属性同样剥离标注,保证复制到剪贴板的代码干净
    const sanitizeAttrs = (node) => {
      if (!node || typeof node !== "object") return;
      if (typeof node.properties?.dataCode === "string") {
        node.properties.dataCode = node.properties.dataCode.replace(
          NOTATION_RE_GLOBAL,
          "",
        );
      }
      for (const child of node.children ?? []) sanitizeAttrs(child);
    };
    sanitizeAttrs(tree);
  };
}
