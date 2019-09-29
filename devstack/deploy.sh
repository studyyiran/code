#!/bin/bash

now=`date +%Y%m%d%H%M%S`
echo "now: ${now}"
APP_HOME_PATH=/home/ec2-user/uptrade-home
APP_HOME_BUILD_PATH=/home/ec2-user/uptrade-home/build

mv ${APP_HOME_BUILD_PATH} ${APP_HOME_BUILD_PATH}_${now}
mkdir -p ${APP_HOME_BUILD_PATH}
mv ${APP_HOME_BUILD_PATH}.tar.gz ${APP_HOME_BUILD_PATH}/build.tar.gz
cd ${APP_HOME_BUILD_PATH}
tar -zxvf build.tar.gz
sudo /sbin/nginx -t
sudo /sbin/nginx -s reload