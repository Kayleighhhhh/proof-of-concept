# Tweakers Community Dashboard
Een interactief, mobile-first dashboard dat RSS feeds en een dynamische grafiek van de Tweakers forums laat zien op een overzichtelijke website.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Dit project is een website die data en feeds van de Tweakers forums ophaalt en visualiseert. De website bestaat uit een centraal overzicht (dashboard) met actuele feeds en specifieke detailpagina's die dieper op de content ingaan. De focus ligt op een snelle, toegankelijke gebruikerservaring.

- [live website](https://proof-of-concept-d99b.onrender.com/)

<img width="1518" height="697" alt="image" src="https://github.com/user-attachments/assets/0f467707-2684-4674-a422-c5113b935895" />


## Gebruik
Bij het bouwen van de frontend stonden progressive enhancement en performance op de eerste plek. Dit is hoe de drie belangrijkste onderdelen technisch in elkaar zitten:

1. Progressive Enhancement
De basis van de site (de content en de routes) werkt altijd, ongeacht de browser of het apparaat. Moderne features zijn gelaagd toegevoegd als extra luxe:

- view transition: In de CSS is de @view-transition { navigation: auto; } regel gebruikt. Browsers die dit al ondersteunen laten een vloeiende animatie zien wanneer je van het dashboard naar een detailpagina navigeert. Oudere browsers negeren dit en laden de pagina op de normale manier zonder dat er iets breekt.

- Dark mode: Via @media (prefers-color-scheme: dark) verandert de interface automatisch mee met de systeemvoorkeur van de gebruiker, zonder dat daar JavaScript voor nodig is.

- CSS grafiek: De pie chart is volledig met CSS gebouwd via een conic-gradient() en custom properties (var(--start) en var(--procent)). Hierdoor is er geen zwaar javascript bestand nodig. als een browser de gradient niet snapt dan blijft de data gewoon leesbaar.

---

2. Mobile-First & breakpoints
De website is vanaf de eerste regel mobiel opgebouwd. Er is gekozen voor een flexibele opzet met eenheden zoals em en rem en flexibele breedtes. Vaste pixels en max-width zijn weggelaten zodat de lay-out vloeiend mee beweegt.

- mobile first: Componenten starten met een simpele verticale flow (display: flex; flex-direction: column;).

- breakpoints: Pas wanneer het scherm breder wordt, verandert de lay-out mee via media queries. Vanaf 768px splitst het dashboard zich op in een grid met twee kolommen, en vanaf 1024px groeit dit door naar drie kolommen (grid-template-columns: repeat(3, 1fr);). Door margin: 0 auto; te gebruiken blijft alles op brede desktopschermen netjes gecentreerd.

---

3. CSS Nesting & Custom Properties
De styling is geschreven met moderne CSS technieken. Door slim gebruik te maken van CSS nesting en custom properties blijft de stylesheet overzichtelijk en makkelijk te onderhouden.

- CSS Nesting: Binnen componenten zoals .main-header en .dashboard zijn de media queries en hover-states direct binnen de selector genest. Dit houdt de code overzichtelijk en zorgt ervoor dat alle styling van een specifiek onderdeel netjes op een plek bij elkaar staat.

- custom properties in de :root : Alle kleuren schaduwen en thema's staan gedefinieerd in de :root. Hierdoor kan de website tussen light mode, dark mode en het neon thema switchen door simpelweg de waardes van de variabelen aan te passen. Dit voorkomt dubbele code en houdt de stylesheet netjes.

## Kenmerken
### Technieken & Architectuur
HTML: semantisch opgebouwd voor de toegankelijkheid.

CSS: geschreven met moderne technieken zoals CSS nesting om de leesbaarheid te behouden.

Node.js & Express: De applicatie draait op een Node.js server. De routes is logisch opgebouwd de homepage haalt de centrale feeds op, en dynamische routes (zoals / :id) sturen de gebruiker door naar de specifieke detailpagina's. De views worden dynamisch opgehaald in de server.

### Code Conventies
- Geen overbodige divs/spans waar semantische HTML gebrukt kan worden tenzij het absoluut nodig is voor styling.

- Geen harde pixels in de styling.

- Logische namen voor de classes en componenten.

## Installatie
- fork de repository.
- instaleer npm install.
- start de localhost met npm start.

## Bronnen
aantal bronnen die ik heb gebruikt zijn:
- [voor de pie chart](https://css-tricks.com/trying-to-make-the-perfect-pie-chart-in-css/)
- [ook voor de pie chart](https://gist.github.com/urosgruber/7705184)
- [nog meer voor de pie chart..](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient)
- [laatste video voor de pie chart(van Lea Verou)](https://www.youtube.com/watch?v=ZuZizqDF4q8)
- [om de media query in het picture element te gebruiken](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
