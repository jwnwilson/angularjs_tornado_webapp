#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"

# Copy project to server
rsync -av --progress . root@${SERVER_IP}:/opt/app

# Copy nginx conf
scp ./ops/default.conf root@${SERVER_IP}:/etc/nginx/sites-enabled/default

# Copy supervisor conf
scp ./ops/supervisor.conf root@${SERVER_IP}:/etc/supervisor/conf.d/noelwilson.conf

# Run make setup on box
ssh root@${SERVER_IP} "rm -rf /opt/app/client/node_modules"
ssh root@${SERVER_IP} "cd /opt/app && make build && make setup && make run-fe-build"

ssh root@${SERVER_IP} "supervisorctl restart all"
ssh root@${SERVER_IP} "systemctl restart nginx"
