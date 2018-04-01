#!/bin/bash

set -e 

if [ $# -lt 3 ]; then
  echo "test_sub SERVER USERNAME PASSWORD TOPIC"
  exit
fi

hostname=$1
port=1883
username=$2
password=$3

topic=$4

echo "From: $topic"

while true; do 
  mosquitto_sub -h $hostname -p $port \
	-u $username -P $password \
	-t "$topic";
#  sleep 1;
done
