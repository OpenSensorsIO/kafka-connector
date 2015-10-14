// ------------------------------------
// Logging
var log4js = require('log4js'),
    log = log4js.getLogger('kafka-connector');
log4js.configure({
  appenders: [
    { type: 'console'}
  ]});

// ------------------------------------
// Config
var yaml = require('js-yaml'),
    fs = require('fs'),
    cfg = yaml.safeLoad(fs.readFileSync('/cfg/kafka-connector.yml', 'utf8'));
console.log(cfg);

// ------------------------------------
// MQTT
var mqtt  = require('mqtt'),
    mqtt_client = mqtt.connect('mqtt://' + cfg.mqtt.broker,
                               {clientId: cfg.mqtt.client_id.toString(),
                                username: cfg.mqtt.username,
                                password: cfg.mqtt.device_password});

mqtt_client.on('connect', function() {
  log.info('MQTT Connected, subscribing to ' + cfg.mqtt.consume_topics);
  mqtt_client.subscribe(cfg.mqtt.consume_topics);
});
mqtt_client.on('close', function () { log.warn('MQTT Connection closed'); });
mqtt_client.on('reconnect', function () { log.info('MQTT Reconnecting'); });
mqtt_client.on('offline', function () { log.warn('MQTT Client offline'); });
mqtt_client.on('error', function (err) {
  log.error('MQTT ' + err);
  process.exit(1);
});

// ------------------------------------
// Kafka
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    kafka_client = new kafka.Client(cfg.kafka.zookeeper + ':' + cfg.kafka.zookeeper_port),
    producer = new Producer(kafka_client);

producer.on('error', function(err) {
  log.error('KAFKA ' + err);
  process.exit(1);
});

mqtt_client.on('message', function(topic, message, packet) {
  data = {topic: topic, payload: message.toString()};
  log.info(data);
  producer.send([{topic: cfg.kafka.produce_topic, messages: JSON.stringify(data)}],
                function(err, data) {
                  if (err) log.error('KAFKA ' + err);
                });
});
