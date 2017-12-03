#!/usr/bin/env bash

PUBLIC_URL=/quasitrello yarn run build
rm -rf docs
mv build docs