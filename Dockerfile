# 1) Build Angular
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# 2) Imagen Nginx
FROM nginx:alpine

# 1. Crear usuario no-root
RUN adduser -D -H -s /sbin/nologin appuser

# 2. Copiar app compilada
COPY --from=build /app/dist/pokeView/browser /usr/share/nginx/html

# 3. Asegurarnos de que exista la carpeta assets
RUN mkdir -p /usr/share/nginx/html/assets

# 4. Copiar env.js inicial
COPY public/env.js /usr/share/nginx/html/assets/env.js

# 5. Copiar entrypoint para hacer el envsubst
COPY docker-entrypoint.sh /docker-entrypoint.sh

# 6. Dar permisos de escritura al usuario no-root
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx /var/log/nginx \
    && chown -R appuser:appuser \
       /usr/share/nginx/html \
       /var/cache/nginx \
       /var/run/nginx \
       /var/log/nginx \
       /docker-entrypoint.sh \
    && chmod +x /docker-entrypoint.sh

# 7. A partir de aquí todo corre como usuario no-root
USER appuser

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]