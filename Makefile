ifndef VERSION
	# Get the active git branch
	VERSION=$(shell ./server/scripts/version.sh)
endif

help:
	@echo "setup - Installs required python modules and node modules in docker volumes"
	@echo "run - Runs the app locally on docker compose"

COMPOSE = docker-compose
SERVER = server
CLIENT = client

setup:
	$(COMPOSE) run $(SERVER) ./scripts/setup.sh
	$(COMPOSE) run $(CLIENT) npm install

run:
	$(COMPOSE) up

shell:
	$(COMPOSE) run $(SERVER) bash