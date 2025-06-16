#!/bin/sh
WARMUP_FILE=/usr/share/nginx/html/warmup.json

ping_endpoints() {
  if [ -f "$WARMUP_FILE" ]; then
    jq -r '.[]' "$WARMUP_FILE" | while read -r url; do
      curl -fsS "$url" >/dev/null 2>&1 &
    done
  fi
}

ping_endpoints
while true; do
  sleep 60
  ping_endpoints
done &

exec nginx -g 'daemon off;'
