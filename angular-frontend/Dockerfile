# base image
FROM node:12.18.4-alpine3.9 as build-stage

# set working directory
WORKDIR /app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.2

# add app
COPY . /app
ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.19.3-alpine

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

EXPOSE 82

ADD ./nginx-custom.conf /etc/nginx/conf.d/default.conf


