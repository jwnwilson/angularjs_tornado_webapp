#! /bin/bash
PROJECT_ID=jwnwilson-eu

# Build static files for front end
make run-fe-build

gcloud auth application-default login

gcloud config set project $PROJECT_ID
gcloud config set compute/zone europe-west1-b

docker build -f ./ops/Dockerfile_server -t gcr.io/${PROJECT_ID}/web:v1 .
docker build -f ./ops/Dockerfile_mongo_setup -t gcr.io/${PROJECT_ID}/db:v1 .
docker build -f ./ops/Dockerfile_nginx -t gcr.io/${PROJECT_ID}/nginx:v1 .

gcloud docker -- push gcr.io/${PROJECT_ID}/web:v1
gcloud docker -- push gcr.io/${PROJECT_ID}/db:v1
gcloud docker -- push gcr.io/${PROJECT_ID}/nginx:v1

#gcloud container clusters create web-cluster --num-nodes=3 --machine-type=g1-small
#gcloud container clusters get-credentials web-cluster

#kompose convert -f ./ops/kubernetes/docker-compose-deploy.yaml

kubectl create -f ./ops/kubernetes/all.yaml

# This job needs to run once the db server is up and running
kubectl create -f ./ops/kubernetes/db-job.yaml

# This job will refresh the ssl cert for https
kubectl create -f ./ops/kubernetes/cert-job.yaml
