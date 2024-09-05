#!/bin/sh

# Replace placeholders with environment variable values in index.html
sed -i "s|__VITE_API_BASE_URL__|${VITE_API_BASE_URL}|g" /usr/share/nginx/html/index.html
sed -i "s|__VITE_WEBEX_KEY__|${VITE_WEBEX_KEY}|g" /usr/share/nginx/html/index.html

# Start the main process (e.g., Nginx)
exec "$@"