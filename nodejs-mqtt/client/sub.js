#!/usr/bin/env node
'use strict';

const hostname = require('os').hostname();
const config = require('../config/config');
const dateMessage = require('../libs/DateMessage');
const common = require('../libs/Common');
const connection = require('../libs/Connection');

for (var i=0; i<config.topics.length; i++) {
  const topic = config.topics[i];
  const client = connection.create(config.broker);
  
  client.on('connect',
            connection.constructEventCb.OnConnect(client, topic));
  client.on('reconnect',
            connection.constructEventCb.OnReconnect(client));
  
  client.on('message', constructEventCb(client));
}

function constructEventCb(clientObj) {
  return function onMessage(t, msg) {
    // message is Buffer
    const current_msg = dateMessage.construct(hostname,
                                              Date.now());
    const remote_msg = common.parseJSON(msg);
    if (remote_msg !== null) {
      console.log("dms: " + dateMessage.compute_dms(remote_msg, current_msg) +
                  ", (client)" + clientObj.options.clientId +
                  ", (publisher)" + remote_msg.from +
                  ", (topic)" + t);
    }
  };
}
