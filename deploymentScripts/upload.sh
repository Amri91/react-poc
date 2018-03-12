#!/usr/bin/env bash
rm -rf ./dist
mkdir ./dist
cp ./{backgroundImage.jpg,bundle.js,index.html,favicon.ico,userDefaultImage.png,restaurantDefaultImage.png,navigationIcon.svg} dist/
mkdir ./dist/style
cp -R style/ dist/style/
aws s3 sync --delete ./dist s3://testbucket-for-anton/