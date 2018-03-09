FROM node:8
RUN groupadd platform && useradd -g platform platform
COPY package.json package-lock.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY tsconfig.json /usr/src/app/
COPY src/ /usr/src/app/src
RUN npm run build
USER platform
EXPOSE 3000

# to make it reachable from outside container
ENV KONTENA_EXPORTER_LISTEN_ADDRESS=0.0.0.0

CMD ["node", "build/index.js"]
