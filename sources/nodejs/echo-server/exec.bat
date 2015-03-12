@echo off
cls
start mongod --config mongo.config
start node ./Server.js