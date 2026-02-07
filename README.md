# 个人网站（照片 + 阅读笔记）

Astro + Tailwind + Decap CMS，支持在浏览器里写文章、点发布更新网站。

## 本地运行

```bash
cd /Users/tl759k/Documents/GitHub/personal-website
npm run dev
```

浏览器打开 http://localhost:4321 。

## 作为个人项目部署到 GitHub

1. **在个人 GitHub 账号下建新仓库**（如 `personal-website`），不要 push 到 cursor-analytics。

2. **在本项目目录初始化 Git 并推送到你的仓库：**
   ```bash
   cd /Users/tl759k/Documents/GitHub/personal-website
   git init
   git add .
   git commit -m "Initial: Astro + Decap CMS"
   git remote add origin https://github.com/double-tea-l/personal-website.git
   git branch -M main
   git push -u origin main
   ```
   （若仓库名不用 `personal-website`，请把上面 URL 和下面的 `config.yml` 里的仓库名改成你建的仓库名。）

3. **Decap 配置**  
   当前 `public/admin/config.yml` 已填为 `double-tea-l/personal-website`。若你的仓库名不同，改一下 `repo` 即可。

4. **部署站点：**  
   - [Vercel](https://vercel.com)：连 GitHub 仓库，自动用 `npm run build` 部署。  
   - [Netlify](https://netlify.com)：同样连仓库，Build 命令填 `npm run build`，发布目录填 `dist`。

## 用编辑器发文章（/admin）

- 部署后访问 **你的网站地址/admin**（如 `https://你的站点.vercel.app/admin`）。
- 首次使用需登录：用 **Netlify** 部署时可用 Netlify Identity；若用 **Vercel** 部署，需在 Decap 文档里配置 GitHub OAuth 或使用 [Decap 的 serverless 方案](https://decapcms.org/docs/backends-overview/)。
- 在「阅读笔记」里新建或编辑文章，写完后点 **发布**，会自动 commit 到 GitHub，触发重新构建，网站即更新。

## 项目结构

- `src/config/site.ts`：站名、导航（以后加音乐等区块可在此加链接）。
- `src/content/blog/`：阅读笔记的 Markdown（也可在 /admin 里写）。
- `public/photos/`：相册图片；在 /admin 上传的媒体会放这里。
- `public/admin/`：Decap CMS 配置与入口。

## 扩展

- **新区块（如音乐）**：在 `src/config/site.ts` 的 `nav` 里加一项，再在 `src/pages/` 下建对应页面即可。
- **评论**：可后续接入 Giscus（GitHub Discussions）或 Disqus。
