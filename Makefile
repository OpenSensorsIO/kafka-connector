.PHONY: run

build:
	docker build --rm -t kafka-connector .

run:
	docker run --rm -v $(shell pwd):/work -v $(shell pwd):/cfg --link kafkaconnector_kafka_1:zookeeper -it kafka-connector node /work/kafka-connector.js
