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

# Copiar env.js como env.js (que luego sobrescribiremos)
COPY public/env.js /usr/share/nginx/html/assets/env.js

# Copiar entrypoint para hacer el envsubst
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
