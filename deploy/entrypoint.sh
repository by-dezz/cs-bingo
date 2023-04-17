#!/bin/bash

wait-for-it db:5432 -t 10 || exit 1

if [ "$1" = "server" ]; then
  exec python main.py runprocess

elif [ "$1" = "migrate" ]; then
  exec python main.py update

else
  echo "Invalid command"
  exit 1
fi
