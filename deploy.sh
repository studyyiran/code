#!/bin/bash

now=`date +%Y%m%d%H%M%S`
echo "now: ${now}"

mv /home/ec2-user/uptrade-home/build /home/ec2-user/uptrade-home/build_${now}
mkdir -p /home/ec2-user/uptrade-home/build
mv /home/ec2-user/uptrade-home/build.tar.gz /home/ec2-user/uptrade-home/build/build.tar.gz
cd /home/ec2-user/uptrade-home/build
tar -zxvf build.tar.gz
sudo /sbin/nginx -t
sudo /sbin/nginx -s reload