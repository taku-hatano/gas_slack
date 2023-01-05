#!/bin/bash

THIS_DIR=$(cd $(dirname $0); pwd)
ROOT_DIR=${THIS_DIR}/../..
GEN_DIR=${ROOT_DIR}/types/gen

. ${THIS_DIR}/../common.sh

rm -rf ${GEN_DIR}
mkdir -p ${GEN_DIR}

npx openapi-typescript ${SLACK_OPENAPI_SPEC} --output ${GEN_DIR}/slackapi.d.ts