.PHONY: run

build:
	docker build --rm -t kafka-connector .

run:
	docker run --rm -v $(shell pwd):/work --link kafkaconnector_kafka_1:kafka -it kafka-connector node /work/kafka-connector.js
