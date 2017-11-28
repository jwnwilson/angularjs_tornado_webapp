#! /bin/bash
PROJECT_ID=jwnwilson-eu

gcloud config set project PROJECT_ID
gcloud config set compute/zone europe-west1

kompose up
