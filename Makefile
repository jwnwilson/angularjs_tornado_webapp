ifndef VERSION
	# Get the active git branch
	VERSION=$(shell ./server/scripts/version.sh)
endif

help:
	@echo "setup - Installs required python modules and node modules in docker volumes"
	@echo "run - Runs the app locally on docker compose"
	@echo "test-be - Runs server linting and tests"
	@echo "test-be - Runs client linting and tests"
	@echo "shell - Runs bash shell on server container"

COMPOSE = docker-compose
SERVER = server
CLIENT = client

setup:
	$(COMPOSE) run $(SERVER) ./scripts/setup.sh
	$(COMPOSE) run $(CLIENT) npm install

run:
	$(COMPOSE) up

test-be:
	$(COMPOSE) run $(SERVER) ./scripts/pylint.sh
	$(COMPOSE) run $(SERVER) ./scripts/test.sh

test-fe:
	$(COMPOSE) run $(CLIENT) npm test

shell:
	$(COMPOSE) run $(SERVER) bash