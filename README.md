# Ar-test v0.1.1 — WebXR Diagnose

Deze release is een diagnoseversie voor:

https://gasvdv-lab.github.io/Ar-test/

## Doel

Achterhalen waarom de knop START AR uitgeschakeld blijft.

De pagina controleert:

- HTTPS / secure context
- `navigator.xr`
- WebGL2
- `navigator.xr.isSessionSupported("immersive-ar")`
- browser/user-agent
- directe `requestSession("immersive-ar")`
- foutnaam en foutmelding wanneer starten mislukt

## Installeren

Vervang de huidige bestanden in de root van de GitHub-repository `Ar-test` door de bestanden uit deze ZIP.

Daarna wachten tot GitHub Pages opnieuw gedeployed is en openen:

https://gasvdv-lab.github.io/Ar-test/

Maak daarna een screenshot van de volledige diagnosepagina.
