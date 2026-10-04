# ARCube50cm

Minimale WebXR-test om via GitHub Pages op Android een kubus van exact **50 × 50 × 50 cm** in de echte omgeving te plaatsen.

## Wat deze versie doet

- start een `immersive-ar` WebXR-sessie;
- gebruikt hit testing om een echt oppervlak te zoeken;
- toont een reticle op het gevonden oppervlak;
- plaatst bij tikken één kubus van **0,5 m × 0,5 m × 0,5 m**;
- zet het middelpunt 0,25 m omhoog, zodat de onderzijde van de kubus op het oppervlak rust;
- opnieuw tikken verplaatst dezelfde kubus.

## Publiceren op GitHub Pages

1. Maak een nieuwe GitHub-repository, bijvoorbeeld `ARCube50cm`.
2. Pak de ZIP uit en upload **alle bestanden rechtstreeks in de root** van de repository.
3. Ga in GitHub naar **Settings → Pages**.
4. Kies bij *Build and deployment* voor **Deploy from a branch**.
5. Selecteer `main` en `/ (root)`.
6. Open daarna de GitHub Pages-URL op de Androidtelefoon.

Voor repository `gasvdv-lab/ARCube50cm` wordt de gebruikelijke URL:

`https://gasvdv-lab.github.io/ARCube50cm/`

## Techniek

Three.js + WebXR. De geometrie wordt aangemaakt met:

`new THREE.BoxGeometry(0.5, 0.5, 0.5)`

WebXR gebruikt meters als ruimtelijke eenheid, dus `0.5` staat voor 50 cm.

## Vereisten

De telefoon/browser moet `immersive-ar` en WebXR hit testing ondersteunen. De site moet via HTTPS draaien; GitHub Pages voldoet daaraan.
