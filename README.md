# cser's Blog

个人技术与产品博客，基于 [Hexo](https://hexo.io/) 静态博客框架 + Icarus 主题生成。

- **博客地址**：[www.cskevin.com](http://www.cskevin.com)
- **主题**：Icarus（已定制）
- **内容方向**：移动开发、产品设计、信息安全、机器学习

---

## 本地运行

这是一个**纯静态站点**，无需 Node.js、数据库或任何构建步骤，直接用任意 HTTP 服务器即可预览。

### 方式一：Python（推荐，零依赖）

```bash
# 进入项目根目录
cd csHexo.github.io

# 启动本地服务（默认 8080 端口）
python3 -m http.server 8080
```

浏览器打开 [http://localhost:8080](http://localhost:8080) 即可查看效果。

### 方式二：VS Code Live Server 插件

安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件后，在 VS Code 中右键 `index.html` → **Open with Live Server**。

### 方式三：Node.js serve

```bash
npx serve .
```

---

## 项目结构

```
cser's Blog/
│
├── index.html              # 首页（文章列表）
├── page/2/                 # 首页第 2 页
├── favicon.png             # 网站图标
├── README.md               # 项目文档
│
├── 2015/                   # 博客文章（按 年/月/日/英文slug 组织）
│   ├── 03/09/android-csdroid-library-design/
│   ├── 03/10/product-review-magi-search-engine/
│   ├── 03/14/gradle-publish-to-jcenter/
│   ├── 03/19/mac-tips-get-root-access/
│   ├── 03/20/mac-tips-update-svn-version/
│   ├── 04/23/life-journal-whats-new/
│   ├── 06/15/wordpress-tips-php-password/
│   ├── 08/12/product-research-what-is-great-product/
│   └── 08/23/git-tips-server-setup/
│
├── about/index.html        # 关于页
├── recommend/index.html    # 推荐页
├── archives/               # 归档（全部 / 按年月）
├── categories/             # 分类页
│   ├── product-design/     # 产品设计
│   ├── tech/               # 技术研发
│   └── life/               # 生活随笔
├── tags/                   # 标签页（全英文小写 kebab-case）
│
└── assets/                 # 所有静态资源
    ├── css/
    │   ├── style.css       # 主样式表（含12个模块注释分区，约2100行）
    │   └── images/         # 头像、缩略图等图片资源
    ├── js/
    │   └── script.js       # 主交互逻辑（分享框/图片灯箱/回到顶部）
    └── lib/
        ├── fancybox/       # FancyBox 2.x 图片灯箱
        └── font-awesome/   # Font Awesome 4.x 图标字体
```

---

## 修改内容

### 修改样式

编辑 `assets/css/style.css`，文件已按模块添加注释分区，便于定位：

| 分区注释 | 内容 |
|----------|------|
| `/* CSS Reset */` | 基础样式重置 |
| `/* Base Styles */` | body、排版、颜色 |
| `/* Layout & Grid */` | 响应式三栏布局 |
| `/* Header & Navigation */` | 顶栏、导航、搜索框 |
| `/* Profile Sidebar */` | 头像卡片、作者信息 |
| `/* Article */` | 文章内容、元信息、分享框 |
| `/* Archive, Tags & Categories */` | 归档列表、目录、分页 |
| `/* Footer */` | 页脚 |
| `/* Code Syntax Highlighting */` | 代码块高亮样式 |
| `/* Sidebar Widgets */` | 侧栏小组件 |
| `/* UI Components */` | 回到顶部按钮 |
| `/* Mobile & Android Optimizations */` | 移动端触控优化 |

### 修改交互逻辑

编辑 `assets/js/script.js`，文件已全部注释，包含四个功能模块：

1. **Share Box**：文章分享按钮（Twitter / Facebook / Pinterest / Google+）
2. **Image Captions & FancyBox**：图片自动加说明文字 + 灯箱效果
3. **Profile Card Dropdown**：小屏幕下头像点击展开个人信息卡片
4. **Back-to-Top Button**：滚动进度超过阈值后固定显示"回到顶部"按钮

### 添加新文章

由于这是 Hexo **预编译产物**，添加文章需要在原始 Hexo 源码仓库中执行 `hexo generate`，然后将生成的文件替换到本仓库。

如需快速手动添加，可参考现有文章目录结构（如 `2015/08/23/git-tips-server-setup/index.html`），按相同格式创建新的 `index.html`，目录名使用英文 kebab-case。

---

## 技术栈

| 依赖 | 版本 | 用途 |
|------|------|------|
| jQuery | 3.7.1（jsDelivr CDN） | DOM 操作、事件绑定 |
| Font Awesome | 4.x（本地） | 图标字体 |
| FancyBox | 2.x（本地） | 图片灯箱 |
| Google Fonts | Open Sans、Source Code Pro | 正文与代码字体 |

---

## 响应式断点

```
≥ 1200px  桌面宽屏   三栏布局（侧栏 + 主内容 + 右侧栏）
800-1199px 桌面/平板  两栏布局（主内容 + 右侧栏）
560-799px  平板横屏   单栏，顶部移动导航
≤ 559px   手机        单栏，精简布局，触控优化
```

---

## 更新记录

### 2026-03（第三轮）目录与文件规范化

- **文章目录**：9 个中文路径全部重命名为英文 kebab-case slug
- **分类目录**：`产品设计` / `技术研发` / `生活随笔` → `product-design` / `tech` / `life`
- **标签目录**：8 个中文标签改为英文，`Bintray` / `jCenter` 统一小写
- **资源目录**：`css/` `js/` `fancybox/` `font-awesome/` 统一归入 `assets/` 下
- **博客名称**：`csKevin's Blog` → `cser's Blog`（页面标题、meta、页脚全部同步）
- 全站 42 个 HTML 文件路径引用同步更新

### 2026-03（第二轮）注释优化 + 移动端适配

- `assets/css/style.css` 新增 12 个模块注释分区，1990 行无注释 → 结构清晰
- `assets/js/script.js` 全部注释重写，每个功能模块有清晰说明
- 修复两处 `border-color` CSS 语法错误（无效值导致边框不显示）
- 新增移动端优化模块：去除 Android 点击蓝色高亮、消除 300ms 延迟、48dp 触控目标、`#toTop` 移动端定位修复、代码块横向滚动
- 全站 41 个 HTML 添加 `<meta name="theme-color">` 支持 Android Chrome 主题色

### 2026-03（第一轮）基础修复

- 修复所有 HTML 中错误的 `/hexo-theme-icarus/` 资源路径前缀（960 处）
- 废弃 `useso.com` CDN → Google Fonts + jsDelivr
- jQuery 2.0.3 → 3.7.1
- 移除全站无效 Disqus 脚本及残留容器
- 修复 `href="javascript:;"` 无效链接
- 修复导航首页链接 `href="/."`
