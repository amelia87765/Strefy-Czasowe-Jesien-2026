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
  /** Tylko dla duetów: drugi link, pokazywany obok pierwszego z tym samym podpisem. */
  instagram2?: string;
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
export const ARTISTS: Artist[] = [
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
    id: "irena",
    name: "Daria Irena x Aleksandra Banaś",
    role: FILM,
    photo: "festiwal_foto/artysci/irena.jpg",
    mask: "announcement-2",
    description: IRENA_BIO,
    instagram: "https://www.instagram.com/aleksandra__banas",
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
    background: "var(--color-deep-plum)",
    text: "var(--color-light-grey)",
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
