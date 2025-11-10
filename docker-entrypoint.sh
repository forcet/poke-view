set -e

ENV_FILE="/usr/share/nginx/html/public/env.js"

echo "Reemplazando variables en $ENV_FILE..."

if [ -f "$ENV_FILE" ]; then
  envsubst < "$ENV_FILE" > "${ENV_FILE}.tmp"
  mv "${ENV_FILE}.tmp" "$ENV_FILE"
else
  echo "⚠️  $ENV_FILE no existe, no se reemplazan variables."
fi

exec "$@"