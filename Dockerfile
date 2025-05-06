FROM oven/bun:1.2.10 AS base

# install curl
RUN apt-get update && apt-get install -y curl


WORKDIR /suru

FROM base AS install
RUN mkdir -p /temp/suru
COPY . /temp/suru/
RUN cd /temp/suru && bun install --frozen-lockfile && bun run build:api

FROM base AS final
COPY --from=install /temp/suru/dist/server ./server
RUN rm -rf /temp/suru

USER bun
ENV NODE_ENV=production

EXPOSE 3000/tcp

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:3000/health" ]

ENTRYPOINT [ "./server" ]
