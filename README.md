# Ar-test v0.2.2 — Anchor Placement

Doel: een kubus van exact **5 × 5 × 5 cm** zo stabiel mogelijk in de echte wereld plaatsen.

## Belangrijkste wijziging

v0.2.1 probeerde pas na plaatsing een anchor te maken.

v0.2.2 probeert de anchor nu **rechtstreeks op het WebXR hit-testresultaat te maken op het moment van tikken**.

Dit is de technisch correcte anchor-flow voor WebXR wanneer `XRHitTestResult.createAnchor()` beschikbaar is.

## Live

Gewoon:
https://gasvdv-lab.github.io/Ar-test/

Cachevrij:
https://gasvdv-lab.github.io/Ar-test/?v=022

## Statusmeldingen

Na plaatsing krijg je één van deze meldingen:

- `GEANKERD — kubus 5 × 5 × 5 cm.`
- `GEEN ANCHOR API — standaard tracking blijft actief.`
- `ANCHOR MISLUKT — standaard tracking: ...`

Als de camera tijdelijk wordt afgedekt, kan ook bij anchors de tracking tijdelijk verdwijnen. Zodra de omgeving weer herkenbaar is, kan ARCore proberen opnieuw te lokaliseren.
