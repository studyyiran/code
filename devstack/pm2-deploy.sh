#!/bin/bash

ENV=$1
echo "pm2 start, BUILD: ${ENV}"

pm2 flush #暂时暴力清理所有日志， 否则日志无限大，影响性能，后续加入pm2-logrotate做日志管理
pm2 stop all
pm2 start /home/ec2-user/uptrade-home/pm2-start.json --env=${ENV}