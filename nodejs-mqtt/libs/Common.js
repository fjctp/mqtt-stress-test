#!/usr/bin/env node

const crypto = require('crypto');

function parseJSON(json_str) {
  try {
    return JSON.parse(json_str);
  }
  catch (ex) {
    return null
  }
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInts(len, min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const base64_str = crypto.randomBytes(len*2)
                           .toString('base64');
  
  var rand_ints = [];
  for (var i=0; i<len; i++) {
    const charCode = base64_str[i].charCodeAt(0);
    rand_ints.push(Math.floor(charCode/126 * (max - min)) + min);
  }
  return rand_ints;
}

module.exports = {
  parseJSON: parseJSON,
  getRandomInt: getRandomInt,
  getRandomInts: getRandomInts
}
