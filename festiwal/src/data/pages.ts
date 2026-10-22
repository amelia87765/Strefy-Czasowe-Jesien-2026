import { LINKS, type Lang } from "@/data/site";

export type SubpageId =
  | "o-festiwalu"
  | "sklep"
  | "wolontariusze"
  | "faq"
  | "galeria"
  | "dojazd";

/** Kolory jednolitych podstron: tło i tekst (tytuł, kreski, treść). */
export const SUBPAGE_COLORS: Record<
  SubpageId,
  { background: string; text: string }
> = {
  "o-festiwalu": {
    background: "var(--color-primary)",
    text: "var(--color-ground)",
  },
  sklep: {
    background: "var(--color-periwinkle)",
    text: "var(--color-ground)",
  },
  wolontariusze: {
    background: "var(--color-universal-brown)",
    text: "var(--color-light-grey)",
  },
  faq: {
    background: "var(--color-deep-plum)",
    text: "var(--color-cream)",
  },
  galeria: {
    background: "var(--color-deep-navy)",
    text: "var(--color-cream)",
  },
  dojazd: {
    background: "var(--color-deep-forest)",
    text: "var(--color-chartreuse)",
  },
};

export type Text = Record<Lang, string>;

/**
 * Klocki treści. Sekcje są oddzielone kreską, klocki w sekcji stoją jeden pod drugim.
 * Kolejność i liczbę sekcji/klocków można dowolnie zmieniać.
 * W akapitach działa link w formacie `[tekst](https://adres)`.
 */
export type Block =
  | { type: "heading"; text: Text }
  | {
      type: "text";
      paragraphs: Record<Lang, string[]>;
      nowrap?: number[];
      /** `small` na drobny druk, np. warunki rabatu. */
      textSize?: "small";
    }
  /**
   * Wpinka (iframe), np. widget sprzedaży Going. `height` w rem.
   * Pusty `src` pokazuje przycisk do strony biletów.
   */
  | { type: "embed"; src: string; height: number; title: Text }
  /** Widget sprzedaży Going w języku strony (ustawienia w `src/data/tickets.ts`). */
  | { type: "going" }
  /**
   * Zdjęcia produktów w rzędzie, z podpisem i kartą opisu po najechaniu.
   * Zdjęcia: `media/sklep/` → `npm run media:photos` → `festiwal_foto/sklep/*.jpg`.
   */
  | { type: "gallery"; items: GalleryItem[] }
  /** Rozwijane pytania: otwarte jest zawsze najwyżej jedno. */
  | { type: "faq"; items: { question: Text; answer: Record<Lang, string[]> }[] }
  | { type: "statement"; text: Text }
  /** `width` to szerokość elipsy w rem (1 rem = 10 px przy 1728 px), wysokość jest wspólna. */
  | { type: "photos"; photos: { src: string; width: number; alt: Text }[] }
  /** Pusty `href` wyświetla sam tekst bez linku. `href` może mieć osobny adres dla PL i ENG. */
  | { type: "links"; links: { label: Text; href: string | Text }[] }
  /** Rzędy „etykieta — duża wartość”, np. godziny albo rabaty. */
  | { type: "facts"; items: { label: Text; value: Text }[] }
  /** Kod do skopiowania jednym kliknięciem. */
  | { type: "code"; code: string; label: Text }
  /** Siatka zdjęć z podglądem po kliknięciu. Dane z `npm run gallery`. */
  | { type: "album"; photos: AlbumPhoto[] };

/** `src` bez końcówki: pliki to `${src}-480.webp`, `${src}-960.webp`, `${src}-full.webp`. */
export type AlbumPhoto = { src: string; width: number; height: number };

export type GalleryItem = {
  id: string;
  photo: string;
  caption: Text;
  description: Record<Lang, string[]>;
  background: string;
  text: string;
};

export type Section = Block[];

export const ABOUT_SECTIONS: Section[] = [
  [
    {
      type: "heading",
      text: { pl: "Czym są STREFY CZASOWE?", en: "What is STREFY CZASOWE?" },
    },
    {
      type: "text",
      nowrap: [0],
      paragraphs: {
        pl: [
          "*Stworzyliśmy coś, co znacząco wymyka się poza percepcję czasu.*",
          "Nowy festiwal w Trójmieście oparty na narracyjności i nietuzinkowej koncepcji, gdzie starannie dobrane koncerty uzupełniają się z licznymi instalacjami przestrzennymi, performansem, dekoracjami i nawet teatrem",
          "Ten festiwal sprawi, że po przekroczeniu progu… przepadniesz.",
          "Przyjdź, poczuj, doświadcz — w pełni.",
        ],
        en: [
          "*We have created something that significantly escapes the perception of time.*",
          "A new festival in the Tricity based on narrative and an unconventional concept, where carefully selected concerts are complemented by numerous spatial installations, performances, decorations, and even theater.",
          "This festival will make you… disappear after crossing the threshold.",
          "Come, feel, experience — fully.",
        ],
      },
    },
  ],
  [
    {
      type: "photos",
      photos: [
        {
          src: "festiwal_foto/about1.jpg",
          width: 46.82,
          alt: {
            pl: "Poprzednia edycja festiwalu",
            en: "Previous edition of the festival",
          },
        },
        {
          src: "festiwal_foto/about2.jpg",
          width: 37.65,
          alt: {
            pl: "Poprzednia edycja festiwalu",
            en: "Previous edition of the festival",
          },
        },
        {
          src: "festiwal_foto/about3.jpg",
          width: 15.46,
          alt: {
            pl: "Poprzednia edycja festiwalu",
            en: "Previous edition of the festival",
          },
        },
      ],
    },
  ],
  [
    {
      type: "statement",
      text: {
        pl: "ZANURZ SIĘ, PRZEŻYJ, TRANSFORMUJ, *POCZUJ*, PRZETRANSPORTUJ SIĘ",
        en: "IMMERSE YOURSELF, EXPERIENCE, TRANSFORM, *FEEL*, BE TRANSPORTED",
      },
    },
  ],
  [
    {
      type: "text",
      paragraphs: {
        pl: [
          "STREFY CZASOWE to projekt, który odbywa się będzie dwa razy do roku — jesienią i wiosną, dokładnie w momentach zmiany czasu. Każda edycja oparta jest na motywie zmiany, przejścia i transformacji, zarówno w wymiarze symbolicznym, jak i zmysłowym.",
        ],
        en: [
          "STREFY CZASOWE is a project that takes place twice a year — in autumn and spring, precisely at the moments of time change. Each edition is based on the theme of change, transition, and transformation, both in a symbolic and sensory dimension.",
        ],
      },
    },
  ],
  [
    {
      type: "statement",
      text: {
        pl: "Pięć przestrzeni, trzy sceny, kilkanaście występów, kilkudziesięciu artystów, dziesiątki bodźców i zaangażowanie wszystkich zmysłów.",
        en: "Five spaces, three stages, dozens of performances, dozens of artists, dozens of stimuli and the engagement of all senses.",
      },
    },
  ],

  [
    { type: "heading", text: { pl: "Piszą o nas", en: "Press" } },
    {
      type: "links",
      links: [
        {
          label: { pl: "Artykuł 1", en: "Article 1" },
          href: "https://www.trojmiasto.pl/rozrywka/Noc-zmiany-czasu-w-Sverze-Strefy-Czasowe-ponownie-zaskoczyly-n217132.html",
        },
        {
          label: { pl: "Artykuł 2", en: "Article 2" },
          href: "https://www.trojmiasto.pl/rozrywka/Nowa-intrygujaca-impreza-w-Trojmiescie-Strefy-Czasowe-zaskoczyly-forma-i-klimatem-n209789.html",
        },
        {
          label: { pl: "Artykuł 3", en: "Article 3" },
          href: "https://goingapp.pl/more/strefy-czasowe-festiwal-2025-gdynia-bilety/",
        },
      ],
    },
  ],
];

export const SHOP_SECTIONS: Section[] = [
  [{ type: "going" }],
  [
    {
      type: "gallery",
      items: [
        {
          id: "artwork1",
          photo: "festiwal_foto/sklep/artwork1.jpg",
          caption: { pl: "Artwork 1", en: "Artwork 1" },
          description: {
            pl: [
              "Limitowany, ręcznie numerowany plakat artystyczny z jesiennej zmiany czasu. \n50 x 70 cm, na wysokiej jakości papierze. \nNakład wyniósł 20 sztuk i się nie powtórzy.",
              "100 zł.",
              "Najniższa cena z 30 dni przed obniżką: 120 zł.",
            ],
            en: [
              "A limited, hand-numbered artwork from the autumn time change.\n50 x 70 cm, on high-quality paper. \nThis run amounted to 20 pieces and will not be repeated.",
              "100 PLN.",
              "Lowest price in the 30 days before the reduction: 120 PLN.",
            ],
          },
          background: "var(--color-ground)",
          text: "var(--color-periwinkle)",
        },
        {
          id: "skarpety",
          photo: "festiwal_foto/sklep/skarpety.jpg",
          caption: { pl: "Skarpety x HANSA", en: "Socks x HANSA" },
          description: {
            pl: [
              "Wysokiej jakości skarpety uszyte we współpracy z Hansa Wear. \n\nFestiwalowy detal, który zostaje na dłużej niż jedną noc.",
              "40 zł.",
            ],
            en: [
              "High-quality socks made with Hansa Wear. \n\nA festival detail that lasts longer than one night.",
              "40 PLN.",
            ],
          },
          background: "var(--color-ground)",
          text: "var(--color-periwinkle)",
        },
        {
          id: "artwork2",
          photo: "festiwal_foto/sklep/artwork2.jpg",
          caption: { pl: "Artwork 2", en: "Artwork 2" },
          description: {
            pl: [
              "Limitowany, ręcznie numerowany plakat artystyczny z letniej zmiany czasu. \n50 x 70 cm, na wysokiej jakości papierze. \nNakład wyniósł 20 sztuk i się nie powtórzy.",
              "100 zł.",
              "Najniższa cena z 30 dni przed obniżką: 120 zł.",
            ],
            en: [
              "A limited, hand-numbered artwork from the spring time change. \n50 x 70 cm, on high-quality paper. \nThis run amounted to 20 pieces and will not be repeated.",
              "100 PLN.",
              "Lowest price in the 30 days before the reduction: 120 PLN.",
            ],
          },
          background: "var(--color-ground)",
          text: "var(--color-periwinkle)",
        },
      ],
    },
  ],
  [
    {
      type: "text",
      paragraphs: {
        pl: [
          `W celu zakupu skontaktuj się z nami, a będą Twoje.\n\n[@strefyczasowe](${LINKS.instagram}) albo [strefyczasowe@smoothsail.art](mailto:${LINKS.email})`,
        ],
        en: [
          `In order to buy, contact us, and they will be yours.\n\n[@strefyczasowe](${LINKS.instagram}) or [strefyczasowe@smoothsail.art](mailto:${LINKS.email})`,
        ],
      },
    },
  ],
];

export const VOLUNTEERS_SECTIONS: Section[] = [
  [
    {
      type: "text",
      paragraphs: {
        pl: [
          "STREFY CZASOWE tworzymy razem. Zależy nam na przestrzeni do wspólnego przeżywania sztuki — otwartej i uważnej. Szukamy osób, które chcą współtworzyć z nami najbliższą edycję festiwalu.\n\nChcesz dołączyć do zespołu produkcyjnego?\n\nSkontaktuj się z nami lub wypełnij [formularz](https://docs.google.com/forms/d/e/1FAIpQLSe-zYxx5DaCgpR-jVlfGddWpz84_0pOWB_R1X5fzcSQqGLPmw/viewform).",
        ],
        en: [
          "STREFY CZASOWE are created together. We value the space for shared experience of art — open and attentive. We are looking for people who want to collaborate with us to create the next edition of the festival.\nDo you want to join the production team?\nContact us or fill out the [form](https://docs.google.com/forms/d/e/1FAIpQLSe-zYxx5DaCgpR-jVlfGddWpz84_0pOWB_R1X5fzcSQqGLPmw/viewform).",
        ],
      },
    },
  ],
];

const SVERA_MAP =
  "https://www.google.com/maps/search/?api=1&query=SVERA%2C+plac+Konstytucji+2%2C+Gdynia";
const MERCURE = {
  pl: "https://all.accor.com/hotel/3417/index.pl.shtml",
  en: "https://all.accor.com/hotel/3417/index.en.shtml",
};

export const TRAVEL_SECTIONS: Section[] = [
  [
    {
      type: "facts",
      items: [
        { label: { pl: "Data", en: "Date" }, value: { pl: "24.10.2026", en: "24.10.2026" } },
        { label: { pl: "Otwarcie bramek", en: "Gates open" }, value: { pl: "18:45", en: "18:45" } },
        { label: { pl: "Start", en: "Start" }, value: { pl: "19:00", en: "19:00" } },
      ],
    },
  ],
  [
    { type: "heading", text: { pl: "Dojazd", en: "Getting here" } },
    {
      type: "text",
      paragraphs: {
        pl: [
          "SVERA, plac Konstytucji 2, Gdynia.",
          "Klub stoi przy samym dworcu Gdynia Główna — wysiadasz z pociągu i jesteś na miejscu. SKM, PKM, pociągi dalekobieżne, autobusy i trolejbusy zatrzymują się tuż obok.",
        ],
        en: [
          "SVERA, plac Konstytucji 2, Gdynia.",
          "The club is right next to Gdynia Główna, the main railway station — step off the train and you are there. SKM, PKM, long-distance trains, buses and trolleybuses all stop next door.",
        ],
      },
    },
    {
      type: "links",
      links: [{ label: { pl: "Pokaż na mapie", en: "Show on the map" }, href: SVERA_MAP }],
    },
    {
      type: "text",
      paragraphs: {
        pl: [
          "Wracasz nocą? Pamiętaj, że tej nocy zegary cofają się o godzinę, z 3:00 na 2:00. Przed powrotem sprawdź nocny rozkład SKM.",
        ],
        en: [
          "Heading home at night? Remember that the clocks go back an hour that night, from 3:00 to 2:00. Check the night SKM timetable before you leave.",
        ],
      },
    },
  ],
  [
    { type: "heading", text: { pl: "Nocleg", en: "Where to stay" } },
    {
      type: "text",
      paragraphs: {
        pl: [
          "Przyjeżdżasz z daleka? Współpracujemy z hotelem *Mercure Gdynia Centrum* przy ul. Armii Krajowej 22, w centrum miasta, blisko morza i kilkanaście minut spacerem od SVERY.",
        ],
        en: [
          "Coming from further away? We are partnering with *Mercure Gdynia Centrum* at ul. Armii Krajowej 22, in the city centre, close to the sea and a short walk from SVERA.",
        ],
      },
    },
    { type: "code", code: "TIMEZONES2026", label: { pl: "Kod rabatowy", en: "Discount code" } },
    {
      type: "facts",
      items: [
        { label: { pl: "Jedna noc", en: "One night" }, value: { pl: "−15%", en: "−15%" } },
        { label: { pl: "Dwie noce", en: "Two nights" }, value: { pl: "−20%", en: "−20%" } },
      ],
    },
    {
      type: "text",
      textSize: "small",
      paragraphs: {
        pl: [
          "Rabat od elastycznej stawki dnia, na pobyty w terminie 23–25 października 2026, w zależności od dostępności. Podaj kod przy rezerwacji.",
        ],
        en: [
          "Discount off the flexible daily rate, for stays between 23 and 25 October 2026, subject to availability. Quote the code when booking.",
        ],
      },
    },
    {
      type: "links",
      links: [{ label: { pl: "Strona hotelu", en: "Hotel website" }, href: MERCURE }],
    },
  ],
];
