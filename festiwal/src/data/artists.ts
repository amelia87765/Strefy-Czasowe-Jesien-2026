import type { Lang } from "@/data/site";

/**
 * Pliki z `public/svg/masks/`. `rounded` to zaokrąglony prostokąt bez maski.
 * `announcement-*` to otwory z nakładek „Artist announcement” w social toolu
 * (`npm run masks -w festiwal` generuje je ponownie).
 */
export type ArtistMask =
  | "rounded"
  | "announcement-1"
  | "announcement-2"
  | "announcement-3"
  | "announcement-4"
  | "announcement-5"
  | "announcement-6"
  | "announcement-7";

export type Artist = {
  id: string;
  name: string;
  role: Record<Lang, string>;
  /** Ścieżka względem `public/`, np. `festiwal_foto/artysci/renia-maj.jpg`. */
  photo: string;
  mask: ArtistMask;
  /** Każdy element to osobny akapit. */
  description: Record<Lang, string[]>;
  instagram: string;
  /** Tło podpisu i planszy. */
  background: string;
  /** Kolor tekstu podpisu i planszy. */
  text: string;
};

export const artistsCopy: Record<
  Lang,
  { title: string; categories: string; pageTitle: string }
> = {
  pl: {
    title: "ARTYŚCI",
    categories:
      "Kurator, Muzyka, Sztuki Wizualne, Węch, Dźwięk, Smak, Performance",
    pageTitle: "ARTYŚCI — STREFY CZASOWE",
  },
  en: {
    title: "ARTISTS",
    categories: "Curator, Music, Visual Arts, Smell, Sound, Taste, Performance",
    pageTitle: "ARTISTS — STREFY CZASOWE",
  },
};

const CURATOR = { pl: "Kuratorka", en: "Curator" };
const PERFOCURATOR = { pl: "Perfokuratorka", en: "Curator and performer" };
const VISUAL_ARTIST = { pl: "Artystka wizualna", en: "Visual artist" };
const PERFORMER = { pl: "Performance", en: "Performance" };
const DJ = { pl: "DJ SET", en: "DJ SET" };
const RENIA_BIO = {
  pl: [
    "Projektantka grafiki, artystka wizualna, kuratorka festiwalu STREFY CZASOWE. Głównymi obszarami jej zainteresowań są sztuka publiczna, detal architektoniczny, kształtowanie krajobrazu oraz identyfikacja wizualna miejsc. W Strefach wykorzystuje tę perspektywę, kładąc nacisk na lokalność i rolę przestrzeni w budowaniu narracji wydarzenia.",
    "Z wyróżnieniem ukończyła interdyscyplinarny kierunek Graphic Arts na University of the West of England w Bristolu. W latach 2019 – 2025 była związana z gdyńskim Stowarzyszeniem Traffic Design. Obecnie pracuje i tworzy niezależnie, projektuje grafikę do wystaw i wydarzeń dla instytucji kultury.",
  ],
  en: [
    "Graphic designer, visual artist and curator of the STREFY CZASOWE festival. Her main interests are public art, architectural detail, landscape design and the visual identity of places. At Strefy she brings this perspective, focusing on locality and the role of space in shaping the narrative of the event.",
    "She graduated with distinction in the interdisciplinary Graphic Arts programme at the University of the West of England in Bristol. From 2019 to 2025 she was part of the Traffic Design Association in Gdynia. She now works independently, designing graphics for exhibitions and events for cultural institutions.",
  ],
};
const GWIAZDA_BIO = {
  pl: [
    "Rzeźbiarka, nauczycielka, kuratorka festiwalu Strefy Czasowe. W swojej praktyce artystycznej najchętniej pracuje z drewnem, metalem i materiałami odzyskanymi. Interesuje ją energia formy oraz pamięć ukryta w materii — podobną wrażliwość wnosi do Stref, kierując uwagę na zmysłowy potencjał doświadczenia. ",
    "Ukończyła Akademię Sztuk Pięknych w Gdańsku. Jest laureatką 8. Gdańskiego Biennale w Gdańskiej Galerii Miejskiej i stypendystką kulturalną Miasta Gdańska. Angażuje się w prowadzenie warsztatów, renowację drewna i plecionkarstwo.",
  ],
  en: [
    "Sculptress, teacher, and curator of the Strefy Czasowe festival. In her artistic practice, she most enjoys working with wood, metal, and reclaimed materials. She is interested in the energy of form and the memory hidden within the material — a similar sensitivity she brings to Strefy, directing attention to the sensory potential of experience.",
    "She graduated from the Academy of Fine Arts in Gdansk. She is a laureate of the 8th Gdansk Biennial at the Gdansk Municipal Gallery and a cultural scholarship recipient of the City of Gdansk. She is engaged in conducting workshops, restoring wood, and weaving.",
  ],
};
const OSKA_BIO = {
  pl: [
    "Performerka, producentka wydarzeń, osoba kuratorska festiwalu STREFY CZASOWE. W swojej praktyce artystycznej buduje choreografie obecności i przestrzenie sensoryczne, w których ciało staje się czułym rezonatorem rzeczywistości.",
    "Współtworzy i produkuje formaty kulturalne. Performuje w galeriach, na festiwalach, pokazach mody oraz w miejscach nietypowych i porzuconych. Prowadzi autorskie praktyki ekosomatyczne i warsztaty nasączania, budując relacje z pejzażami torfowisk.",
  ],
  en: [
    "Performer, event producer, and curator of the STREFY CZASOWE festival. In her artistic practice, she builds choreographies of presence and sensory spaces where the body becomes a sensitive resonator of reality.",
    "She co-creates and produces cultural formats. She performs in galleries, festivals, fashion shows, as well as in unusual and abandoned places. She conducts her own ecosomatic practices and soaking workshops, building relationships with peatland landscapes.",
  ],
};
const LEON_BIO = {
  pl: [
    "Performer, choreograf i twórca wizualny. W centrum jego praktyki znajduje się ciało — medium, poprzez które reinterpretuje tożsamość i piękno, z właściwą sobie szczerością i brawurą. Jego performanse są lepkie, drżące, głośne w swojej intymności. W ostatnich projektach sięga po “taping”, tworząc z taśmy i przedmiotów z drugiego obiegu.",
    "Mieszka i tworzy w Berlinie, ale jego artystyczne korzenie związane są z Trójmiastem. To tutaj powstał jego autorski teatr Patrz Mi Na Usta, który do dziś działa w Berlinie, a także zawiązała się współpraca z S.F.I.N.K.S.-em i Teatrem Ekspresji. Dziemaszkiewicz od lat obecny jest na międzynarodowej scenie artystycznej, ceniony za bezkompromisowe podejście do sztuki i swobodne przekraczanie granic między performansem, teatrem, tańcem i sztukami wizualnymi. Jego występ będzie okazją, żeby zanurzyć się w zimie wszystkimi zmysłami, z odwagą.",
  ],
  en: [
    "A performer, choreographer, and visual artist. At the center of his practice is the body — a medium through which he reinterprets identity and beauty, with his characteristic honesty and audacity. His performances are sticky, trembling, loud in their intimacy. In his recent projects he has turned to “taping”, creating works from tape and found objects.",
    "He lives and works in Berlin, though his artistic roots are in the Tricity. It was here that he founded his theater, Patrz Mi Na Usta, which continues to operate in Berlin, and began collaborations with S.F.I.N.K.S. and Teatr Ekspresji. Dziemaszkiewicz has been a presence on the international art scene for years, known for his unapologetic approach to art and fluid crossing of boundaries between performance, theater, dance and visual art. His performance will be an invitation to step into winter with all your senses, and with courage.",
  ],
};
const DIV4_BIO = {
  pl: [
    "DJ-ka, performerka, promotorka i kuratorka. Urodzona i związana z Gdańskiem, DiV4 to osoba artystyczna wymykająca się gatunkowym ramom — jej praktyka sytuuje  się na styku kultury klubowej, dekonstrukcji i relacyjności. Znana jest z energetycznych setów łączących eksperymentalne brzmienia z taneczną dynamiką.",
    "Swój charakterystyczny styl określa jako post-klubowy kolaż rytmicznych struktur, dudniącego basu i dystopijnych faktur, uwydatnionych subtelnym ambientem. Jej sety rozwijają się poprzez narrację oraz wymianę energii z publicznością — DiV4 przechwytuje tę energię i kieruje ją z powrotem na parkiet.",
  ],
  en: [
    "DJ, performance artist, promoter and curator. Born and based in Gdańsk, Poland, DiV4 is a genre-defying artist whose practice sits at the intersection of club culture, deconstruction and relationality. They are known for high-energy sets that combine experimental sounds with a dynamic, dance-driven intensity.",
    "They describe their signature style as a post-club collage of rhythmic structures, rumbling bass and dystopian textures, underscored by subtle ambient soundscapes. Their sets unfold through narration and an exchange of energy with the audience — DiV4 absorbs this energy and channels it back into the room.",
  ],
};
const MIROWSKA_BIO = {
  pl: [
    "Artystka wizualna, edukatorka, aktywistka. W swojej praktyce łączy fotografię, rzeźbę i grafikę, czerpiąc inspirację z badań naukowych i doświadczeń aktywistycznych. Tworzy spekulatywne struktury ochronne, organizmy i formy opieki, badając możliwości przyszłych przemian.",
    "Interesują ją procesy podtrzymujące życie: adaptacja, regeneracja i ewolucja. Te procesy łączą jej praktykę z zimową odsłoną STREF - zapadaniem w produktywny letarg i przygotowaniem do kolejnego cyklu.",
  ],
  en: [
    "Visual artist, educator, activist. In her practice she combines photography, sculpture and graphics, drawing inspiration from scientific research and activist experiences. She creates speculative protective structures, organisms and forms of care, exploring the possibilities of future transformations.",
    "She is interested in life-sustaining processes: adaptation, regeneration and evolution. These processes connect her practice with the winter edition of STREFY - hibernating into a productive lethargy and preparing for the next cycle.",
  ],
};
const STARAKIEWICZ_BIO = {
  pl: [
    "Projektantka i ilustratorka. Członkini Fundacji Grupa Robocza, wykładowczyni na ASP w Krakowie i na Akademii Tarnowskiej. Redaguje, ilustruje oraz pisze książki. Miłośniczka gier cyfrowych. Tworzy intensywne, nasycone i nieoczywiste światy wizualne, splatając je w opowieści.",
    "Laureatka nagrody Ars Quaerendi, stypendystka KPO dla Kultury, MKiDN oraz laureatka stypendium Młoda Polska. Opracowała program edukacyjny Pociąg do Opowieści, o narracji wizualnej i literackiej. Prelegentka na wydarzeniach związanych z projektowaniem oraz kulturą wizualną, m.in. Digital Cultures, UX Poland, Gdynia Design Days i Nie-Kongresie Animatorów Kultury.",
  ],
  en: [
    "Designer and illustrator. Member of the Grupa Robocza Foundation, lecturer at the Academy of Fine Arts in Krakow and at the Tarnów Academy. She edits, illustrates and writes books. A lover of digital games. She creates intense, saturated and unconventional visual worlds, weaving them into stories.",
    "Winner of the Ars Quaerendi award, a scholarship holder of KPO for Culture, MKiDN and a recipient of the Young Poland scholarship. She developed the educational program Pociąg do Opowieści, on visual and literary narration. Speaker at events related to design and visual culture, including Digital Cultures, UX Poland, Gdynia Design Days and the Non-Congress of Culture Animators.",
  ],
};
const SLUSARCZYK_BIO = {
  pl: [
    "Artystka wizualna i rzeźbiarka. Swobodnie łączy rzeźbę, instalację i grafikę, poszukując świeżych środków wyrazu. Bawi się językiem i ciałem.",
    "Na STREFACH zobaczymy jej pracę, w której ludzkie ciało spotyka się z ciałem maszyny, w niekonwencjonalnej odsłonie erotyki.",
  ],
  en: [
    "Visual artist and sculptress. She freely combines sculpture, installation and graphics, seeking fresh means of expression. She plays with language and the body.",
    "At STREFY we will see her work, in which the human body meets the body of a machine, in an unconventional take on eroticism.",
  ],
};
export const ARTISTS: Artist[] = [
  {
    id: "renia-maj",
    name: "Renia Maj",
    role: CURATOR,
    photo: "festiwal_foto/artysci/maj.jpg",
    mask: "announcement-2",
    description: RENIA_BIO,
    instagram: "https://www.instagram.com/renia_maj",
    background: "var(--color-deep-navy)",
    text: "var(--color-cream)",
  },
  {
    id: "natalia-gwiazdowska",
    name: "Natalia Gwiazdowska",
    role: CURATOR,
    photo: "festiwal_foto/artysci/gwiazdowska.jpg",
    mask: "announcement-1",
    description: GWIAZDA_BIO,
    instagram: "https://www.instagram.com/sculpsculpsculp",
    background: "var(--color-deep-plum)",
    text: "var(--color-cream)",
  },
  {
    id: "oska-zuk",
    name: "Oska Żuk",
    role: PERFOCURATOR,
    photo: "festiwal_foto/artysci/zuk.jpg",
    mask: "announcement-2",
    description: OSKA_BIO,
    instagram: "https://www.instagram.com/oska.zuk",
    background: "var(--color-amber-espresso)",
    text: "var(--color-warm-taupe)",
  },
  {
    id: "leon",
    name: "Krzysztof Leon Dziemaszkiewicz",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/leon.jpg",
    mask: "announcement-1",
    description: LEON_BIO,
    instagram: "https://www.instagram.com/leondziemaszkiewicz",
    background: "var(--color-chartreuse)",
    text: "var(--color-deep-navy)",
  },
  {
    id: "paulina-mirowska",
    name: "Paulina Mirowska",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/mirowska.jpg",
    mask: "announcement-7",
    description: MIROWSKA_BIO,
    instagram: "https://www.instagram.com/mirowska.p",
    background: "var(--color-periwinkle)",
    text: "var(--color-ground)",
  },
  {
    id: "div4",
    name: "DiV4",
    role: DJ,
    photo: "festiwal_foto/artysci/div4.jpg",
    mask: "announcement-1",
    description: DIV4_BIO,
    instagram: "https://www.instagram.com/div444444444",
    background: "var(--color-primary)",
    text: "var(--color-deep-forest)",
  },
  {
    id: "starakiewicz",
    name: "Maja Starakiewicz",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/starakiewicz.jpg",
    mask: "announcement-6",
    description: STARAKIEWICZ_BIO,
    instagram: "https://www.instagram.com/majastarakiewicz",
    background: "var(--color-deep-plum)",
    text: "var(--color-primary)",
  },
  {
    id: "slusarczyk",
    name: "Basia Ślusarczyk",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/slusarczyk.jpg",
    mask: "announcement-5",
    description: SLUSARCZYK_BIO,
    instagram: "https://www.instagram.com/mimimimimimmimimm",
    background: "var(--color-universal-brown)",
    text: "var(--color-periwinkle)",
  },
];
