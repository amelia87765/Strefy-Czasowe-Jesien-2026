export const TICKETS_URL =
  "https://goingapp.pl/wydarzenie/strefy-czasowe-2026-1-jesien/gdynia-pazdziernik-2026?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafq-82GNigrOm04X8i5RrYvfxP2hXixUZDwionJ_T-16jhGTeNBI0uZ-9Lk0g_aem_DAo0NpYqbhbneTLMrOAy8w";

export const LINKS = {
  email: "strefyczasowe@smoothsail.art",
  instagram: "https://www.instagram.com/strefyczasowe",
  facebook: "https://www.facebook.com/strefyczasowe",
  smoothSail: "https://www.instagram.com/smoothsail_pl",
};

export type Lang = "pl" | "en";

export type ShapeItem = {
  id: string;
  href: string;
  photo: string;
  viewBox: string;
  path: string;
  overlay?: string;
  inner: string;
  flex: number;
  label: Record<Lang, string>;
};

export const SHAPE_ROW_1: ShapeItem[] = [
  {
    id: "o-festiwalu",
    href: "o-festiwalu",
    photo: "festiwal_foto/o-festiwalu.jpeg",
    viewBox: "0 0 423 820",
    path: "M420.644 409.846C420.644 522.727 397.114 624.879 359.111 698.78C321.086 772.726 268.706 818.161 211.087 818.161C153.467 818.161 101.087 772.726 63.0622 698.78C25.0598 624.879 1.53006 522.727 1.53001 409.846C1.53002 296.964 25.0597 194.811 63.0623 120.91C101.088 46.9648 153.467 1.5294 211.087 1.52929C268.706 1.52929 321.086 46.9647 359.111 120.91C397.114 194.811 420.644 296.964 420.644 409.846Z",
    overlay: "svg/Elipsa_Gorna_Prawa.svg",
    inner: "#5C7FFF",
    flex: 0.72,
    label: { pl: "O FESTIWALU", en: "ABOUT" },
  },
  {
    id: "artysci",
    href: "artysci",
    photo: "festiwal_foto/artysci.jpg",
    viewBox: "0 0 605 819",
    path: "M430.764 0C526.547 0.000194556 604.194 183.19 604.194 409.165C604.194 635.14 526.547 818.329 430.764 818.329C383.82 818.329 341.234 774.327 310.008 702.851C307.072 696.13 297.123 696.13 294.187 702.851C262.962 774.327 220.375 818.329 173.432 818.329C77.6482 818.329 8.39361e-05 635.14 0 409.165C0 183.19 77.6482 0 173.432 0C220.375 0.000127419 262.962 44.0022 294.187 115.477C297.123 122.199 307.072 122.199 310.008 115.477C341.234 44.0022 383.82 0 430.764 0Z",
    inner: "#2C1D12",
    flex: 1,
    label: { pl: "ARTYŚCI", en: "ARTISTS" },
  },
  {
    id: "sklep",
    href: "sklep",
    photo: "festiwal_foto/sklep.jpg",
    viewBox: "0 0 413 820",
    path: "M411.096 409.846C411.096 522.729 388.099 624.884 350.958 698.787C313.792 772.74 262.603 818.161 206.312 818.161C150.022 818.161 98.8339 772.74 61.6679 698.787C24.527 624.884 1.52933 522.729 1.52928 409.846C1.52928 296.962 24.5269 194.806 61.668 120.903C98.8339 46.9509 150.022 1.52933 206.312 1.52929C262.603 1.52929 313.792 46.9508 350.958 120.903C388.099 194.806 411.096 296.962 411.096 409.846Z",
    overlay: "svg/Elipsa_Gorna_Lewa.svg",
    inner: "#FF562C",
    flex: 0.72,
    label: { pl: "SKLEP", en: "SHOP" },
  },
];

export const SHAPE_ROW_2: ShapeItem[] = [
  {
    id: "wolontariusze",
    href: "wolontariusze",
    photo: "festiwal_foto/wolontariusze.jpeg",
    viewBox: "0 0 857 728",
    path: "M855.437 363.696C855.437 563.59 664.419 725.863 428.483 725.863C192.547 725.863 1.52948 563.59 1.5295 363.696C1.52952 163.803 192.547 1.52951 428.483 1.52929C664.419 1.52929 855.437 163.803 855.437 363.696Z",
    overlay: "svg/Elipsa_Dolna.svg",
    inner: "#FCA0EB",
    flex: 1.15,
    label: { pl: "WOLONTARIUSZE", en: "VOLUNTEERS" },
  },
  {
    id: "faq",
    href: "faq",
    photo: "festiwal_foto/faq.JPG",
    viewBox: "0 0 554 727",
    path: "M489.623 0C524.782 0.000462793 553.283 162.528 553.283 363.016C553.283 563.504 524.782 726.031 489.623 726.031C470.805 726.031 453.894 679.469 442.239 605.447C441.142 598.477 430.806 597.922 428.963 604.713C408.751 679.162 379.346 726.031 346.613 726.031C313.841 726.031 284.405 679.05 264.191 604.447C262.403 597.849 252.634 598.122 251.219 604.82C235.5 679.206 212.64 726.031 187.193 726.031C162.242 726.031 139.779 681.013 124.095 609.136C122.552 602.065 111.556 602.343 110.396 609.496C98.7672 681.163 82.1328 726.031 63.66 726.031C28.5015 726.031 1.78079e-05 563.504 0 363.016C0 162.528 28.5015 0.000210385 63.66 0C82.1328 0 98.7672 44.8678 110.396 116.535C111.556 123.688 122.552 123.966 124.095 116.895C139.779 45.018 162.242 9.8549e-05 187.193 0C212.64 0 235.5 46.8251 251.219 121.212C252.634 127.91 262.403 128.182 264.191 121.585C284.405 46.9817 313.841 0.000174007 346.613 0C379.346 0 408.751 46.8695 428.963 121.318C430.807 128.109 441.142 127.554 442.239 120.584C453.894 46.5617 470.805 0 489.623 0Z",
    inner: "#FF562C",
    flex: 0.85,
    label: { pl: "FAQ", en: "FAQ" },
  },
];

export const TEXT_MENU = [...SHAPE_ROW_1, ...SHAPE_ROW_2];

export const MONTHS: { id: string; pl: string; en: string }[] = [
  { id: "wrz", pl: "WRZ", en: "SEP" },
  { id: "paz", pl: "PAŹ", en: "OCT" },
  { id: "lis", pl: "LIS", en: "NOV" },
  { id: "gru", pl: "GRU", en: "DEC" },
  { id: "sty", pl: "STY", en: "JAN" },
  { id: "lut", pl: "LUT", en: "FEB" },
  { id: "mar", pl: "MAR", en: "MAR" },
  { id: "kwi", pl: "KWI", en: "APR" },
  { id: "maj", pl: "MAJ", en: "MAY" },
  { id: "cze", pl: "CZE", en: "JUN" },
  { id: "lip", pl: "LIP", en: "JUL" },
  { id: "sie", pl: "SIE", en: "AUG" },
];

export const copy = {
  pl: {
    title: "STREFY CZASOWE",
    description: "Indoorowy festiwal wszystkich zmysłów odbywający się w ",
    descriptionEm: "noce zmiany czasu",
    descriptionEnd: ".",
    tickets: "BILETY",
    date: "24.10.2026",
    venue: "SVERA Gdynia",
    previous: "Wcześniejsza edycja\n2025 (-1)",
    followLead: "Zmieniamy czas ",
    followLeadEm: "(znowu)",
    followLeadEnd: ".",
    follow: "Obserwuj nas na @strefyczasowe",
    contact: "KONTAKT",
    email: "Email",
    instagram: "Instagram",
    facebook: "Facebook",
    copyright: "Ⓒ STREFY CZASOWE 2026",
    orgTitle: "Organizacja i Produkcja",
    orgName: "Smooth Sail",
    orgHandle: "@smoothsail_pl",
    brandTitle: "Branding i Creative Strategy",
    brandName: "Ada Popowicz",
    webTitle: "Web Development",
    webName: "Amelia Ziemann",
    winterLeft: "Do zmiany czasu na zimowy pozostało",
    summerLeft: "Do zmiany czasu na letni pozostało",
    days: "dni",
    hours: "godzin",
    seconds: "sekund",
  },
  en: {
    title: "STREFY CZASOWE",
    description: "An indoor festival of all senses, held on ",
    descriptionEm: "the nights we change the clocks",
    descriptionEnd: ".",
    tickets: "TICKETS",
    date: "24.10.2026",
    venue: "SVERA Gdynia",
    previous: "Previous edition\n2026 (+1) // Summer",
    followLead: "We change time ",
    followLeadEm: "(again)",
    followLeadEnd: ".",
    follow: "Follow us at @strefyczasowe",
    contact: "CONTACT",
    email: "Email",
    instagram: "Instagram",
    facebook: "Facebook",
    copyright: "Ⓒ STREFY CZASOWE 2026",
    orgTitle: "Organisation & Production",
    orgName: "Smooth Sail",
    orgHandle: "@smoothsail_pl",
    brandTitle: "Branding & Creative Strategy",
    brandName: "Ada Popowicz",
    webTitle: "Web Development",
    webName: "Amelia Ziemann",
    winterLeft: "Until the switch to winter time",
    summerLeft: "Until the switch to summer time",
    days: "days",
    hours: "hours",
    seconds: "seconds",
  },
} as const;
