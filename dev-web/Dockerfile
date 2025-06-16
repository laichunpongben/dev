# Build stage
FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# write warmup endpoints to a file for the frontend
ARG WARMUP_ENDPOINTS="[]"
RUN echo "$WARMUP_ENDPOINTS" > /warmup.json

# Production stage
FROM nginx:alpine
RUN apk add --no-cache curl jq
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /warmup.json /usr/share/nginx/html/warmup.json
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY warmup.sh /warmup.sh
COPY warmup-cron.sh /warmup-cron.sh
RUN chmod +x /warmup.sh /warmup-cron.sh
EXPOSE 80
CMD ["/warmup.sh"]
