#!/bin/bash

echo "pm2 start"

pm2 stop sell
pm2 delete sell
pm2 start /home/ec2-user/uptrade-home/build/compiled.js --name sell