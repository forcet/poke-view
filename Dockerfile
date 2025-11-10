# 1) Build Angular
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# 2) Imagen Nginx
FROM nginx:alpine

# Copiar app compilada
COPY --from=build /app/dist/pokeView/browser /usr/share/nginx/html

# Asegurarnos de que exista la carpeta assets
RUN mkdir -p /usr/share/nginx/html/assets

# Copiar env.js base
COPY public/env.js /usr/share/nginx/html/public/env.js

# Copiar entrypoint para hacer el envsubst
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Permisos para usuario no-root (UID aleatorio con GID 0)
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx /var/log/nginx /run \
    && chgrp -R 0 /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx /run \
    && chmod -R g+rwX /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx /run

RUN sed -i 's/listen *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen \[::\]:80;/listen \[::\]:8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]