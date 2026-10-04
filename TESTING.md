# TESTING v0.2.4 — Rigid World Lock

Open:

https://gasvdv-lab.github.io/Ar-test/?v=024

## Test A — basis

1. Start AR.
2. Scan de vloer rustig.
3. Tik één keer op de witte ring.
4. Kubus 1 verschijnt onmiddellijk.
5. Daarna elke 5 seconden één extra kubus.
6. Na 5 kubussen is de totale hoogte 25 cm.

## Test B — stabiliteit tijdens bouwen

Tijdens de 20 seconden waarin de stapel groeit:

1. beweeg de gsm rustig links/rechts;
2. stap iets naar voren en achteren;
3. verander de kijkhoek;
4. controleer of de basis van de stapel op dezelfde fysieke plek blijft.

Belangrijk:
de nieuwe kubussen mogen alleen bovenop de bestaande stapel verschijnen.
De basis mag NIET telkens opnieuw worden berekend of verplaatst.

## Test C — kort trackingverlies

1. Plaats de eerste kubus.
2. Bedek de camera kort.
3. Maak de camera weer vrij.
4. Richt opnieuw naar dezelfde omgeving.

Tijdens trackingverlies bevriest de app de laatst bekende transform. Hij voert geen nieuwe hit-test of herplaatsing uit.

## Status

Let vooral op of de melding na tikken aangeeft:

- `Anchor beschikbaar. Rigid World Lock actief.`
of
- `Geen Anchor API. Vaste world pose wordt gebruikt.`

Geef deze melding door samen met wat je visueel ziet.
