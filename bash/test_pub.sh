#!/bin/bash

# this program send current time to MQTT broker
# time format: %H:%M:%S:%N, hour: minute, sec, nano sec
# time format: %s, seconds since 1970-01-01 00:00:00 UTC

set -e 

if [ $# -lt 3 ]; then
  echo "test_pub SERVER USERNAME PASSWORD TOPIC"
  exit
fi

hostname=$1
port=1883
username=$2
password=$3

topic=$4

echo "To: $topic"

while true; do 
  mosquitto_pub -h $hostname -p $port \
	-u "$username" -P "$password" \
	-t "$topic" -m "$(date +%H:%M:%S:%N)";
#  sleep 1;
done
