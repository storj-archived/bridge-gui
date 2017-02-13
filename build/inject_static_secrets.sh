#!/usr/bin/env bash

STATIC_PATH=./static/
ENVVARS=$@

function dosub {
  find $STATIC_PATH -type f -print0 | LC_ALL=C xargs -0 sed -i "s/ENV_${1}/\$${2}/g"
}

for VAR in "$@"; do
  NEW_VALUE=${!VAR}
  dosub $VAR $NEW_VALUE
done
