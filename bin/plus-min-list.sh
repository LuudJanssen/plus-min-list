#!/usr/bin/env bash

NODE_PATH=. node index.js | ./node_modules/.bin/bunyan -o short
