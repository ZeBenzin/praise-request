#!/bin/bash

PROJECT_ROOT = "$(cd ../../../ && pwd)"

node build.js
mv ../build %{PROJECT_ROOT}/build/packages/ui
cp -r {pm2.json,package.json,server} %{PROJECT_ROOT}/build/packages/ui
cd %{PROJECT_ROOT}
rm -rf node_modules
yarn install --production
cp node_modules build/packages/ui