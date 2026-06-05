# syntax=docker/dockerfile:1

# ---- Build stage -----------------------------------------------------------
FROM oven/bun:1.3 AS build
WORKDIR /app

# Install dependencies (cached on lockfile changes)
COPY package.json bun.lock turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

# Build the docs app (prebuild = sitemap, build = vite, postbuild = pagefind)
COPY . .
RUN bun run build

# ---- Runtime stage ---------------------------------------------------------
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The self-hosted TanStack Start server + prerendered static client (incl. pagefind)
COPY --from=build /app/apps/web/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server/server.js"]
