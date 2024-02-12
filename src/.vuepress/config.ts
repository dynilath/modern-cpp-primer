import { defineUserConfig } from "vuepress";
import { redirectPlugin } from "vuepress-plugin-redirect";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  bundler: viteBundler(),
  base: "/modern-cpp-primer/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Modern C++ Primer",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Modern C++ Primer",
    },
  },

  plugins: [
    redirectPlugin({
      autoLocale: true
    })
  ],

  theme,
});
