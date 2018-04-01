#!/usr/bin/env node

function construct(from_who, date_in_ms) {
  return {
    from: from_who,
    date: date_in_ms
  };
};

function compute_dms(msg1, msg2) {
  return msg2.date - msg1.date ;
}

module.exports = {
  construct: construct,
  compute_dms: compute_dms
}