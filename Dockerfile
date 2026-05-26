FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --config.dangerouslyAllowAllBuilds=true

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_MERCHANT_ID
ARG NEXT_PUBLIC_SESSION_ID
ARG NEXT_PUBLIC_DEFAULT_PAGE_SIZE

ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_MERCHANT_ID=$NEXT_PUBLIC_MERCHANT_ID
ENV NEXT_PUBLIC_SESSION_ID=$NEXT_PUBLIC_SESSION_ID
ENV NEXT_PUBLIC_DEFAULT_PAGE_SIZE=$NEXT_PUBLIC_DEFAULT_PAGE_SIZE

RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]