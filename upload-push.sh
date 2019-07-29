#!/bin/bash

cd /home/tmaillard/site_internet/protoUECI

source venv/bin/activate

read -p 'saisir le commentaire du commit:' commentaire

pelican content -s publishconf.py && pelican content -s atlasconf.py

git pull https://github.com/ThoMaCarto/atlasUECI.git

git status

git add --all

git commit -m "$commentaire"

git status

git push https://github.com/ThoMaCarto/atlasUECI.git master