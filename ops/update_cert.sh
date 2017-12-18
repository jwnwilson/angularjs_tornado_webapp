#! /bin/bash

certbot certonly -n -m jwnwilson@gmail.com --agree-tos -a webroot --webroot-path=/var/www/html -d noel-wilson.co.uk
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
