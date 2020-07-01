##############################################################
# This file is intended to be used with ./docker-compose.yml #
##############################################################

FROM node:12.16.3-alpine as build
# working directory
WORKDIR /usr/src/app

# global environment setup : yarn + dependencies needed to support node-gyp
RUN apk --no-cache --virtual add \
    python \
    make \
    g++ \
    yarn

# set env variable for CI
ENV CI=true

# copy just the dependency files and configs needed for install
COPY src/ src/
COPY docker/.env.docker.dev .env
COPY static/ static/
COPY package.json yarn.lock babel.config.js local-intercept.js prettier.config.js upward.yml webpack.config.js template.html server.js .npmrc ./

# install dependencies with yarn
RUN yarn install --frozen-lockfile

# build the app
RUN yarn run build

# MULTI-STAGE BUILD
FROM node:12.16.3-alpine
# working directory
WORKDIR /usr/src/app
# node:alpine comes with a configured user and group
RUN chown -R node:node /usr/src/app
# copy build from previous stage
COPY --from=build /usr/src/app .
USER node
# command to run application
CMD [ "yarn", "watch"]
