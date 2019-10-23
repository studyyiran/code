#!/bin/bash

ENV=$1
echo "pm2 start, BUILD: ${ENV}"

pm2 stop uptrade
pm2 delete uptrade
pm2 start /home/ec2-user/uptrade-home/pm2-start.json --env=${ENV}