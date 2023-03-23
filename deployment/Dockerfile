FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build
RUN npm prune --production

FROM node:14-alpine AS production
WORKDIR /app
COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/accesstoken.pub ./accesstoken.pub
COPY --from=builder /app/accesstoken.private ./accesstoken.private
COPY --from=builder /app/ormconfig.js ./ormconfig.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/migrations ./migrations

EXPOSE 3000

ENV PORT 3000


CMD ["yarn", "start:prod"]