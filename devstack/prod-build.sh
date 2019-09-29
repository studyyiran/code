#!/bin/bash

S3_PATH=s3://prod-uptradeit-website/sell-website/build-v0.0.3
APP_WORKSPACE="$(pwd)"

echo "S3_PATH: ${S3_PATH}"
echo "APP_WORKSPACE: ${APP_WORKSPACE}"

/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn -v
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn install
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn run pm2:pub

aws s3 cp build ${S3_PATH} --recursive

cd build
rm -rf build.tar.gz
tar -zcvf build.tar.gz *



