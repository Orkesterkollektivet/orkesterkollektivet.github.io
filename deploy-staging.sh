#!/bin/bash
rsync -av --exclude='.git' ./ welcome.amundsen.pro:/var/www/staging.orkesterkollektivet.no/
