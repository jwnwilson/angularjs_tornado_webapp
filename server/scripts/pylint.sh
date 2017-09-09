#! /bin/bash
# Force shell to fail on any errors.
set -e

source ./scripts/setup.sh

find . -iname "*.py" -not -path "./venv/*" | xargs pylint --rcfile=conf/pylintrc