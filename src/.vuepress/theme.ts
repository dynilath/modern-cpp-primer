import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  repo: "dynilath/moder-cpp-primer",

  docsDir: "src",

  locales: {
    "/zh/": {
      sidebar: zhSidebar,
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
    "/en/": {
      sidebar: enSidebar,
      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  encrypt: {
    config: {
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    components: {
      components: ["Badge", "VPCard"],
    },
    redirect: {
      autoLocale: true,
    },
    icon: {
      assets: "fontawesome-with-brands",
    },
  },
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    vPre: true,
    mermaid: true,
    markmap: true,
    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
    },
    highlighter: {
      type: "shiki",
      themes: { light: "github-light", dark: "github-dark" },
      langs: ["cpp", "powershell", "bash", "cmd"],
      notationDiff: true,
      notationHighlight: true,
      notationErrorLevel: true,
      notationWordHighlight: true,
    },
  },
});
