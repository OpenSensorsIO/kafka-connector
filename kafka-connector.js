var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console'}
  ]});
var log = log4js.getLogger('kafka-connector');

yaml = require('js-yaml');
var producer = require('prozess').Producer;

var mqtt  = require('mqtt');

var broker = ('http://opensensors.io');
var port = 1883;

log.info("hello!");
