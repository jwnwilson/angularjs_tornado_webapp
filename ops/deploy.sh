#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"

make run-fe-build

rsync -a . root@${SERVER_IP}:/opt/app

ssh root@${SERVER_IP} "supervisorctl restart all"
ssh root@${SERVER_IP} "systemctl restart nginx"
