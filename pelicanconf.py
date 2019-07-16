#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Thomas Maillard'
SITENAME = u'Atlas Eau Potable Assainissement Côte d\'Ivoire Bouaké'
SITETITRE = u'Atlas Urgence Eau Bouaké'
SITEURL = 'http://localhost:8000'
SITEDESCRIPTION = ''
TIMEZONE = 'Europe/Paris'
DEFAULT_LANG = u'fr'

#Configuration particulière de l'Atlas
#Coordonnées du coin Sud-ouest et Nord-est
BORDER_LIMIT = '[[7.5,-4.8],[7.9,-5.3]]'
# Les coordonnées du centroide de la carte générale
CENTRAGE_MAP = '[7.75, -5.038]'
#Le niveau de zoom de la carte générale
ZOOM_GENERAL = '11'

LOAD_CONTENT_CACHE = False
CONTENT_CACHE = None

#publier dans public/ avec pelican content -s publishconf.py
#$ pelican content -o output -s pelicanconf.py
#$ ghp-import output
#$ git push origin gh-pages

INDEX_SAVE_AS = 'index.html'

DISPLAY_PAGES_ON_MENU = False
DEFAULT_DATE = 'fs'


# configuration des chemins

THEME = 'ue-theme'
THEME_STATIC_DIR = 'static'
THEME_TEMPLATES_DIR = 'templates'

PATH = 'content'
ARTICLE_PATHS = ['articles']
PAGE_PATHS = ['pages']


STATIC_PATHS = ['doc','articles/images', 'pages/image']
DOC_STATIC_DIR = 'doc'


ARTICLE_SAVE_AS = 'articles/{slug}.html'
ARTICLE_URL = 'articles/{slug}.html'

PAGE_SAVE_AS = 'pages/{slug}.html'
PAGE_URL = 'pages/{slug}.html'


#ARTICLE_ORDER_BY = 'basename'


#PLUGIN_PATHS = 'pelican-plugins'
#PLUGINS = ['pelican_javascript']

# all defaults to True.
DISPLAY_HEADER = True
DISPLAY_FOOTER = True
DISPLAY_HOME   = True
DISPLAY_MENU   = True
DISPLAY_INFO_ON_MENU = True


# use those if you want pelican standard pages to appear in your menu
MENU_INTERNAL_PAGES = (
    ('Diagnostic<br>localités','pages/vulnerabilite.html','pages/vulnerabilite.html'),
    ('Diagnostic<br>points d\'eau','pages/analyse-des-points-deau.html','pages/analyse-des-points-deau.html'),
   
    )  

SUBMENU_INTERNAL_PAGES = (
    ('L\'étude','pages/projet.html','pages/projet.html'),
    ('Les méthodes de diagnostic','pages/methodes-de-diagnostic.html','pages/methodes-de-diagnostic.html'),
    ('Les auteurs','pages/auteurs-de-letude.html','pages/auteurs-de-letude.html'),    
    ('Télécharger les données', 'pages/telechargements.html', 'pages/telechargements.html'),    
    ('Contacts','pages/contacts.html','pages/contacts.html'),
    )
    
  
    
# additional menu items
MENUITEMS = (	     
    ('<br>Urgence Eau', 'http://urgenceeau.com/'),
    #('Linux Kernel', 'https://www.kernel.org/'),
)

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None



# Social widget
#SOCIAL = (('You can add links in your config file', '#'),
#         ('Another social link', '#'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = False
OUTPUT_PATH = 'docs/'
