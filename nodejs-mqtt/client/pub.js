#!/usr/bin/env node
'use strict';

const hostname = require('os').hostname();
const config = require('../config/config');
const dateMessage = require('../libs/DateMessage')
const common = require('../libs/Common')
const connection = require('../libs/Connection')

const NUM_CLIENTS = config.publishers.count;
const NUM_MSG_PER_CLIENT = config.publishers.message;
const all_intervals_ms = common.getRandomInts(NUM_CLIENTS*NUM_MSG_PER_CLIENT,
                                             30,
                                             80);

for (var i=0; i<NUM_CLIENTS; i++) {
  const START_INDEX = i*NUM_MSG_PER_CLIENT;
  const END_INDEX = START_INDEX+NUM_MSG_PER_CLIENT;
  const intervals_ms = all_intervals_ms.slice(START_INDEX, END_INDEX);
  
  const topic_index = common.getRandomInt(0, config.topics.length);
  const topic = config.topics[topic_index];
  const client = connection.create(config.broker);

  client.on('connect',
            connection.constructEventCb.OnConnect(client, topic));
  client.on('reconnect',
            connection.constructEventCb.OnReconnect(client));
  
  //var intervals_ms = [500];
  intervals_ms.forEach(function (interval_ms) {
  	setInterval(publish_timestamp,
                interval_ms,
                client,
                client.options.clientId,
                topic);
  });
}

function publish_timestamp(mqtt_client, from_who, topic) {
  const msg = dateMessage.construct(from_who,
                                    Date.now());
  mqtt_client.publish(topic, JSON.stringify(msg));
}
