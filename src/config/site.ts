/**
 * 站点配置：标题、导航等。以后加新区块（如音乐）只需在这里加一项并建对应页面。
 */
export const siteConfig = {
  title: "東壁飛馬",
  description: "照片与文章",
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/blog" },
    { label: "说说", href: "/shuoshuo" },
    { label: "归档", href: "/archive" },
    { label: "相册", href: "/photos" },
  ],
} as const;
