FROM node:22-slim
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN chmod 644 package*.json
RUN npm ci
COPY --chown=node:node src ./src
RUN chmod -R 755 src
USER node
ENV NODE_ENV=production
EXPOSE 3002
CMD ["node","src/app.js"]