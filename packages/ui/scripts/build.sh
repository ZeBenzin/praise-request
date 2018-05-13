#!/bin/bash

PROJECT_ROOT="$(cd ../../ && pwd)"

node scripts/build.js
rm -rf $PROJECT_ROOT/build/packages/ui
mkdir -p $PROJECT_ROOT/build/packages/ui
mv build $PROJECT_ROOT/build/packages/ui
cp -r {pm2.json,package.json,server} $PROJECT_ROOT/build/packages/ui
cd $PROJECT_ROOT
rm -rf node_modules
yarn install --production
cp -r node_modules build/packages/ui
