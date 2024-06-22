import { hopeTheme } from "vuepress-theme-hope";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({

  iconAssets: "fontawesome-with-brands",
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
      autoLocale: true
    },
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
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
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
