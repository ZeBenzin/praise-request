#!/bin/bash

PROJECT_ROOT="$(cd ../../ && pwd)"
echo $PROJECT_ROOT

rm -rf $PROJECT_ROOT/build/packages/server
mkdir -p $PROJECT_ROOT/build/packages/server/build
cp -r . $PROJECT_ROOT/build/packages/server/build
cd $PROJECT_ROOT
cp -r node_modules build/packages/server/build
