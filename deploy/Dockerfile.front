FROM node:16.18.0 as builder

COPY front /front
WORKDIR /front

RUN npm i
RUN npm run build


FROM nginx:latest

COPY --from=builder /front/build /static
COPY deploy/default.conf /etc/nginx/conf.d/default.conf