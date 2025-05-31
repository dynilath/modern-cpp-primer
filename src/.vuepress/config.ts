import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from 'vuepress/utils'

export default defineUserConfig({
  bundler: viteBundler(),
  base: "/modern-cpp-primer/",

  locales: {
    "/": {}, // 绕过vuepress的bug
    "/en/": {
      lang: "en-US",
      title: "Modern C++ Primer",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Modern C++ Primer",
    },
  },
  theme,
  plugins: [
    registerComponentsPlugin({
      components: {
        Choices: path.resolve(__dirname, "./components/Choices.vue"),
        ShikiRenderer: path.resolve(
          __dirname,
          "./components/ShikiRenderer.vue"
        ),
        DecOctHex: path.resolve(__dirname, "./components/DecOctHex.vue"),
        Binary32: path.resolve(__dirname, "./components/Binary32.vue"),
      },
    }),
  ],
});
