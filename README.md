# [Praise Request](https://praiserequest.io) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

This repository contains the code for [praiserequest.com](https://praiserequest.com).

## Getting started

This repository makes use of yarns experimental workspaces feature.

### Prerequisites

* Git
* Node: install version 7.8 or greater
* Yarn
* MongoDB locally installed with mongod running

### Installation

**UI**

1.  `git clone` this repo
2.  cd `praise-request`
3.  `yarn`
4.  cd `packages/ui`
5.  `yarn start`

**Server**

1.  cd `packages/server`
2.  `API_SECRET=<api_secret> API_KEY=<api_key> node index.js`

Open `http://localhost:3000` to view the site.
