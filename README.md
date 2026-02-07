# 个人网站（照片 + 文章）

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

### 让 /admin 在 Vercel 上能登录（GitHub OAuth）

项目里已带好 OAuth 代理（`api/auth`、`api/callback`），你只需：

1. **创建 GitHub OAuth App**  
   - 打开 [GitHub → Settings → Developer settings → OAuth Apps → New OAuth App](https://github.com/settings/applications/new)。  
   - **Application name**：随意，例如 `personal-website-cms`。  
   - **Homepage URL**：填你的 Vercel 站点地址，例如 `https://personal-website-ochre-chi-22.vercel.app`。  
   - **Authorization callback URL**：填 `https://你的Vercel站点地址/api/callback`（例如 `https://personal-website-ochre-chi-22.vercel.app/api/callback`）。  
   - 点 **Register application**，记下 **Client ID** 和 **Client secrets**（点 Generate a new client secret 生成一个）。

2. **在 Vercel 里配置环境变量**  
   - 打开 Vercel 项目 → **Settings** → **Environment Variables**。  
   - 添加（Production、Preview 可都勾选）：  
     - `OAUTH_CLIENT_ID` = 上一步的 Client ID  
     - `OAUTH_CLIENT_SECRET` = 上一步的 Client secret  
     - `ORIGIN` = 你的站点地址，例如 `https://personal-website-ochre-chi-22.vercel.app`  
     - `COMPLETE_URL` = 你的站点地址 + `/api/callback`，例如 `https://personal-website-ochre-chi-22.vercel.app/api/callback`

3. **重新部署**  
   - 在 Vercel 的 **Deployments** 里对最新一次部署点 **Redeploy**，或本地改任意文件后 `git push` 触发部署。

4. **验证**  
   - 打开 **https://你的站点地址/admin**，点 **Login with GitHub**，应能完成登录并在后台写文章。

若你之后换了域名（例如绑定自定义域名），需要：  
- 在 GitHub OAuth App 里改 **Homepage URL** 和 **Authorization callback URL**；  
- 在 Vercel 里改 `ORIGIN`、`COMPLETE_URL`；  
- 在 `public/config.yml` 里改 `backend.base_url` 和 `site_url`。

### 备选：改用 Netlify 部署（用 Git Gateway，无需 OAuth App）

若不想维护 GitHub OAuth App，可把站部署到 Netlify 并用 Git Gateway：在 Netlify 开启 Identity + Git Gateway，把 `public/config.yml` 的 `backend.name` 改为 `git-gateway`、`site_url` 改为 Netlify 地址，并删掉 `backend.repo`、`base_url`、`auth_endpoint`。

## 项目结构

- `src/config/site.ts`：站名、导航（以后加音乐等区块可在此加链接）。
- `src/content/blog/`：文章的 Markdown（也可在 /admin 里写）。
- `public/photos/`：相册图片；在 /admin 上传的媒体会放这里。
- `public/admin/`：Decap CMS 后台入口与说明。
- `api/auth.js`、`api/callback.js`：Vercel 上用于 GitHub 登录的 OAuth 代理。

## 扩展

- **新区块（如音乐）**：在 `src/config/site.ts` 的 `nav` 里加一项，再在 `src/pages/` 下建对应页面即可。
- **评论**：可后续接入 Giscus（GitHub Discussions）或 Disqus。
