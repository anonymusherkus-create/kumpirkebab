# Working on this site

A single-page website for Kumpir Kebab, a kebab and kumpir takeaway in
Naujininkai, Vilnius. The copy is in Lithuanian. Static HTML, CSS, and one
small JavaScript file.
There is no build step, no package manager, and no framework.

## Where things are

- `index.html`, the entire page. The icon sprite (`<symbol>` definitions) sits
  at the bottom; reference an icon with `<use href="#icon-name" />`.
- `styles.css`, all styling. Every color, font, rule, and width is a custom
  property in the `:root` block at the top of the file.
- `script.js`, open/closed status, mobile menu, menu category filter, nav
  background on scroll, and scroll fade-ins. All are progressive
  enhancements; the controls they need are `hidden` until this file runs.
- `favicon.svg` (also the logo), `assets/flame.svg` (the large hero mark).

Blocks that a person is likely to want changed are wrapped in `EDIT ME`
comments. Prefer editing inside those blocks over restructuring around them.

## Rules

**Do not add a `package.json`, a lockfile, or a `netlify.toml` with a `[build]`
section.** This site is published by uploading the folder exactly as it is, and
those files turn it into something that has to be built first.

For the same reason, do not introduce a bundler, a CSS preprocessor, a
framework, or anything that turns `index.html` into generated output. If a
change seems to need a build step, it does not belong in this project.

Also avoid:

- Directories named `dist`, `build`, or `node_modules`. Nothing here should be
  generated output, and upload tools routinely strip those names.
- Renaming `index.html`. It must stay at the folder's root.
- External requests at runtime (CDN fonts, analytics, remote images). The site
  should work opened straight from disk, offline.

## The design

Dark charcoal background, cream text, and a flame orange accent reserved for
ways to call and order. Display type is heavy and tight. Ordering happens by
phone only, so every primary button is a `tel:` link.

All motion (marquee, hero rise, floating mark, scroll fade-ins, status pulse)
sits inside the `prefers-reduced-motion: no-preference` block in `styles.css`.
Keep any new motion there too.

The map is a CSS-drawn tile that links out to Google Maps rather than an
embedded iframe, so the page makes no third-party requests.

## Conventions

- Semantic HTML first: `<button>`, `<a>`, `<nav>`, `<ul>`. Reach for ARIA only
  when no element does the job.
- One `<h1>` (the hero headline); section headings are `<h2>`, menu items `<h3>`.
- Add new colors as custom properties in `:root` in `styles.css`. There is a
  single dark theme.
- Keep decorative images and icons out of the accessibility tree (`alt=""` or
  `aria-hidden="true"`).
- Each menu item's `data-category` must match a filter button's `data-filter`.
- Opening hours appear in the hours list in `index.html` and as `OPENS` /
  `CLOSES` in `script.js`. Change both together.
- SVG files are XML, so **a comment inside one can never contain two hyphens in
  a row**. Writing a custom property name such as the accent color token into an
  SVG comment makes the whole file fail to parse, and the browser shows a broken
  image with no console error.
- Keep the whole site comfortably under a megabyte. Prefer SVG over photos.

## Checking your work

Open `index.html` in a browser. That is the full test suite. Confirm:

1. The open/closed status in the nav and under the hours matches Vilnius time.
2. Tab through the page: skip link first, then every link and button reachable
   with a visible focus outline.
3. Narrow the window to phone width; nothing should overflow sideways.
4. Disable JavaScript; the full menu and all content should still show, minus
   the filter buttons and the status line.
5. If you touched an SVG, confirm the image still renders. A malformed SVG fails
   silently.
