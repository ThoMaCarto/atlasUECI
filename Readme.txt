Les site internet est accessible sur la page : https://thomacarto.github.io/atlasUECI

#Procédure de travail


## Ouvrir le dossier du site dans le terminal 
$ cd site_internet/proto

## Ouvrir un espace de travail virtuel
$ source venv/bin/activate

## Travailler sur un server local de développement
$ make devserver

## Publier les modifications
$ pelican content -s publishconf.py

##publier les modifications dans atlas/
$ pelican content -s atlasconf.py

##Ou les deux à la fois
pelican content -s publishconf.py && pelican content -s atlasconf.py


# Procédure de mise à jour sur github

## Verifier que tous les fichiers modifié sont indexé par Git
$ git status

## Indexer les fichiers modifiés dans le dossier public
$ git add public

## Valider les modifications
$ git commit -m "commentaires"

## Importer les modifications faites sur la branche master de Github
$ git pull https://github.com/ThoMaCarto/atlasUECI.git

## pousser les fichiers modifier en local vers github
$ git push https://github.com/ThoMaCarto/atlasUECI.git master
 
