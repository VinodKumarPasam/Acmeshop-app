FROM node:22-slim AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Copy the static production assets from the 'builder' stage
COPY --from=builder /frontend/dist .
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 555 /usr/share/nginx/html
#USER nginx
EXPOSE 80