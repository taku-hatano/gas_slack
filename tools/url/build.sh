#!/bin/bash

THIS_DIR=$(cd $(dirname $0); pwd)
ROOT_DIR=${THIS_DIR}/../..
GEN_DIR=${ROOT_DIR}/src/gen

. ${THIS_DIR}/../common.sh

rm -rf ${GEN_DIR}
mkdir -p ${GEN_DIR}

npx ts-node ${THIS_DIR}/build.ts --spec ${SLACK_OPENAPI_SPEC} --output ${GEN_DIR}/slack_api.ts