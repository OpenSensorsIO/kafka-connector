FROM node:4

RUN npm install mqtt js-yaml kafka-node log4js opensensors-log4js-logstash

ADD kafka-connector.js kafka-connector.js

CMD node kafka-connector.js
