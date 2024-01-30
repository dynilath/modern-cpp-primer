import { defineUserConfig } from "vuepress";
import { redirectPlugin } from "vuepress-plugin-redirect";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/modern-cpp-primer/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Moder C++ Primer",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Moder C++ Primer",
    },
  },

  plugins: [
    redirectPlugin({
      autoLocale: true
    })
  ],

  theme,
});
