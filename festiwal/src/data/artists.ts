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
  photo: string;
  mask: ArtistMask;
  description: Record<Lang, string[]>;
  instagram: string;
  instagram2?: string;
  background: string;
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
    pageTitle: "ARTYŚCI — STREFY CZASOWE 2026 (-1)",
  },
  en: {
    title: "ARTISTS",
    categories: "Curator, Music, Visual Arts, Smell, Sound, Taste, Performance",
    pageTitle: "ARTISTS — STREFY CZASOWE 2026 (-1)",
  },
};

const CURATOR = { pl: "Kuratorka", en: "Curator" };
const PERFOCURATOR = { pl: "Perfokuratorka", en: "Curator and performer" };
const VISUAL_ARTIST = { pl: "Artystka wizualna", en: "Visual artist" };
const PERFORMER = { pl: "Performans", en: "Performance" };
const DJ = { pl: "DJ SET", en: "DJ SET" };
const AMBIENT_DJ = { pl: "Ambient DJ SET", en: "Ambient DJ SET" };
const LIVE_ACT = { pl: "Live Act", en: "Live Act" };
const CONCERT = { pl: "Koncert", en: "Concert" };
const MULTI_CENTER = { pl: "Centrum multimedialne", en: "Multimedia center" };
const FILM = { pl: "Doświadczenie filmowe", en: "Film experience" };
const AMB_CONCERT = { pl: "Koncert ambientowy", en: "Ambient concert" };
const PRE_CONCERT = {
  pl: "Koncert przedpremierowy",
  en: "Pre-premiere concert",
};
const VA_PERFO = {
  pl: "Artysta wizualny / Performer",
  en: "Visual artist / Performer",
};
const INTERACTIVE_INSTALLATION = {
  pl: "Instalacja interaktywna",
  en: "Interactive installation",
};
const PROJECT_AMBIENT = { pl: "Projekt ambientowy", en: "Ambient project" };
const LIVE_AV_SHOW = { pl: "Live AV Show", en: "Live AV Show" };
const KACZMARSKA_BIO = {
  pl: [
    "Na STREFACH CZASOWYCH Ania Kaczmarska stanie oko w oko z własnym cieniem.",
    "Tekst do jej pracy rozsypuje się na kartce jak kroki na parkiecie: „Było”, „Jest”, „Będzie”, „Ja”, „Ty”. Ruch prowadzi tu przez wszystkie czasy naraz, a każde zatrzymanie ma swojego świadka.",
    "Ania Kaczmarska to tancerka i choreografka z Trójmiasta, absolwentka programu tańca współczesnego MoDem Atelier w Scenario Pubblico na Sycylii. Specjalizuje się w projektach site-specific. W Katanii stworzyła solo „95131” o dzielnicy San Berillo, a w tym roku wyreżyserowała spektakl „Pożegnanie ze starym logo Żabki”.",
    "Tej nocy jedna godzina wydarzy się dwa razy. Ciekawe, czy cień nadąży.",
  ],
  en: [
    "At STREFY CZASOWE, Ania Kaczmarska will come face to face with her own shadow.",
    "The text for her work scatters on the page like footsteps on the dance floor: „Was”, „Is”, „Will be”, „I”, „You”. The movement here leads through all times at once, and every pause has its witness.",
    "Ania Kaczmarska is a dancer and choreographer from the Tri-City, a graduate of the contemporary dance program MoDem Atelier at Scenario Pubblico in Sicily. She specializes in site-specific projects. In Catania, she created the solo „95131” about the San Berillo district, and this year she directed the play „Farewell to the old Żabka logo”.",
    "Tonight, one hour will happen twice. I wonder if the shadow will keep up.",
  ],
};
const SUBBASICS_BIO = {
  pl: [
    "Dub techno, UK bass i dubstepowe korzenie. Na STREFACH CZASOWYCH zagra je Sub Basics, prosto z Wielkiej Brytanii.",
    "Głęboki sub, który nie odpuszcza ani na takt, i groove, który gęstnieje z każdym przejściem. Kiedy rytm się przesuwa, parkiet idzie za nim — cały, naraz.",
    "Na Spotify jego „Vapour” przekroczyło milion odtworzeń, a „Expansion” ma ich ponad 700 tysięcy. Od 2018 roku prowadzi własny label Temple of Sound.",
    "W tę noc zegary cofną się o godzinę. Sub Basics dopilnuje, żeby żadna minuta się nie zmarnowała.",
  ],
  en: [
    "Straight from the UK, Sub Basics brings dub techno, UK bass and dubstep roots to STREFY CZASOWE (TIME ZONES) in Gdynia, Poland. A conceptual festival unfolding around the seasonal clock change, STREFY CZASOWE combines music, visual art, performance and sensory experiences, creating a space for unexpected encounters between sound, image and the body.",
    "Deep sub that doesn’t let up for a single bar, and a groove that thickens with every transition. When the rhythm shifts, the dancefloor moves with it — all of it, all at once.",
    "On Spotify, his “Vapour” has passed a million plays, and “Expansion” has more than 700,000. Since 2018 he has been running his own label, Temple of Sound.",
    "That night the clocks go back an hour. Sub Basics will make sure not a single minute goes to waste.",
  ],
};
const TULIUSZ_BIO = {
  pl: [
    "Na STREFACH CZASOWYCH Tuliluliuwu pokaże performans „Jak to jest być nietoperzem?”. Tytuł pożycza pytanie z eseju Thomasa Nagela.",
    "Zwykle publiczność staje w kręgu wokół osoby performującej. Tu krąg się rozpadnie, a kolejne osoby trafią do środka. Jak u nietoperzy, grupa rozproszy się i zbierze na nowo, trochę inna niż przed chwilą.",
    "Tuliluliuwu, czyli Tuliusz Kierznowski to twórca wizualny i drag thing z Gdańska, studiuje grafikę na gdańskiej ASP. Prowadzi drag bingo show i współtworzy queerowe wydarzenia z House of Rdza. Jak mówi o sobie, robi rzeczy ładne, brzydkie i dziwne.",
    "Nietoperz odpowie nam na 40 kHz. Nie usłyszymy tego, ale poczujemy ciepło.",
  ],
  en: [
    "At STREFY CZASOWE, Tuliluliuwu will present the performance „What is it like to be a bat?”. The title borrows a question from Thomas Nagel’s essay.",
    "Usually, the audience stands in a circle around the performer. Here, the circle will break apart, and individuals will enter the center. Like bats, the group will disperse and gather again, slightly different than before.",
    "Tuliluliuwu, or Tuliusz Kierznowski, is a visual creator and drag thing from Gdańsk, studying graphic design at the Gdańsk Academy of Fine Arts. He hosts a drag bingo show and co-creates queer events with House of Rdza. As he describes himself, he makes things that are beautiful, ugly, and strange.",
    "The bat will respond to us at 40 kHz. We won’t hear it, but we’ll feel the warmth.",
  ],
};
const ORZECHOWSKA_BIO = {
  pl: [
    "Instalacja Patrycji Orzechowskiej wplącze się w przestrzeń nadchodzących STREF CZASOWYCH. Na festiwalu zaprezentuje pracę, która w próbie odzyskania witalności nieożywionej materii, przyjmuje żywą, organiczną formę.",
    "Patrycja Orzechowska to artystka wizualna i autorka książek artystycznych związana z Gdańskiem. Jest absolwentką Akademii Sztuk Pięknych w Gdańsku oraz Interdyscyplinarnych Studiów Doktoranckich Uniwersytetu Artystycznego w Poznaniu. Pracuje z ceramiką, instalacją, obiektem, fotografią, kolażem, grafiką użytkową i zbieractwem. Najbardziej lubi płodozmian.",
  ],
  en: [
    "Patrycja Orzechowska’s installation will weave itself into the space of the upcoming STREFY CZASOWE. At the festival, she will present a work that, in an attempt to restore vitality to inanimate matter, takes on a living, organic form.",
    "Patrycja Orzechowska is a visual artist and author of artist books associated with Gdańsk. She is a graduate of the Academy of Fine Arts in Gdańsk and the Interdisciplinary Doctoral Studies at the University of the Arts in Poznań. She works with ceramics, installation, object, photography, collage, graphic design and collecting. She likes crop rotation the most.",
  ],
};
const KONIARSKA_BIO = {
  pl: [
    "Na STREFACH CZASOWYCH Marta Maria Koniarska pokaże obrazy olejne i haft o tym, czego szukamy, choć nie umiemy tego złapać.",
    "Obrazy „Zupa Nic”, „kwiaty paproci” i „Stan skupienia” pytają, czy istnieją przepisy na szczęście — i czy poznamy, że już do niego doszliśmy. W hafcie „: P” wyszyte narządy układają się w mapę, przez którą ciało próbuje mówić na zewnątrz.",
    "Marta Maria Koniarska to artystka wizualna i kuratorka, absolwentka ASP w Gdańsku. Współtworzy niezależną galerię Wolne Pokoje i część wizualną festiwalu Spokój, a w gdyńskich Przystaniach Sąsiedzkich prowadzi warsztaty plastyczne dla kilku pokoleń naraz.",
    "Kwiat paproci podobno zakwita w najkrótszą noc roku. My poszukamy go w tę, która potrwa godzinę dłużej.",
  ],
  en: [
    "At STREFY CZASOWE, Marta Maria Koniarska will present oil paintings and embroidery about what we seek, even though we cannot grasp it.",
    "The paintings „Zupa Nic”, „kwiaty paproci” and „Stan skupienia” ask whether there are recipes for happiness — and whether we will recognize that we have already reached it. In the embroidery „: P”, the stitched organs form a map through which the body tries to speak outward.",
    "Marta Maria Koniarska is a visual artist and curator, a graduate of the Academy of Fine Arts in Gdańsk. She co-creates the independent gallery Wolne Pokoje and the visual part of the Spokój festival, and conducts art workshops for multiple generations at the Gdynia Przystanie Sąsiedzkie.",
    "The fern flower is said to bloom on the shortest night of the year. We will search for it on the one that lasts an hour longer.",
  ],
};
const WIKA_BIO = {
  pl: [
    "Wika Wieczorek wyświetla na ścianie zdjęcia w kolorach gęstych jak syrop i stawia przed nimi swojego młodszego brata. W filmie „It’s Just a Dream” chłopiec przechodzi ze świata do świata jak z pokoju do pokoju. Każdy daje mu nowe zadanie, a każda pobudka okazuje się kolejnym piętrem snu.",
    "Wika jest fotografką i filmowczynią z Trójmiasta, związaną z gdańską ASP. Sen to jej stały temat. Jej modowe edytoriale publikowały K MAG, Adore Magazine i YAP Magazine. Współtworzy też grupę artystyczną Euro-sieć, który na STREFACH postawi instalację inspirowaną kafejkami internetowymi.",
  ],
  en: [
    "Wika Wieczorek displays photographs on the wall in thick colors like syrup and places her younger brother in front of them. In the film „It’s Just a Dream”, the boy moves from world to world like from room to room. Each gives him a new task, and each awakening proves to be another floor of the dream.",
    "Wika is a photographer and filmmaker from the Tri-City, connected to the Gdańsk ASP. Dreams are her constant theme. Her fashion editorials have been published in K MAG, Adore Magazine and YAP Magazine. She also co-creates the artistic group Euro-sieć, which will install a piece inspired by internet memes at STREFY CZASOWE.",
  ],
};
const ALLG_BIO = {
  pl: [
    "Znana z basowych brzmień ALLG po raz pierwszy wpuści publiczność do swojego krajobrazu ambientu — na STREFACH CZASOWYCH.",
    "DJ-ka, współzałożycielka kolektywu POISE i kuratorka sceny Leśnej na festiwalu Spokój. W swoich setach nie przywiązuje się do podziałów gatunkowych — szuka eksperymentalnych szczelin i kiełkujących z nich nowych form wyrazu. Napędzają ją emocje, ciekawość i chęć zaskoczenia — szczególnie samej siebie.",
  ],
  en: [
    "Known for her bass-heavy sound, ALLG will for the first time invite the audience into her ambient landscape — at STREFY CZASOWE.",
    "DJ, co-founder of the POISE collective and curator of the Forest stage at the Spokój festival. In her sets, she does not adhere to genre divisions — she seeks experimental gaps and the new forms of expression that sprout from them. She is driven by emotions, curiosity, and a desire to surprise — especially herself.",
  ],
};
const KULCZYNSKA_BIO = {
  pl: [
    "Dominika Kulczyńska — artystka wizualna, ceramiczka i edukatorka —  eksploruje te organiczne przemiany, poszukuje nowych sposobów wykorzystania ceramiki jako medium wypowiedzi artystycznej. Pracuje z surową gliną, gruzem ceramicznym i odpadami geologicznymi, badając twórczy potencjał materii i procesów zachodzących na jej marginesach.",
    "W pracy „Szacunek do błota”, rozwijanej od 2022 roku, niewypalona glina trafia pod szklaną kopułę. W odpowiednich warunkach obrasta pleśnią i glonami, a na jej powierzchni kiełkują rośliny. Materia, często traktowana jako niepotrzebny urobek lub przeszkoda, staje się obiektem obserwacji, podatnym na przemiany i zdolnym tworzyć warunki dla rozwoju życia.",
    "Czy coś musi być żywe, żeby zasługiwało na naszą troskę?",
  ],
  en: [
    "Dominika Kulczyńska — visual artist, ceramicist and educator — explores these organic transformations, seeking new ways to use ceramics as a medium of artistic expression. She works with raw clay, ceramic rubble and geological waste, investigating the creative potential of matter and the processes occurring at its margins.",
    "In the work „Respect for Mud”, developed since 2022, unfired clay is placed under a glass dome. Under the right conditions, it becomes overgrown with mold and algae, and plants sprout on its surface. Matter, often treated as unnecessary debris or an obstacle, becomes an object of observation, susceptible to transformation and capable of creating conditions for the development of life.",
    "Does something have to be alive to deserve our care?",
  ],
};
const ERNEST_BIO = {
  pl: [
    "Na STREFACH CZASOWYCH Ernest Borowski pokaże performans „To be porous / For monsters” — dziwny rytuał-zabawę o pożądaniu, które niczego nie chce posiadać.",
    "Ściana dźwięku, trzaski noise’u i ciało, które przyciąga i opiera się spojrzeniu naraz. Gest, głos i obecność zmieniają tu znaczenie, a granica między tym, co pociągające, i tym, co obce, robi się porowata.",
    "W Strefie Podziemia zostaną po nim animacje „Embodied fantasy” i „Medytacja Chaosu” oraz kamień-maska z cyklu „Praktyki oduczania”.",
    "Ernest Borowski to queerowy artysta interdyscyplinarny i researcher, który pracuje na styku nowych mediów, dźwięku, performansu i spekulatywnej narracji. Pokazywał prace m.in. w Muzeum Sztuki Nowoczesnej w Warszawie, w berlińskim Silent Green i na festiwalu Unsound.",
    "Słowo „monstrum” pochodzi od łacińskiego monere, czyli „ostrzegać”. Uważajcie się za ostrzeżonych.",
  ],
  en: [
    "At STREFY CZASOWE, Ernest Borowski will present the performance „To be porous / For monsters” — a strange ritual-play about desire that wants to possess nothing.",
    "A wall of sound, noise crackles, and a body that attracts and resists the gaze at once. Gesture, voice, and presence change meaning here, and the boundary between what is alluring and what is alien becomes porous.",
    "In the Underground Zone, he will leave behind the animations „Embodied fantasy” and „Meditation of Chaos”, as well as a stone-mask from the series „Practices of unlearning”.",
    "Ernest Borowski is a queer interdisciplinary artist and researcher working at the intersection of new media, sound, performance, and speculative narrative. He has exhibited works at the Museum of Modern Art in Warsaw, Berlin's Silent Green, and the Unsound festival.",
    "The word „monstrum” comes from the Latin monere, meaning „to warn”. Consider yourselves warned.",
  ],
};
const NINA_BIO = {
  pl: [
    "NINA EBA to solowy projekt Ukrainki Aliny Volkovej. Ucho nastroiły jej lata za konsoletą w basowych klubach Kijowa.",
    "Po pełnoskalowej inwazji rosji znalazła bezpieczne miejsce w Grazu, w Austrii. Nie mając nic do stracenia, wyszła zza konsolety i zaczęła pisać własne piosenki. Tak powstał debiut „MORPHO”: o locie, pęknięciu i powrocie do sił.",
    "Z Grazu rusza w Europę z audiowizualnymi koncertami, szerokimi jak kino, ale skrojonymi pod klub. Czułość zderza się w nich z uderzeniem, nostalgia z pędem.",
    "Sama mówi o dobrowolnym podglądactwie: wpuszcza nas do swojego kokonu.",
  ],
  en: [
    "NINA EBA is the solo project of Ukrainian Alina Volkova. Her ear was tuned by years behind the console in bass-heavy clubs in Kyiv.",
    "After the full-scale invasion of russia, she found a safe place in Graz, Austria. With nothing to lose, she stepped out from behind the console and began writing her own songs. This is how her debut „MORPHO” was born: about flight, fracture, and regaining strength.",
    "From Graz, she is touring Europe with audiovisual concerts, as wide as cinema but tailored for the club. Sensitivity collides with impact, nostalgia with momentum.",
    "She speaks of voluntary voyeurism: she lets us into her cocoon.",
  ],
};
const LAURA_BIO = {
  pl: [
    "Na STREFACH CZASOWYCH Laura Adel pokaże COALESCE — interaktywną instalację, w której to ciało i ruch rzeźbią ulotne obrazy.",
    "Co zostaje z ruchu, który trwa mgnienie oka? Obiektyw wychwytuje sylwetkę przechodzącej osoby, a różnice między kolejnymi chwilami zapisują się w abstrakcyjnych, monochromatycznych formach. Powstają rzeźby z czasu. Znikają, zanim zdążymy się im przyjrzeć, ustępując miejsca nowym.",
    "Interaktywna instalacja, w której ruchy ciała tworzy abstrakcyjne formy.",
    "Laura Adel tworzy abstrakcyjne wideo i instalacje inspirowane zjawiskami natury. Na co dzień pracuje w Ars Electronica Solutions w Linzu przy projektach dla immersyjnej przestrzeni Deep Space. Swoje prace pokazywała m.in. na Ars Electronica Festival i Biennale Sztuki Mediów WRO.",
    "Tej nocy nikt nie przejdzie niezauważony.",
  ],
  en: [
    "At STREFY CZASOWE, Laura Adel will present COALESCE — an interactive installation where the body and movement sculpt ephemeral images.",
    "What remains of a movement that lasts the blink of an eye? The lens captures the silhouette of a passing person, and the differences between successive moments are recorded in abstract, monochromatic forms. Sculptures of time emerge. They vanish before we can examine them, making way for new ones.",
    "An interactive installation where body movements create abstract forms.",
    "Laura Adel creates abstract video and installations inspired by natural phenomena. She works daily at Ars Electronica Solutions in Linz on projects for the immersive Deep Space environment. Her works have been exhibited at Ars Electronica Festival and WRO Media Art Biennale, among others.",
    "Tonight, no one will go unnoticed.",
  ],
};
const PHAZ_BIO = {
  pl: [
    "Inna strefa czasowa, inny rytm. Ciężkie bity, hipnotyczne perkusje i arabskie melodie zderzają się z techno, basem i połamanymi rytmami. 3Phaz przekuwa energię egipskiej muzyki ulicznej w bezkompromisową elektronikę. Eksportowy towar dźwiękowy prosto z Kairu — tym razem ląduje w Gdyni.",
    "Mahraganat i shaabi przejmują scenę. 3Phaz sięga po egipskie gatunki muzyki popularnej i łączy je z ciężkim basem i surową energią klubu. W jego brzmieniu spotykają się tradycja i elektronika, a echa weselnych imprez z Kairu lat 2000. trafiają na współczesny parkiet.",
    "Występował na barcelońskiej Primavera Sound, a jego set z festiwalu Nuits Sonores w Lyonie transmitował Boiler Room.  24 października 3Phaz wtłoczy puls egipskiej sceny w żyły STREF CZASOWYCH.",
  ],
  en: [
    "A different time zone, a different rhythm. Heavy beats, hypnotic percussion and Arabic melodies collide with techno, bass and broken rhythms. 3Phaz transforms the energy of Egyptian street music into uncompromising electronic music. An export sound commodity straight from Cairo — this time landing in Gdynia.",
    "Mahraganat and shaabi take over the scene. 3Phaz draws from Egyptian popular music genres and combines them with heavy bass and raw club energy. In his sound, tradition meets electronics, and echoes of wedding parties from Cairo in the 2000s hit the contemporary dance floor.",
    "He has performed at Barcelona's Primavera Sound, and his set from the Nuits Sonores festival in Lyon was broadcast on Boiler Room. On October 24th, 3Phaz will inject the pulse of the Egyptian scene into the veins of STREFY CZASOWE.",
  ],
};
const LDS_BIO = {
  pl: [
    "Artysta muzyczny, DJ i performer. Pierwszy z zagranicznych artystów tej edycji. Jego wartkie, hipnotyczne i nieprzewidywalne brzmienie wyniosło go na międzynarodową scenę muzyki elektronicznej.",
    "Występował w Tresor, Berghain i The Lot Radio, do Trójmiasta przywiezie techno z Berlina, przepuszczone przez własny, nieoczywisty język.",
    "Na STREFACH zagra szybki i gęsty live act, w którym jego interpretacja transu zetknie się z nieubłaganym pomrukiem zimy.",
  ],
  en: [
    "Music artist, DJ and performer. The first of the foreign artists of this edition. His fast-paced, hypnotic and unpredictable sound has taken him to the international electronic music scene.",
    "He has performed at Tresor, Berghain and The Lot Radio, and will bring techno from Berlin to the Tricity, filtered through his own unconventional language.",
    "At STREFY he will play a fast and dense live act, in which his interpretation of trance will meet the relentless rumble of winter.",
  ],
};
const TOSIA_BIO = {
  pl: [
    "Jak wyglądałby taniec korzeni i kropli rosy?",
    "Tosia, trójmiejska DJ-ka związana z Radio Internet Libero, tworzy muzyczne kolaże, podążając za własną ciekawością i tym, co akurat ją porusza. W jej selekcji subtelne dźwięki powoli nabierają rytmu, przywołują skojarzenia z naturą i wabią do tańca.",
    "24 października sprawdzimy, dokąd zaprowadzi nas jej mikrokosmos na STREFACH CZASOWYCH.",
  ],
  en: [
    "What would a dance of roots and drops of dew look like?",
    "Tosia, a tri-city DJ associated with Radio Internet Libero, creates musical collages, following her own curiosity and what currently moves her. In her selection, subtle sounds gradually build rhythm, evoke associations with nature, and invite dancing.",
    "On October 24th, we will see where her microcosmos leads us at STREFACH CZASOWYCH.",
  ],
};
const AE_BIO = {
  pl: [
    "DJ, kurator, MC. Traktuje sety jak rytuały uważności, momenty wejrzenia w siebie i w osoby, z którymi dzielimy parkiet. W muzyce szuka tego, co pierwotne — perkusyjności, transu i głębi.",
    "Jego brzmienie łączy głębokie, surowe techno z eksperymentalnymi fakturami. Tłuste, basowe zgrzyty i pulsujący trans sprawiają, że jego sety nabierają charakter rytualnego doświadczenia. Æ62, czyli Igor Wegner, jako współtwórca inicjatywy OMMA angażuje się w rozwój pomorskiej sceny muzycznej — organizuje mikro festiwal w Gorzelni Gwieździn, czy trójmiejski cykl Inner Speaker.",
  ],
  en: [
    "DJ, curator, MC. Treats sets like rituals of mindfulness, moments of looking inward and toward others with whom we share the stage. In music, he seeks what is primitive — rhythmic intensity, trance, and depth.",
    "His sound combines deep, raw techno with experimental textures. Thick, bass-heavy grooves and pulsating trance create an experience with a ritualistic character. Æ62, or Igor Wegner, as a co-creator of the OMMA initiative, is engaged in developing the Pomorska music scene — organizing a micro-festival in Gorzelni Gwieździn and the tri-city Inner Speaker cycle.",
  ],
};
const IRENA_BIO = {
  pl: [
    "Ciało jest pamięcią. Czerwień jest jego językiem. Gdy to, co ukryte, zaczyna się poruszać, cisza staje się odpowiedzią.",
    "ONE to etiuda filmowa Darii Ireny Górniewskiej i Aleksandry Banaś — osobista opowieść o pamięci i stracie, w której emocje wyrażają się poprzez obraz, ciało, światło i kolor. Zamiast linearnej historii film otwiera przestrzeń dla tego, co trudne do wypowiedzenia, i pozwala odnaleźć własne uczucia w cudzym doświadczeniu.",
    "Projekcji towarzyszy starannie wykreowana przestrzeń odbioru, która wykracza poza zmysły wzroku i słuchu, angażując widza w wielozmysłowe doświadczenie filmowe.",
  ],
  en: [
    "The body is memory. Red is its language. When what is hidden begins to move, silence becomes the answer.",
    "ONE is a film etude by Daria Irena Górniewska and Aleksandra Banaś — a personal story about memory and loss, in which emotions are expressed through image, body, light and color. Instead of a linear narrative, the film opens up space for what is difficult to articulate, allowing viewers to find their own feelings in someone else's experience.",
    "The screening is accompanied by a carefully crafted reception space that goes beyond the senses of sight and hearing, engaging the audience in a multi-sensory cinematic experience.",
  ],
};
const EURO_BIO = {
  pl: [
    "Ostatni raz internet był przytulnym miejscem gdy istniały kafejki internetowe.",
    "Sprawdzimy tę myśl z EURO-SIECIĄ — grupą znajomych z Gdańska, która ożywia trójmiejską scenę artystyczną, tworząc prace, instalacje i wystawy zakorzenione w konkretnych miejscach.",
    "Podczas nadchodzących STREF CZASOWYCH debiutująca grupa EURO-SIEĆ zaprezentuje interaktywną instalację inspirowaną digital nostalgią, która przybierze formę kafejki internetowej. Przyjdźcie zaszyć się w kokonie analogowego internetu.",
    "Dotychczas grupa zrealizowała instalację-wystawę podczas festiwalu Idealistic w IKM w Gdańsku, jednodniową wystawę „OTWARTE/ZAMKNIETE” na stoisku wrzeszczańskiego ryneczku, oraz wystawę w ramach warszawskiego wydarzenia sobota jest dla ziomali.",
  ],
  en: [
    "The last time the internet was a cozy place was when internet cafes existed.",
    "We will explore this idea with EURO-SIECIĄ — a group of friends from Gdansk who are revitalizing the tri-city artistic scene, creating works, installations and exhibitions rooted in specific places.",
    "During the upcoming STREFY CZASOWE, the debut group EURO-SIEĆ will present an interactive installation inspired by digital nostalgia, taking the form of an internet café. Come and hide in the cocoon of analog internet.",
    "So far, the group has realized an installation-exhibition during the Idealistic festival at IKM in Gdansk, a one-day exhibition „OTWARTE/ZAMKNIETE” at the wrzeszczański market stall, and an exhibition as part of the Warsaw event 'sobota jest dla ziomali'.",
  ],
};
const GOSHA_BIO = {
  pl: [
    "Partnerki w życiu i na scenie. gosha savage x L A V E N spotkają się we wspólnym muzycznym eksperymencie, w którym zderzą swoje wrażliwości, intuicje i brzmieniowe poszukiwania.",
    "gosha savage eksploruje syntezę FM i sampling, poruszając się między eksperymentalną elektroniką, post-clubem i noise’em. L A V E N przechodzi od efemerycznych melodii przez trance i techno po mroczne, przesterowane formy.",
    "Podczas live actu dwie muzyczne praktyki zetkną się i zanurzą w sobie nawzajem.",
  ],
  en: [
    "Partners in life and on stage. gosha savage x L A V E N will meet in a joint musical experiment, where they will collide their sensitivities, intuitions and sound explorations.",
    "gosha savage explores FM synthesis and sampling, moving between experimental electronics, post-club and noise. L A V E N moves from ephemeral melodies through trance and techno to dark, distorted forms.",
    "During the live act, the two musical practices will meet and immerse themselves in each other.",
  ],
};
const MAKS_BIO = {
  pl: [
    "Interdyscyplinarny twórca wizualny i performer. W swojej sztuce wykorzystuje grafikę analogową i cyfrową, malarstwo, fotografie oraz instalacje. Jego prace i akcje, często ekshibicjonistyczne w swojej formie, uwodzą widza i wciągają go do rozważań nad własną tożsamością.",
    "Student grafiki na Wydziale Sztuk Pięknych Uniwersytetu Rzeszowskiego. Uczestnik programu „Laboratorium percepcji – edycja 2025” organizowanym przez Instytut Jerzego Grotowskiego we Wrocławiu. Uczestniczył w czwartej oraz piątej edycji Studenckiego Międzynarodowego Przeglądu Performansu aKTOmaR w Teatrze KTO w Krakowie.",
  ],
  en: [
    "Interdisciplinary visual creator and performer. In his art, he uses analog and digital graphics, painting, photography and installations. His works and actions, often exhibitionist in form, captivate the viewer and draw them into reflections on their own identity.",
    "Graphic design student at the Faculty of Fine Arts of the University of Rzeszów. Participant of the „Laboratorium percepcji – edition 2025” program organized by the Institute of Jerzy Grotowski in Wrocław. Participated in the fourth and fifth editions of the Student International Performance Review aKTOmaR at the KTO Theatre in Krakow.",
  ],
};
const IRMINA_BIO = {
  pl: [
    "Osoba artystyczna, performerka i twórczyni wizualna. Interesują ją surowość, przypadek i reakcje na niesprzyjające warunki.",
    "Podczas festiwalu poigra z napięciem pomiędzy tym, co istnieje, a tym, czego nie można powiedzieć — w dedykowanym performansie.",
    "Irmina Kowalska od 2023 roku studiuje sztuki wizualne na Wydziale Sztuk Pięknych Uniwersytetu Rzeszowskiego. Pracuje w różnych mediach — od filmu eksperymentalnego i wizualizacji, przez instalację, po malarstwo i grafikę.",
    "Tym razem jej praktyka spotka się z festiwalową przestrzenią i atmosferą zmiany czasu i cyklu. Zobaczymy, jak wygląda pogranicze, kiedy dostaje ciało.",
  ],
  en: [
    "Artistic person, performer and visual creator. She is interested in harshness, chance and reactions to adverse conditions.",
    "During the festival, she will play with tension between what exists and what cannot be said — in a dedicated performance.",
    "Since 2023, Irmina Kowalska has been studying visual arts at the Faculty of Fine Arts of the University of Rzeszów. She works in various media — from experimental film and visualization, to installation, painting and graphics.",
    "This time her practice will meet the festival space and the atmosphere of changing time and cycle. We will see what the border looks like when it gets a body.",
  ],
};
const SAP_BIO = {
  pl: [
    "Jak usłyszeć szept rośliny? SAP FLOW: Głos Milczącej Tkanki wykorzystuje autorski system biofeedbacku, który wychwytuje elektryczne impulsy zachodzące w tkankach roślin i przekłada je na sygnały sterujące dźwiękiem. Na żywo powstaje kompozycja, w której puls staje się słowem, a roślina dyrygentką.",
    "Marta Sap to gdańska artystka dźwiękowa, multiinstrumentalistka i wokalistka. W swojej twórczości łączy didgeridoo i archaiczne instrumenty z głosem, elektroniką, dronem i eksperymentem. Należy do Kolektywu Morfy, a wraz z Krzysztofem Arszynem Topolskim realizuje projekt Drony. Jej muzyka ukazała się również na międzynarodowej składance wytwórni KEEP on didjin records.",
  ],
  en: [
    "How to hear the whisper of a plant? SAP FLOW: The Voice of Silent Tissue uses a proprietary biofeedback system that captures the electrical impulses occurring in plant tissues and translates them into sound-controlling signals. A composition is created live, where the pulse becomes a word, and the plant becomes the conductor.",
    "Marta Sap is a sound artist, multi-instrumentalist and vocalist from Gdańsk. In her work, she combines didgeridoo and archaic instruments with voice, electronics, drone and experimentation. She is a member of the Morfy Collective, and together with Krzysztof Arszyn Topolski she runs the Drony project. Her music has also been released on an international compilation by KEEP on didjin records.",
  ],
};
const WKRSC_BIO = {
  pl: [
    "Muzyka na pograniczu ambientu, lo-fi elektroniki i alternatywy. WKRSC x MIILE łączą eksperymentalny wokal z pulsującymi, wielowarstwowymi beatami.",
    "Podczas festiwalu namalują hipnotyzujący pejzaż dźwiękowy, wyśniony na klubowym parkiecie.",
    "WKRSC x MIILE to wspólny projekt Wiktorii Kruszczyńskiej i Miłosza Pieczonki. Ich debiutancki album „Deluzje” powstaje w domowym studiu, swobodnie i organicznie. Inspirują się twórczością takich artystów jak Sega Bodega, FKA twigs czy Björk.",
    "Projekt traktują jako opowieść o snach, splątaniach i uwalnianiu. Duet potrafi przenieść ten świat zarówno na scenę klubową, jak i w bardziej intymny odsłuch. W 2025 roku wydali m.in. „Mikroplastik” z udziałem Piotra Roguckiego, a ich teledysk do „Autonomii” otrzymał nominację w kategorii Mikrobudżet w 8. edycji PL Music Video Awards.",
  ],
  en: [
    "Music on the border of ambient, lo-fi electronics and alternative. WKRSC x MIILE combine experimental vocals with pulsating, multi-layered beats.",
    "During the festival, they will paint a hypnotic soundscape, dreamed on the club dance floor.",
    "WKRSC x MIILE is a joint project of Wiktoria Kruszczyńska and Miłosz Pieczonka. Their debut album „Deluzje” is created in a home studio, freely and organically. They are inspired by the works of artists such as Sega Bodega, FKA twigs and Björk.",
    "They treat the project as a story about dreams, entanglements and liberation. The duo can bring this world both to the club stage and to a more intimate listening experience. In 2025, they released, among others, „Mikroplastik” featuring Piotr Rogucki, and their music video for „Autonomia” received a nomination in the Microbudget category at the 8th edition of PL Music Video Awards.",
  ],
};
const CIEZAK_BIO = {
  pl: [
    "Artystka wizualna i animatorka. Pracuje w różnych mediach, od malarstwa olejnego po animację 3D. Jej projekt, inspirowany grą powietrza, światła i cieni, zaprosi widzów do zanurzenia się w instalacji i błądzenia między formami racjonalnymi i organicznymi, strukturą i chaosem.",
    "Pochodzi z Krakowa, obecnie mieszka i pracuje w Rzymie. Interesują ją ruch, przestrzeń, kolor oraz relacja odbiorcy ze sztuką. Porusza się między abstrakcją i realizmem. Chętnie maluje portrety oraz pejzaże — przez ostatnie dwa lata robiła to w Albanii.",
    "Jest absolwentką PJATK-u w Gdańsku, programu Master in Motion Design na LABASAD Barcelona School of Arts & Design oraz nawigacji na Akademii Marynarki Wojennej w Gdyni. Pracowała jako malarka przy produkcji filmu animowanego „Chłopi”. Wraz z zespołem zdobyła pierwsze miejsce w konkursie Eko Animation Slam na ASP w Gdańsku, a także znalazła się w finale konkursu „Ożywienie” w galerii Apteka Sztuki w Warszawie. ",
  ],
  en: [
    "Visual artist and animator. She works in various media, from oil painting to 3D animation. Her project, inspired by the play of air, light and shadows, will invite viewers to immerse themselves in the installation and wander between rational and organic forms, structure and chaos.",
    "From Krakow, currently living and working in Rome. She is interested in movement, space, color and the relationship between the viewer and art. She moves between abstraction and realism. She enjoys painting portraits and landscapes — for the past two years she has been doing this in Albania.",
    "She is a graduate of PJATK in Gdańsk, the Master in Motion Design program at LABASAD Barcelona School of Arts & Design, and navigation at the Naval Academy in Gdynia. She worked as a painter on the animated film production „Chłopi”. Together with her team, she won first place in the Eko Animation Slam competition at ASP in Gdańsk, and also reached the finals of the „Ożywienie” competition at the Apteka Sztuki gallery in Warsaw.",
  ],
};
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
    "Interesują ją procesy podtrzymujące życie: adaptacja, regeneracja i ewolucja. Te procesy łączą jej praktykę z zimową odsłoną STREF CZASOWYCH - zapadaniem w produktywny letarg i przygotowaniem do kolejnego cyklu.",
  ],
  en: [
    "Visual artist, educator, activist. In her practice she combines photography, sculpture and graphics, drawing inspiration from scientific research and activist experiences. She creates speculative protective structures, organisms and forms of care, exploring the possibilities of future transformations.",
    "She is interested in life-sustaining processes: adaptation, regeneration and evolution. These processes connect her practice with the winter edition of STREFY CZASOWE - hibernating into a productive lethargy and preparing for the next cycle.",
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
    "Na STREFACH CZASOWYCH zobaczymy jej pracę, w której ludzkie ciało spotyka się z ciałem maszyny, w niekonwencjonalnej odsłonie erotyki.",
  ],
  en: [
    "Visual artist and sculptress. She freely combines sculpture, installation and graphics, seeking fresh means of expression. She plays with language and the body.",
    "At STREFY CZASOWE we will see her work, in which the human body meets the body of a machine, in an unconventional take on eroticism.",
  ],
};
const KOLODZIEJ_BIO = {
  pl: [
    "Artystka wizualna z Gdyni, absolwentka ASP w Warszawie. Projektuje sensoryczne doświadczenia inspirowane snami i procesami natury.",
    "Na STREFACH CZASOWYCH zabierze nas do znajomego świata pełnego widm wyobrażonych istot.",
  ],
  en: [
    "Visual artist from Gdynia, graduate of the Academy of Fine Arts in Warsaw. She designs sensory experiences inspired by dreams and natural processes.",
    "At STREFY CZASOWE she will take us to a familiar world full of specters of imagined beings.",
  ],
};
const VIOLANTE_BIO = {
  pl: [
    "Włoska DJ-ka i producentka, mieszkającą i pracującą w Sztokholmie, założycielka radia Internet Libero. Tworzy gęste pejzaże dźwiękowe, pełne nieoczekiwanych przejść i zwrotów.",
    "W trakcie jej setów muzyka klubowa zamienia się w opowieść wysnutą z dźwięków, a DJ-ing w przestrzeń eksperymentu.",
  ],
  en: [
    "She is an Italian, Stockholm-based DJ and producer, founder of Radio Internet Libero. She creates dense soundscapes filled with unexpected transitions and turns.",
    "In her sets, club music unfolds into a story woven from sound, while DJing becomes a space for experimentation.",
  ],
};
const MATTIA_BIO = {
  pl: [
    "Jego live act ma w sobie coś z rytuału. Punktem wyjścia jest preparowana gitara elektryczna, na której artysta gra smyczkiem, elektrycznym sustainerem i przedmiotami codziennego użytku przykładanymi do przetwornika. Jej dźwięk rozciąga się w powolne drony, nakładane na syntezatorowe pady, spoken word i ciężki sub-bas. Głos poddany ekstremalnej modulacji stopniowo traci ludzkie brzmienie — czy traci też tożsamość?",
    "Dźwięk splata się z obrazem, światłem i ruchem, a set staje się wspólnym doświadczeniem, pozwalającym na chwilę wejść w inną rzeczywistość. MATTIA tworzy tymczasowe światy, w których słuchanie staje się sposobem bycia razem.",
  ],
  en: [
    "His live act has something of a ritual about it. The starting point is a prepared electric guitar, on which the artist plays with a pick, an electric sustainer, and everyday objects attached to the pickup. Its sound stretches into slow drones, layered over synthesizer pads, spoken word, and heavy sub-bass. The voice subjected to extreme modulation gradually loses its human timbre — does it also lose its identity?",
    "The sound weaves with image, light, and movement, making the set a shared experience that allows a moment to enter another reality. MATTIA creates temporary worlds where listening becomes a way of being together.",
  ],
};
const ZENSZEN_BIO = {
  pl: [
    "Duet gitarzysty i perkusisty. Ich brzmienie jest transowe, kinowe i ciemne — organiczne instrumenty ścierają się w nim z cyfrowym szumem i glitchem.",
    "Adam Baran i Józef Biegański na festiwalu  przedpremierowo opowiedzą instrumentalne historie na lap steelu, gitarze elektrycznej, preparowanej perkusji i komputerze. Stawiają na minimalizm, a w ich muzyce słychać echa Nilsa Frahma, Daniela Lanoisa, Venetian Snares i Jana Banga",
    "Nie wszystko co dobre rośnie w świetle.",
  ],
  en: [
    "A duo of guitarist and drummer. Their sound is trance-like, cinematic and dark — organic instruments clash with digital noise and glitch.",
    "Adam Baran and Józef Biegański will premiere instrumental stories at the festival on lap steel, electric guitar, prepared percussion and computer. They focus on minimalism, and their music echoes Nils Frahm, Daniel Lanois, Venetian Snares and Jan Bang.",
    "Not everything that is good grows in the light.",
  ],
};
const CHATKA_BIO = {
  pl: [
    "Przez dekadę występował na żywo w kostiumie goryla. Na STREFACH CZASOWYCH Ebo zaprosi nas do swojej chatki.",
    "Chatka Ebo to jego nowy, ambientowy projekt. Kompozycje składa i gra na żywo na Elektronie Digitakt, przeplatając je improwizacjami na syntezatorze modularnym.",
    "Ebo to artysta dźwiękowy i producent, twórca projektów Ebola Ape i Octopush, członek kolektywów Moth i Sonic Tramp. Współpracował m.in. z południowoafrykańskim raperem i producentem Boolzem i amerykańskim raperem Lil Davidem.",
    "Wpadnijcie do chatki, kiedy na parkiecie zrobi się za ciasno.",
  ],
  en: [
    "For a decade he performed live in a gorilla costume. At STREFY CZASOWE, Ebo will invite us to his hut.",
    "Ebo' Hut is his new ambient project. He composes and plays live on the Elektron Digitakt, interweaving it with improvisations on a modular synthesizer.",
    "Ebo is a sound artist and producer, creator of the Ebola Ape and Octopush projects, and a member of the Moth and Sonic Tramp collectives. He has collaborated with South African rapper and producer Boolz and American rapper Lil David.",
    "Come to the hut when the dance floor gets too crowded.",
  ],
};
export const ARTISTS: Artist[] = [
  {
    id: "subbasics",
    name: "Sub Basics",
    role: DJ,
    photo: "festiwal_foto/artysci/subbasics.jpg",
    mask: "announcement-5",
    description: SUBBASICS_BIO,
    instagram: "https://www.instagram.com/subbasics",
    background: "var(--color-periwinkle)",
    text: "var(--color-true-black)",
  },
  {
    id: "phaz",
    name: "3Phaz",
    role: CONCERT,
    photo: "festiwal_foto/artysci/phaz.jpg",
    mask: "announcement-6",
    description: PHAZ_BIO,
    instagram: "https://www.instagram.com/3phaz_",
    background: "var(--color-primary)",
    text: "var(--color-deep-navy)",
  },
  {
    id: "lds",
    name: "LDS",
    role: LIVE_ACT,
    photo: "festiwal_foto/artysci/lds.jpg",
    mask: "announcement-2",
    description: LDS_BIO,
    instagram: "https://www.instagram.com/lds_luca",
    background: "var(--color-periwinkle)",
    text: "var(--color-deep-navy)",
  },
  {
    id: "ninaeba",
    name: "Nina Eba",
    role: LIVE_AV_SHOW,
    photo: "festiwal_foto/artysci/ninaeba.jpg",
    mask: "announcement-6",
    description: NINA_BIO,
    instagram: "https://www.instagram.com/ninaebamusic",
    background: "var(--color-deep-navy)",
    text: "var(--color-cream)",
  },
  {
    id: "zenszen",
    name: "ŻEŃSZEŃ",
    role: PRE_CONCERT,
    photo: "festiwal_foto/artysci/zenszen.jpg",
    mask: "announcement-5",
    description: ZENSZEN_BIO,
    instagram: "https://www.instagram.com/barana_dam",
    instagram2: "https://www.instagram.com/jozef.bieganski",
    background: "var(--color-deep-plum)",
    text: "var(--color-cream)",
  },
  {
    id: "irena",
    name: "Daria Irena x Aleksandra Banaś",
    role: FILM,
    photo: "festiwal_foto/artysci/irena.jpg",
    mask: "announcement-2",
    description: IRENA_BIO,
    instagram: "https://www.instagram.com/aleksandra__banas",
    instagram2: "https://www.instagram.com/darirena",
    background: "var(--color-secondary)",
    text: "var(--color-true-black)",
  },
  {
    id: "wkrsc",
    name: "WKRSC x MIILE",
    role: CONCERT,
    photo: "festiwal_foto/artysci/wkrsc.jpg",
    mask: "announcement-5",
    description: WKRSC_BIO,
    instagram: "https://www.instagram.com/wkrsc.live",
    instagram2: "https://www.instagram.com/miile__p",
    background: "var(--color-deep-plum)",
    text: "var(--color-light-grey)",
  },
  {
    id: "gosha",
    name: "gosha savage x L A V E N",
    role: LIVE_ACT,
    photo: "festiwal_foto/artysci/gosha.jpg",
    mask: "announcement-1",
    description: GOSHA_BIO,
    instagram: "https://www.instagram.com/goshasavage",
    instagram2: "https://www.instagram.com/lvnlvnlvnlvnlvn",
    background: "var(--color-deep-navy)",
    text: "var(--color-cream)",
  },
  {
    id: "orzechowska",
    name: "Patrycja Orzechowska",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/orzechowska.jpg",
    mask: "announcement-2",
    description: ORZECHOWSKA_BIO,
    instagram: "https://www.instagram.com/p.a.t.r.y.c.j.a.orzechowska",
    background: "var(--color-cream)",
    text: "var(--color-universal-brown)",
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
    id: "ae",
    name: "Æ62",
    role: AMBIENT_DJ,
    photo: "festiwal_foto/artysci/ae.jpg",
    mask: "announcement-7",
    description: AE_BIO,
    instagram: "https://www.instagram.com/ae62___",
    background: "var(--color-deep-plum)",
    text: "var(--color-cream)",
  },
  {
    id: "slusarczyk",
    name: "Basia Ślusarczyk",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/slusarczyk.jpg",
    mask: "announcement-5",
    description: SLUSARCZYK_BIO,
    instagram: "https://www.instagram.com/mimimimimimmimimm",
    background: "var(--color-deep-forest)",
    text: "var(--color-periwinkle)",
  },
  {
    id: "ernest",
    name: "Ernest Borowski",
    role: VA_PERFO,
    photo: "festiwal_foto/artysci/ernest.jpg",
    mask: "announcement-2",
    description: ERNEST_BIO,
    instagram: "https://www.instagram.com/bakblivv",
    background: "var(--color-ground)",
    text: "var(--color-primary)",
  },
  {
    id: "mattia",
    name: "Mattia",
    role: AMB_CONCERT,
    photo: "festiwal_foto/artysci/mattia.jpg",
    mask: "announcement-5",
    description: MATTIA_BIO,
    instagram: "https://www.instagram.com/mattiaxspich",
    background: "var(--color-mocha)",
    text: "var(--color-light-grey)",
  },
  {
    id: "kolodziej",
    name: "Zuzanna Kołodziej",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/kolodziej.jpg",
    mask: "announcement-7",
    description: KOLODZIEJ_BIO,
    instagram: "https://www.instagram.com/vi.zuza",
    background: "var(--color-secondary)",
    text: "var(--color-deep-forest)",
  },
  {
    id: "violante",
    name: "Violante",
    role: AMBIENT_DJ,
    photo: "festiwal_foto/artysci/violante.jpg",
    mask: "announcement-2",
    description: VIOLANTE_BIO,
    instagram: "https://www.instagram.com/violanteviolenta",
    background: "var(--color-cream)",
    text: "var(--color-true-black)",
  },
  {
    id: "tuliusz",
    name: "Tuliluliuwu",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/tuliusz.jpg",
    mask: "announcement-2",
    description: TULIUSZ_BIO,
    instagram: "https://www.instagram.com/tuliusz_",
    background: "var(--color-primary)",
    text: "var(--color-true-black)",
  },
  {
    id: "allg",
    name: "ALLG",
    role: AMBIENT_DJ,
    photo: "festiwal_foto/artysci/allg.jpg",
    mask: "announcement-2",
    description: ALLG_BIO,
    instagram: "https://www.instagram.com/itsaaallg",
    background: "var(--color-deep-navy)",
    text: "var(--color-light-grey)",
  },
  {
    id: "ciezak",
    name: "Małgorzata Ciężak",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/ciezak.jpg",
    mask: "announcement-1",
    description: CIEZAK_BIO,
    instagram: "https://www.instagram.com/malgorzata.ciezak",
    background: "var(--color-primary)",
    text: "var(--color-ground)",
  },
  {
    id: "sap",
    name: "Marta Sap",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/sap.jpg",
    mask: "announcement-6",
    description: SAP_BIO,
    instagram: "https://www.instagram.com/martasap",
    background: "var(--color-deep-forest)",
    text: "var(--color-chartreuse)",
  },
  {
    id: "tosia",
    name: "Tosia",
    role: AMBIENT_DJ,
    photo: "festiwal_foto/artysci/tosia.jpg",
    mask: "announcement-7",
    description: TOSIA_BIO,
    instagram: "https://www.instagram.com/7osi4",
    background: "var(--color-ground)",
    text: "var(--color-light-grey)",
  },
  {
    id: "wika",
    name: "Wika Wieczorek",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/wika.jpg",
    mask: "announcement-6",
    description: WIKA_BIO,
    instagram: "https://www.instagram.com/wieczorek.wika",
    background: "var(--color-deep-plum)",
    text: "var(--color-cream)",
  },
  {
    id: "maks",
    name: "Maksio Stopa",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/maks.jpg",
    mask: "announcement-3",
    description: MAKS_BIO,
    instagram: "https://www.instagram.com/czlowiekpajak",
    background: "var(--color-universal-brown)",
    text: "var(--color-cream)",
  },
  {
    id: "kulczynska",
    name: "Dominika Kulczyńska",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/kulczynska.jpg",
    mask: "announcement-3",
    description: KULCZYNSKA_BIO,
    instagram: "https://www.instagram.com/dominikakulczynska",
    background: "var(--color-deep-forest)",
    text: "var(--color-cream)",
  },
  {
    id: "kaczmarska",
    name: "Ania Kaczmarska",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/kaczmarska.jpg",
    mask: "announcement-7",
    description: KACZMARSKA_BIO,
    instagram: "https://www.instagram.com/owsi.anka",
    background: "var(--color-deep-navy)",
    text: "var(--color-periwinkle)",
  },
  {
    id: "chatka",
    name: "Chatka Ebo",
    role: PROJECT_AMBIENT,
    photo: "festiwal_foto/artysci/chatka.jpg",
    mask: "announcement-6",
    description: CHATKA_BIO,
    instagram: "https://www.instagram.com/chatka_ebo",
    background: "var(--color-cream)",
    text: "var(--color-deep-plum)",
  },
  {
    id: "koniarska",
    name: "Marta Koniarska",
    role: VISUAL_ARTIST,
    photo: "festiwal_foto/artysci/koniarska.jpg",
    mask: "announcement-1",
    description: KONIARSKA_BIO,
    instagram: "https://www.instagram.com/qniec",
    background: "var(--color-deep-plum)",
    text: "var(--color-periwinkle)",
  },
  {
    id: "adel",
    name: "Laura Adel",
    role: INTERACTIVE_INSTALLATION,
    photo: "festiwal_foto/artysci/laura.jpg",
    mask: "announcement-2",
    description: LAURA_BIO,
    instagram: "https://www.instagram.com/lauhra_adel",
    background: "var(--color-light-grey)",
    text: "var(--color-true-black)",
  },
  {
    id: "irmina",
    name: "Irmina Kowalska",
    role: PERFORMER,
    photo: "festiwal_foto/artysci/irmina.jpg",
    mask: "announcement-6",
    description: IRMINA_BIO,
    instagram: "https://www.instagram.com/nippleinthebathtub",
    background: "var(--color-sage-grey)",
    text: "var(--color-true-black)",
  },
  {
    id: "euro",
    name: "EURO-SIEĆ",
    role: MULTI_CENTER,
    photo: "festiwal_foto/artysci/euro.jpg",
    mask: "announcement-5",
    description: EURO_BIO,
    instagram: "https://www.instagram.com/euro_siec",
    background: "var(--color-light-grey)",
    text: "var(--color-ground)",
  },
];
