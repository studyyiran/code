#!/bin/bash

APP_WORKSPACE="$(pwd)"

echo "APP_WORKSPACE: ${APP_WORKSPACE}"

/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn -v
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn install
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn run pm2:pub

cd build
rm -rf build.tar.gz
tar -zcvf build.tar.gz *