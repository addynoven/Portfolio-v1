#  stage-1(build)
FROM node:24-alpine as build-stage
 WORKDIR /app

 COPY package*.json ./
 RUN npm install --production=false

 COPY . .
RUN npm run build

#stage-2
 FROM node:24-alpine as production-stage
 WORKDIR /app

 COPY package*.json ./
 RUN npm install --prod
 RUN npm install -g serve


 COPY --from=build-stage /app/dist ./dist
 EXPOSE 3000

 CMD ["npx", "serve", "-s", "dist", "-l", "3000"]