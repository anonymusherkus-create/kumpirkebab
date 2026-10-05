# Kumpir Kebab

The website for Kumpir Kebab, Kapsų g. 22, Naujininkai, Vilnius: the menu with
prices, customer reviews, opening hours, and one tap to call and order.

It is a plain folder of files. Nothing to install and no build step.

## Make changes

Open `index.html` in a browser to see the page, and in any text editor to change
it. Search the file for `EDIT ME` and you will land on each part meant to be
changed.

| What you want to change      | Where                                         |
| ---------------------------- | --------------------------------------------- |
| Dishes and prices            | `EDIT ME: menu items` in `index.html`         |
| Reviews                      | `EDIT ME: reviews` in `index.html`            |
| Phone, address, hours        | `EDIT ME: phone, address, and hours`          |
| Opening time used for status | `OPENS` and `CLOSES` at the top of `script.js` |
| Page title                   | `EDIT ME: page title` in `index.html`         |
| Colors, fonts, spacing       | the top of `styles.css`                       |

The phone number appears in several buttons (`tel:+37060647320`). If it changes,
search for it and replace every copy.

To add a dish, copy one whole `<li class="menu__item">` block, paste it below,
and edit the copy. Its `data-category` must be one of the filter button names.

## Publish it

Drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
push to the connected Git repository.

## What's in here

```
index.html        the page itself: all words, menu, reviews, and contact details
styles.css        how it looks: colors, fonts, spacing, motion
script.js         open/closed status, mobile menu, menu filter, scroll effects
favicon.svg       the logo and browser tab icon
assets/flame.svg  the large flame in the hero
```
