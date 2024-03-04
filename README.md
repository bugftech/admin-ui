# admin-ui

后台管理系统

## 💿 Install

使用您首选的包管理器设置您的项目。使用相应的命令安装依赖：

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

完成安装后，您的环境已准备好进行 Admin UI 开发。

## 💡 Usage

本节介绍如何启动开发服务器并构建生产项目

### 启动开发环境

要通过热重载启动开发服务器，请运行以下命令。可以通过 [http://localhost:3000](http://localhost:3000) 访问服务器：

```bash
yarn dev
```

(使用相应的命令对 npm、pnpm 和 Bun 重复上述操作)

> 添加 NODE_OPTIONS='--no-warnings' 以抑制作为 Vuetify 导入映射的一部分发生的 JSON 导入警告。如果您使用的是 Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) 或更高版本，则可以将其更改为 NODE_OPTIONS='--disable-warning=5401'。如果您不介意该警告，可以将其从 package.json 开发脚本中删除。

### 构建生产环境

要构建生产项目，请使用：

```bash
yarn build
```

(使用相应的命令对 npm、pnpm 和 Bun 重复上述操作)


构建过程完成后，您的应用程序就可以在生产环境中部署了。

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2024-present Bugfreed, Inc
