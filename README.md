# Ar-test v0.2.4 — Rigid World Lock Stack

Deze versie is specifiek gebouwd om het verschuiven van de constructie tijdens het stapelen te verminderen.

## Kernarchitectuur

Na één tik:

1. De hit-testpose wordt één keer als geometrische waarheid opgeslagen.
2. Er wordt één `worldRoot` aangemaakt.
3. Indien beschikbaar wordt één echte WebXR-anchor gekoppeld aan exact dat hit-testpunt.
4. Alle vijf kubussen worden uitsluitend als lokale children onder `worldRoot` toegevoegd.
5. Na plaatsing wordt de hit-testbron geannuleerd.
6. De stapel wordt dus nooit opnieuw gepositioneerd op basis van nieuwe hit-tests.
7. Bij tijdelijk trackingverlies blijft de laatst bekende world-transform bevroren.
8. Een eenmalige no-jump correctiematrix voorkomt dat de constructie verspringt zodra de eerste anchorpose beschikbaar wordt.

## Afmetingen

Elke kubus:
- 5 cm breed
- 5 cm diep
- 5 cm hoog

Volledige stapel:
- 25 cm hoog

## Timing

- kubus 1: onmiddellijk
- kubus 2: +5 s
- kubus 3: +10 s
- kubus 4: +15 s
- kubus 5: +20 s

## Live

Gewoon:
https://gasvdv-lab.github.io/Ar-test/

Cachevrij:
https://gasvdv-lab.github.io/Ar-test/?v=024
