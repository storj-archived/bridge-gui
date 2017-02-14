#!/usr/bin/env bash

STATIC_PATH=./static/
ENVVARS=$@

function dosub {
  echo "Replacing $1 in all static content starting at path $STATIC_PATH with $2"
  find $STATIC_PATH -type f -print0 | LC_ALL=C xargs -0 sed -i "s/ENV_${1}/\$${2}/g"
}

for VAR in "$@"; do
  NEW_VALUE=${!VAR}
  dosub $VAR $NEW_VALUE
done
