#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"

# Install dependancies
ssh root@${SERVER_IP} "
  add-apt-repository ppa:certbot/certbot &&
  apt-get update &&
  apt-get -y upgrade &&
  apt-get install -y nginx &&
  apt-get install -y certbot &&
  apt install -y supervisor
"
# Expose ports
ssh root@${SERVER_IP} "ufw allow 'Nginx HTTP'"

# Setup ssl
ssh root@${SERVER_IP} "certbot certonly -n -m jwnwilson@hotmail.co.uk --agree-tos --webroot --webroot-path=/var/www/html -d noel-wilson.co.uk -d www.noel-wilson.co.uk"
ssh root@${SERVER_IP} "openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048"
