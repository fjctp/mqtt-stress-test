const SUPPORTED_PROTOCOLS = {
  tcp: 1883,
  mqtt: 1883,
  tls: 8883,
  mqtts: 8883,
  ws: 8083,
  wss: 8084
};

const protocol = 'tcp';

module.exports = {
  broker: {
    protocol: protocol,
    hostname: 'replace.this.com',
    port: SUPPORTED_PROTOCOLS[protocol],
    secret: require('./secret'),
  },
  
  publishers: {
    count: 20,   // number of publishers to use
    message: 4  // number of messages per publisher, frequency is picked randomly
  },
  topics: ['johny-test/test1','johny-test/test2','johny-test/test3','johny-test/test4']
};
