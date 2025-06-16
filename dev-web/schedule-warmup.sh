#!/bin/sh
set -e

mkdir -p /etc/crontabs
# run once at start
/ping-endpoints.sh
# schedule every minute
echo "* * * * * /ping-endpoints.sh" > /etc/crontabs/root
crond
exec nginx -g 'daemon off;'
