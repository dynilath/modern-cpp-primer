// shiki cpp 语法补丁:让模块关键字 import / export / module 获得关键字着色。
// 内置 cpp TextMate 语法不含模块语法的词法规则(唯一的 import 规则是
// 预处理器的 #import),`import std;` 整行会被当作纯文本。
// 用法:
//   EC:        expressiveCode.langs = [patchedCpp]
//   直接 shiki: createHighlighter({ langs: [patchedCpp] })
import bundled from "shiki/langs/cpp.mjs";

const bundledRegs = (bundled.default ?? bundled).map((g) => structuredClone(g));

// 内置数组中 c/regexp/glsl/sql 各出现两次,按 name 去重(保留后者,source.cpp 在后者组中)
const byName = new Map();
for (const g of bundledRegs) byName.set(g.name, g);
const registrations = [...byName.values()];

const main = registrations.find((g) => g.scopeName === "source.cpp");

if (!main) {
  throw new Error(
    "cpp grammar patch: source.cpp 不在 shiki/langs/cpp.mjs 导出中,需要重新核对这个补丁",
  );
}

// 顶层上下文最前面插入模块关键字规则,使其优先于"普通标识符"匹配。
// scope 用 keyword.other.*,github 亮/暗主题都会映射为关键字色。
main.patterns.unshift({
  match: "(?<!\\w)(?:import|export|module)(?!\\w)",
  name: "keyword.other.module.cpp",
});

export default registrations;
