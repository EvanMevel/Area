FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN npm install --no-optional --no-audit --no-fund --omit=optional
RUN ln -s /result/app-release.apk /app/public/client.apk
CMD npm run start