import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "1. Hello, World!",
      prefix: "01-hello-world/",
      children: "structure",
      collapsible: false
    },
    {
      text: "2. 控制流",
      prefix: "02-flow-control/",
      children: "structure",
      collapsible: false
    },
    {
      text: "3. 类型系统",
      prefix: "03-types/",
      children: "structure",
      collapsible: false
    },
    {
      text: "4. STL入门",
      prefix: "04-stl-intro/",
      children: "structure",
      collapsible: false
    },
    {
      text: "5. 中型项目",
      prefix: "05-project/",
      children: "structure",
      collapsible: false
    },
  ],
});
