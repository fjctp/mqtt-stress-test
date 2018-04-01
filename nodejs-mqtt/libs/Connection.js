#!/usr/bin/env node
'use strict';

const mqtt = require('mqtt');

function createConnection(broker_config) {
  var path = '/';
  if (['ws','wss'].indexOf(broker_config.protocol)!=-1)
    path = '/mqtt';
  const url = broker_config.protocol + '://'
              + broker_config.hostname + ':'
              + broker_config.port
              + path;
  const opts = {
    username: broker_config.secret.username,
    password: broker_config.secret.password
  };
  console.log('Connect to ' + url)
  return mqtt.connect(url, opts);
}

function constructOnConnectCb(clientObj, topic) {
  return function () {
    if (topic!==null) {
      clientObj.subscribe(topic);
      console.log(clientObj.options.clientId + ' publishes to ' + topic);
    }
  };
}

function constructOnReconnectCb(clientObj) {
  return function () {
    console.log(clientObj.options.clientId + ' reconnecting');
  };
}

module.exports = {
  create: createConnection,
  constructEventCb: {
    OnConnect: constructOnConnectCb,
    OnReconnect: constructOnReconnectCb
  }
};
