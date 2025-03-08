FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder

# build env dependencies (wont be baked in)
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG CRON_SECRET
ARG PREVIEW_SECRET

ARG GITHUB_SHA
ARG GITHUB_DATETIME

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "pnpm-lock.yaml not found." && exit 1; \
  fi


FROM base AS runner

# Bake in some metadata
ARG GITHUB_SHA
ARG GITHUB_DATETIME
ENV GITHUB_SHA=${GITHUB_SHA}
ENV GITHUB_DATETIME=${GITHUB_DATETIME}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
