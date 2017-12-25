#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"
TODAY=$(date +"%m_%d_%Y")


# Copy project to server
zip -r /tmp/project.zip . -x ./server/venv/**\* ./server/.cov/**\* ./client/node_modules/**\*
scp /tmp/project.zip root@${SERVER_IP}:/tmp/project.zip
ssh root@${SERVER_IP} "unzip /tmp/project.zip -d /opt/app/noelwilson_${TODAY}"
ssh root@${SERVER_IP} "rm /opt/app/current && ln -s /opt/app/noelwilson_${TODAY} /opt/app/current"

# Copy nginx conf
scp ./ops/noewilson.conf root@${SERVER_IP}:/etc/nginx/sites-enabled/noelwilson.conf

# Copy supervisor conf
scp ./ops/supervisor.conf root@${SERVER_IP}:/etc/supervisor/conf.d/noelwilson.conf

# Run make setup on box
ssh root@${SERVER_IP} "docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)"
ssh root@${SERVER_IP} "rm -rf /opt/app/current/client/node_modules"
ssh root@${SERVER_IP} "cd /opt/app/current/ && make build && make setup && make run-fe-build"

ssh root@${SERVER_IP} "supervisorctl restart all"
ssh root@${SERVER_IP} "systemctl restart nginx"
