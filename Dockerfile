FROM node:0.10

RUN npm install mqtt prozess js-yaml log4js opensensors-log4js-logstash

ADD kafka-connector.js kafka-connector.js

CMD node kafka-connector.js
