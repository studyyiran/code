#!/bin/bash

echo "pm2 start"

pm2 stop uptrade
pm2 delete uptrade
pm2 start /home/ec2-user/uptrade-home/build/compiled.js --name uptrade