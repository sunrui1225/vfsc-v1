# 使用最新的官方 Node.js 镜像作为基础镜像，并命名为 `builder` 阶段
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/node:16.17.1-nslt AS builder

USER root
# 安装 git
RUN yarn config set registry https://registry.npm.taobao.org \
    &&& yarn config set raphael:registry "https://registry.npm.taobao.org" \
    && yarn config set strict-ssl false \
    && yarn config set ignore-engines true \
    && yum install -y git

# 1. 完全禁用 Git 相关功能
# 设置环境变量阻止 Git 操作
ENV GIT_DISABLE=1
ENV GIT_TERMINAL_PROMPT=0
ENV GIT_SSH_COMMAND=""

# 2. 配置 npm 忽略所有 Git 依赖
RUN npm config set git false && \
    npm config set optional false

# 设置工作目录
WORKDIR /app

# 将当前目录下的所有文件复制到容器的工作目录 `/app` 中
COPY --chown=node:node . .

USER node

## 在容器中安装项目依赖
#RUN npm install
#
## 在容器中构建项目
#RUN npm run build:prod

RUN yarn install --prefer-offline \
    && npm run build:prod

# 使用轻量级的官方 Nginx 镜像作为基础镜像
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/nginx_optimized:20240221-1.20.1-2.3.0

# 时区
ENV TZ=Asia/Shanghai

# 本地的 `nginx.conf` 文件复制到容器的 `/etc/nginx/conf.d/default.conf`
COPY nginx.conf /etc/nginx/conf.d/default.conf

# `builder` 阶段中复制构建好的文件到 Nginx 容器的网页根目录 `/usr/share/nginx/html`
COPY --from=builder /app/dist /usr/share/nginx/html
