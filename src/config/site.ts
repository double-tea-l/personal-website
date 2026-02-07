/**
 * 站点配置：标题、导航等。以后加新区块（如音乐）只需在这里加一项并建对应页面。
 */
export const siteConfig = {
  title: "我的个人站",
  description: "照片与阅读笔记",
  nav: [
    { label: "首页", href: "/" },
    { label: "阅读笔记", href: "/blog" },
    { label: "说说", href: "/shuoshuo" },
    { label: "归档", href: "/archive" },
    { label: "相册", href: "/photos" },
  ],
} as const;
