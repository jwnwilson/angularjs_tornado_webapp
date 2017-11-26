#! /bin/bash
# Force shell to fail on any errors.
set -e

source ./venv/bin/activate

find . -iname "*.py" -not -path "./venv/*" | xargs pylint --rcfile=conf/pylintrc
