#!/bin/bash

BUILD=$1
APP_WORKSPACE="$(pwd)"
BUILD=$1

echo "APP_WORKSPACE: ${APP_WORKSPACE}, BUILD: ${BUILD}"

/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn -v
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn install
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn run ${BUILD}

cd build
rm -rf build.tar.gz
tar -zcvf build.tar.gz *