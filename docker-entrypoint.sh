#!/bin/sh

# Reemplazar variables de entorno en env.js
envsubst < /usr/share/nginx/html/assets/env.js > /usr/share/nginx/html/assets/env.tmp.js
mv /usr/share/nginx/html/assets/env.tmp.js /usr/share/nginx/html/assets/env.js

exec "$@"