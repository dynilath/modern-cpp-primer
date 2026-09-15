import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import { rehypeCodeNotation } from "./src/rehype-plugins/code-notation.mjs";
import patchedCpp from "./src/shiki/cpp-extended.mjs";

// 把 rehype 插件追加在 Starlight 的 Expressive Code 之后。
// EC 会在 config:setup 时把自己的 rehype 插件 push 到
// markdown.processor.options.rehypePlugins 的末尾;本集成在
// Starlight 之后执行,再 push 一次即可排在 EC 后面。
function rehypeAfterStarlight() {
  return {
    name: "mcpp:rehype-after-starlight",
    hooks: {
      "astro:config:setup": ({ config }) => {
        const processor = config.markdown?.processor;
        const plugins = processor?.options?.rehypePlugins;
        if (Array.isArray(plugins)) plugins.push(rehypeCodeNotation);
      },
    },
  };
}

export default defineConfig({
  site: "https://dynilath.github.io",
  base: "/modern-cpp-primer",
  trailingSlash: "always",
  markdown: {
    processor: unified(),
  },
  integrations: [
    starlight({
      title: "Modern C++ Primer",
      description:
        "An introductory tutorial to modern CPP, designed to be accurate and understandable",

      defaultLocale: "zh",
      locales: {
        zh: { label: "简体中文", lang: "zh-CN" },
        en: { label: "English", lang: "en" },
      },

      // 侧边栏按 Starlight 惯例使用 slug 内部链接(不含语言段):
      // 标签自动取页面 frontmatter 的 title,英文翻译后自动切换,
      // 一份配置服务所有 locale。
      sidebar: [
        "preface",
        {
          label: "1 初识 C++",
          items: [
            "01-hello-world/hello-world",
            "01-hello-world/id-and-keyword",
            "01-hello-world/literals",
            "01-hello-world/punctuators",
            "01-hello-world/source-processed",
          ],
        },
        {
          label: "2 程序的结构",
          items: [
            "02-program-structure/declaration",
            {
              label: "2.2 初识表达式",
              items: [
                "02-program-structure/expression/brief",
                "02-program-structure/expression/primary-expr",
                "02-program-structure/expression/posix-expr",
                "02-program-structure/expression/unary-expr",
                "02-program-structure/expression/add-mull-expr",
                "02-program-structure/expression/shift-expr",
                "02-program-structure/expression/rel-expr",
                "02-program-structure/expression/logic-expr",
                "02-program-structure/expression/cond-expr",
                "02-program-structure/expression/assign-expr",
                "02-program-structure/expression/comma-expr",
                "02-program-structure/expression/sup-content1",
                "02-program-structure/expression/sup-content2",
              ],
            },
            "02-program-structure/statements",
            "02-program-structure/function",
            "02-program-structure/scope",
            "02-program-structure/name-lookup",
            "02-program-structure/namespace",
            "02-program-structure/object",
            "02-program-structure/cli-program",
          ],
        },
        {
          label: "3 类型",
          items: [
            "03-types/type-intro",
            "03-types/arithmetic-types",
            "03-types/cv-qualifiers",
            "03-types/value-category",
            {
              label: "3.5 引用类型",
              items: [
                "03-types/reference-type/object-ref",
                "03-types/reference-type/function-ref",
              ],
            },
            "03-types/overload",
            "03-types/pointer-type",
            "03-types/array-type",
          ],
        },
        {
          label: "4 STL 初步",
          items: [
            "04-stl-intro/01-container-interface",
            "04-stl-intro/02-vector",
            "04-stl-intro/03-deque",
          ],
        },
        {
          label: "6 工程与构建",
          items: [
            "05-project/01-compile-stage",
            "05-project/02-flag-macros",
          ],
        },
      ],

      lastUpdated: true,
      // Starlight 会自行追加 src/content/docs/<文件路径>,baseUrl 只到分支即可
      editLink: {
        baseUrl: "https://github.com/dynilath/modern-cpp-primer/edit/main",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dynilath/modern-cpp-primer",
        },
      ],
      pagination: true,

      customCss: ["src/styles/custom.css"],

      components: {
        Head: "./src/components/Head.astro",
      },

      expressiveCode: {
        // 必须是数组(Starlight 的 preprocessThemes 不接受 {light,dark} 对象)
        themes: ["github-light", "github-dark"],
        // shiki 插件选项必须放在 shiki 子对象里,顶层会被丢弃
        shiki: {
          // 打了模块关键字补丁的 cpp 语法,替代内置版本
          langs: [patchedCpp],
        },
        styleOverrides: {
          frames: {
            shadowColor: "transparent",
          },
        },
      },
    }),
    rehypeAfterStarlight(),
  ],
});
