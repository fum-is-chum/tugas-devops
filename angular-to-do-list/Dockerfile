FROM node:18-alpine as dependencies
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile

FROM dependencies as builder
COPY . .
RUN pnpm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/to-do-list /usr/share/nginx/html
EXPOSE 80