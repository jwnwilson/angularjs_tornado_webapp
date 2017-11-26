#!/usr/bin/env bash

COVERAGE_CMD="--cov=. --cov-report html:.cov --cov-report term --cov-config conf/.coveragerc"

source ./venv/bin/activate

if [[ $parallel == 'true' ]]
then
    # Run tests in parallel on 4 processed
    pytest -n 4 $COVERAGE_CMD
else
    # Run tests in one process
    pytest $COVERAGE_CMD
fi
