#!/bin/sh
set -e

# Default to port 3000 if PORT is not set
PORT="${PORT:-3000}"

# Replace PORT_PLACEHOLDER with actual port in nginx config
sed -i "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/conf.d/default.conf

# Start nginx as nginx user
echo "Starting nginx on port $PORT..."
exec su-exec nginx nginx -g 'daemon off;' 