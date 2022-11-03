FROM node:18-alpine
COPY . .
WORKDIR /app
RUN npm install --no-optional --no-audit --no-fund --omit=optional
CMD npm run dev