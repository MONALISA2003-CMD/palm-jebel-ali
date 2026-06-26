# Palm Central Private Residences — Frond N

A luxury real estate marketing website built with plain HTML5, CSS3 and
vanilla JavaScript. Designed and developed by Monalisa Tech Solutions.

## Running the site

No build step is required.

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server, for example:
   `python3 -m http.server 8080` then visit `http://localhost:8080`

## Structure

```
index.html
css/
  style.css         tokens, layout, every section
  responsive.css    breakpoints, ultra-wide down to small phones
  animations.css    keyframes and reveal states
  components.css    small stateful UI pieces (mobile menu, etc.)
js/
  utilities.js      shared helpers (debounce, validators, focus trap)
  navigation.js     header glass state, mobile menu, active link
  scroll.js         scroll progress bar, scroll indicator, loader
  animations.js      reveal-on-scroll, in-view video autoplay
  gallery.js        masonry lightbox viewer
  forms.js          contact form validation and submission
  whatsapp.js       WhatsApp link helper, brochure button wiring
  chatbot.js        rule-based assistant, ready for an AI backend swap
  app.js            explore-more cards, cross-cutting interactions
assets/
  images/{gallery,icons,logos,backgrounds}
  videos/
  brochure/
  fonts/
favicon.ico
robots.txt
sitemap.xml
```

## Notes for the next person

- **Brochure**: no brochure PDF was supplied with these assets. Every
  "Download Brochure" control currently opens WhatsApp with a brochure
  request pre-filled. Once a real file is available, drop it in
  `assets/brochure/brochure.pdf` and update the two handlers in
  `js/whatsapp.js` to point at that file instead.
- **AI Assistant**: `js/chatbot.js` answers from a local knowledge base.
  To connect a live AI backend, replace the body of `getResponse()` in
  that file with an API call, keeping the same `(text) -> Promise<string>`
  signature, no other file needs to change.
- **Explore More Dubai Developments**: each card is generated from a
  plain array in `js/app.js`. To give a project a real page later, set
  `card.dataset.slug` and swap the `alert(...)` for a navigation call.
- **Map**: the Location section embeds Palm Jebel Ali via a Google Maps
  query embed. The original share link is kept as the "Open in Google
  Maps" button: https://maps.app.goo.gl/x4pvHkA7f9EpjSiB6
- This project intentionally avoids React, Vue, Angular, Bootstrap,
  Tailwind, jQuery, TypeScript, Sass and any build tooling, per brief.

## Disclaimer

This website is a portfolio demonstration and is not an official website
of Nakheel or Palm Central Private Residences.
