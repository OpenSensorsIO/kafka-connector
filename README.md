# kafka-connector
Real time Kafka Connector to streaming sensor data

## Usage

### Setup configurtation

1. Setup a user in opensensors.io
2. Create atleast 2 devices and some topics
3. Edit `kafka-connector.yml` and update
    * `client_id`
    * `device_password`
    * `username`
    * `consume_topics`

### Build the kafka-connector container

`$ make build`

### Start the Kafka broker

* Make sure you have `docker` and `docker-compose` installed

* `$ docker-compose up`

### Test the connector

* Make sure you have `kafka` CLI tools and `mosquitto` installed

* Create the kafka topic `opensensors`

`$ kafktopics.sh --create --zookeeper 192.168.99.101:2181 --replication-factor 1 --partitions 1 --topic opensensors`

* Start a listener

`$ kafka-console-consumer.sh --zookeeper 192.168.99.101:2181 --topic opensensors --from-beginning`

Please note that `192.168.99.101` is the IP of your docker machine, change to match your system.

* Start the kafka-connector

`$ make run`

* Publish some data on opensensors.io

`$ mosquitto_pub -h mqtt.opensensors.io -i <CLIENTID> -t <TOPIC> -u <USER> -m 'My first message' -P <PASSWORD>`
