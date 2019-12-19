#!/bin/bash

APP_WORKSPACE="$(pwd)"
S3_PATH=s3://prod-uptradeit-website/sell-website/build
LAST_VERSION=${S3_PATH}-v0.13.0

echo "APP_WORKSPACE: ${APP_WORKSPACE}, S3_PATH: ${S3_PATH}, LAST_VERSION: ${LAST_VERSION}"

/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn -v
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn install
/home/ec2-user/node-v8.11.4-linux-x64/bin/yarn run ssr:prod

aws s3 mv ${S3_PATH} ${LAST_VERSION} --include '*' --recursive
aws s3 cp build ${S3_PATH} --recursive

cd build
rm -rf build.tar.gz
tar -zcvf build.tar.gz *