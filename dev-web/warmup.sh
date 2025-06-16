#!/bin/sh
set -e

mkdir -p /etc/crontabs
# run once at start
/warmup-cron.sh
# schedule every minute
echo "* * * * * /warmup-cron.sh" > /etc/crontabs/root
crond
exec nginx -g 'daemon off;'
