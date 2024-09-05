FROM node:22-alpine3.18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
#VITE
RUN npm run build

FROM nginx:1.25.5-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

#docker container rm -f receta-front
#docker image rm -f receta-front-img

#docker build -t receta-front-img .
#docker container run -d --name receta-front --env-file .env -p 3000:3000 --network receta-red receta-front-img