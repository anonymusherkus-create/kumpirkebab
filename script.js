// Small enhancements: open/closed status, mobile menu, menu filter, nav
// background on scroll, and fade-in on scroll. Everything here is optional —
// the page is fully readable with JavaScript turned off.

document.documentElement.classList.add('js');

// EDIT ME: opening hours, in minutes after midnight, Vilnius time.
const OPENS = 10 * 60 + 30;
const CLOSES = 21 * 60;
const formatTime = (minutes) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

// Open / closed status, worked out in the shop's own time zone so it is right
// wherever the visitor is.
const vilniusNow = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Vilnius',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return {
    minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10),
    dayIndex: days.indexOf(get('weekday')),
  };
};

const syncStatus = () => {
  const { minutes, dayIndex } = vilniusNow();
  const isOpen = minutes >= OPENS && minutes < CLOSES;

  document.querySelectorAll('[data-status]').forEach((el) => {
    el.hidden = false;
    el.classList.toggle('is-open-now', isOpen);
  });
  document.querySelectorAll('[data-status-text]').forEach((el) => {
    el.textContent = isOpen
      ? `Dabar atvira iki ${formatTime(CLOSES)}`
      : `Atsidaro ${formatTime(OPENS)}`;
  });
  document.querySelectorAll('[data-status-long]').forEach((el) => {
    el.textContent = isOpen
      ? `Dabar atvira — laukiame iki ${formatTime(CLOSES)}`
      : `Dabar uždaryta — atsidarome ${formatTime(OPENS)}`;
  });
  document.querySelectorAll('.hours > div').forEach((row, i) => {
    row.classList.toggle('is-today', i === dayIndex);
  });
};

syncStatus();
setInterval(syncStatus, 60 * 1000);

// Nav background once the page has scrolled.
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu.
const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  mobileMenu.hidden = !open;
  nav.classList.toggle('is-open', open);
};

toggle.hidden = false;
toggle.addEventListener('click', () =>
  setMenu(toggle.getAttribute('aria-expanded') !== 'true'),
);
mobileMenu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    toggle.focus();
  }
});

// Menu category filter.
const filters = document.getElementById('menu-filters');
const items = document.querySelectorAll('#menu .menu__item');

filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const category = button.dataset.filter;

  filters.querySelectorAll('[data-filter]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b === button));
  });
  items.forEach((item) => {
    item.hidden = category !== 'Visi' && item.dataset.category !== category;
  });
});

// Fade sections in as they scroll into view. Without IntersectionObserver
// everything is simply shown.
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
