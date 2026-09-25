import type { Section } from '@/data/pages'

const GOING = 'https://goingapp.pl/wydarzenie/strefy-czasowe-2026-1-jesien/gdynia-pazdziernik-2026'
const SMOOTH_SAIL_IG = 'https://www.instagram.com/smoothsail_pl/'

export const FAQ_SECTIONS: Section[] = [
  [
    {
      type: 'text',
      paragraphs: {
        pl: [
          '24 października | SVERA, Gdynia | plac Konstytucji 2',
          'SVERA znajduje się przy samym dworcu Gdynia Główna. Pociąg, SKM, autobus, trolejbus - dojedziesz czymkolwiek.',
          'Muzyka, instalacje, performance i doświadczenia angażujące zmysły. Jeden wieczór, wiele sposobów odkrywania.',
          `Bilety: [Going](${GOING}).`,
        ],
        en: [
          '24 October | SVERA, Gdynia | plac Konstytucji 2',
          'SVERA is right next to Gdynia Główna, the main railway station. Train, SKM, bus or trolleybus - you can get here any way you like, it is as well connected as it gets.',
          'Music, installations, performance and experiences that engage the senses. One evening, many ways to discover.',
          `Tickets: [Going](${GOING}).`,
        ],
      },
    },
  ],
  [
    {
      type: 'faq',
      items: [
        {
          question: {
            pl: 'Czym właściwie są STREFY CZASOWE?',
            en: 'What exactly are STREFY CZASOWE?',
          },
          answer: {
            pl: [
              'To festiwal, na którym muzyka spotyka sztuki wizualne, instalacje i performance. Liczy się nie tylko to, co dzieje się na scenie, ale też przestrzeń wokół Ciebie: obrazy, światło, zapachy i detale, które składają się na wspólne doświadczenie. Możesz przyjść dla koncertów i odkryć po drodze coś, czego zupełnie się nie spodziewasz.',
            ],
            en: [
              'It is a festival where music meets visual arts, installations and performance. What matters is not only what happens on stage, but also the space around you: images, light, scents and details that add up to a shared experience. You can come for the concerts and discover something you never expected along the way.',
            ],
          },
        },
        {
          question: {
            pl: 'To koncert, impreza czy wystawa?',
            en: 'Is it a concert, a party or an exhibition?',
          },
          answer: {
            pl: [
              'Trochę każde z nich, ale nie osobno. Strefy łączą różne formy sztuki w jeden wieczór. Koncerty, instalacje i działania performatywne są częścią większej opowieści, a nie tylko dodatkiem do programu muzycznego.',
            ],
            en: [
              'A bit of each, but not separately. Strefy brings different art forms together into one evening. Concerts, installations and performative actions are part of a bigger story, not just an add-on to the music programme.',
            ],
          },
        },
        {
          question: {
            pl: 'Kiedy i gdzie się spotykamy?',
            en: 'When and where do we meet?',
          },
          answer: {
            pl: [
              'W sobotę 24 października 2026 w klubie SVERA, przy placu Konstytucji 2 w Gdyni. To noc zmiany czasu z letniego na zimowy.',
            ],
            en: [
              'On Saturday 24 October 2026 at SVERA club, plac Konstytucji 2 in Gdynia. It is the night the clocks change from summer to winter time.',
            ],
          },
        },
        {
          question: {
            pl: 'O której warto przyjść?',
            en: 'What time should I arrive?',
          },
          answer: {
            pl: [
              'Aktualnie planujemy otwarcie drzwi o 18:45 i rozpoczęcie wydarzenia o 19:00. Warto być od początku, żeby wejść w cały wieczór, nie tylko wybrany występ. Godziny są orientacyjne, przed przyjazdem sprawdź aktualne informacje przy wydarzeniu.',
            ],
            en: [
              'We currently plan to open the doors at 18:45 and start at 19:00. It is worth being there from the beginning to take in the whole evening, not just one performance. Times are approximate, so check the latest information on the event page before you come.',
            ],
          },
        },
        {
          question: {
            pl: 'Co oznacza (-1) w nazwie?',
            en: 'What does (-1) in the name mean?',
          },
          answer: {
            pl: [
              'Strefy odbywają się dwa razy w roku, przy zmianie czasu. Wiosenna odsłona to (+1), jesienna to (-1). Jesienią cofamy zegarki i spotykamy się w tę szczególną noc, kiedy mamy godzinę więcej.',
            ],
            en: [
              'Strefy takes place twice a year, when the clocks change. The spring edition is (+1), the autumn one is (-1). In autumn we turn the clocks back and meet on that special night when we get an extra hour.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy muszę znać artystów albo „znać się” na sztuce?',
            en: 'Do I need to know the artists or “know about” art?',
          },
          answer: {
            pl: [
              'Nie musisz przychodzić z przygotowaniem ani listą nazwisk do odhaczenia. Strefy są również po to, żeby odkrywać. Wystarczy ciekawość i otwartość na muzykę i formy, z którymi być może spotkasz się pierwszy raz.',
            ],
            en: [
              'You do not need any preparation or a list of names to tick off. Strefy is also about discovery. All you need is curiosity and openness to music and forms you may be encountering for the first time.',
            ],
          },
        },
        {
          question: {
            pl: 'Jakiej muzyki mogę się spodziewać?',
            en: 'What kind of music can I expect?',
          },
          answer: {
            pl: [
              'Punktem wyjścia jest muzyka alternatywna i elektroniczna, ale nie zamykamy się w jednym gatunku. Ważne są dla nas spotkania różnych wrażliwości i projekty przygotowywane specjalnie na Strefy. Konkretny charakter występów poznasz w opisach artystów danej edycji.',
            ],
            en: [
              'Our starting point is alternative and electronic music, but we do not limit ourselves to one genre. We care about meetings of different sensibilities and projects created especially for Strefy. You will find the character of each performance in the artist descriptions for the edition.',
            ],
          },
        },
        {
          question: {
            pl: 'Co oznacza „festiwal wielozmysłowy”?',
            en: 'What does “multisensory festival” mean?',
          },
          answer: {
            pl: [
              'Muzyka nie działa tu w oderwaniu od otoczenia. Obrazy, światło, zapachy, przestrzeń i inne elementy programu wpływają na to, jak odbierasz całość. Nie chodzi o testowanie, ile bodźców da się zmieścić w jednym miejscu, tylko o tworzenie doświadczeń, które uzupełniają się i zostają z Tobą na dłużej.',
            ],
            en: [
              'Here, music does not exist in isolation from its surroundings. Images, light, scents, space and other parts of the programme shape how you experience the whole. It is not about testing how many stimuli fit in one place, but about creating experiences that complement each other and stay with you for longer.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy jesienna edycja będzie powtórką wiosennej?',
            en: 'Will the autumn edition repeat the spring one?',
          },
          answer: {
            pl: [
              'Nie traktujemy kolejnych edycji jak powtórzenia tego samego programu. Wspólny pozostaje pomysł na Strefy, a każda odsłona jest okazją do nowych spotkań, projektów i doświadczeń.',
            ],
            en: [
              'We do not treat each edition as a repeat of the same programme. The idea behind Strefy stays the same, and every edition is a chance for new encounters, projects and experiences.',
            ],
          },
        },
        {
          question: {
            pl: 'Gdzie kupię bilet?',
            en: 'Where can I buy a ticket?',
          },
          answer: {
            pl: [
              'Bilety są dostępne w Going. Aktualne ceny i dostępność sprawdzisz bezpośrednio na stronie wydarzenia:',
              `[Strefy Czasowe 2026 (-1) // jesień - bilety](${GOING})`,
            ],
            en: [
              'Tickets are available on Going. You can check current prices and availability directly on the event page:',
              `[Strefy Czasowe 2026 (-1) // autumn - tickets](${GOING})`,
            ],
          },
        },
        {
          question: {
            pl: 'Gdzie sprawdzać aktualne informacje?',
            en: 'Where can I find the latest information?',
          },
          answer: {
            pl: [
              `Podstawowe informacje i bilety znajdziesz na stronie wydarzenia w Going. Ogłoszenia Smooth Sail możesz śledzić również na [Instagramie @smoothsail_pl](${SMOOTH_SAIL_IG}).`,
            ],
            en: [
              `You will find the key information and tickets on the event page on Going. You can also follow Smooth Sail announcements on [Instagram @smoothsail_pl](${SMOOTH_SAIL_IG}).`,
            ],
          },
        },
        {
          question: {
            pl: 'Co obejmuje bilet, a za co płacę osobno?',
            en: 'What does the ticket include and what do I pay for separately?',
          },
          answer: {
            pl: [
              'Bilet obejmuje wszystkie aktywności w trakcie wydarzenia: koncerty, performansy, wystawy i dostęp do przestrzeni specjalnych. Osobno płatne są merch festiwalowy, napoje na barze, jedzenie w food truckach oraz szatnia.',
            ],
            en: [
              'The ticket covers all activities during the event: concerts, performances, exhibitions and access to special spaces. Festival merch, drinks at the bar, food from the food trucks and the cloakroom are paid separately.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy mogę wyjść i wrócić na wydarzenie?',
            en: 'Can I leave and come back?',
          },
          answer: {
            pl: [
              'Tak. Przy pierwszym wejściu, po zeskanowaniu biletu, otrzymasz opaskę na rękę. To ona upoważnia Cię do ponownego wejścia, więc zachowaj ją na ręce przez cały czas wydarzenia.',
            ],
            en: [
              'Yes. When you first enter and your ticket is scanned, you will get a wristband. It lets you back in, so keep it on for the whole event.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy na miejscu jest szatnia?',
            en: 'Is there a cloakroom?',
          },
          answer: {
            pl: ['Tak. Szatnia kosztuje 8 zł, płatność kartą.'],
            en: ['Yes. The cloakroom costs 8 PLN, card payment only.'],
          },
        },
        {
          question: {
            pl: 'Czy będzie miejsce na odpoczynek od programu?',
            en: 'Will there be a place to take a break from the programme?',
          },
          answer: {
            pl: [
              'Tak. W tej edycji przewidzieliśmy więcej stref odpoczynku, żeby pomiędzy koncertami, performansami i odkrywaniem kolejnych przestrzeni można było zrobić sobie przerwę i złapać oddech.',
            ],
            en: [
              'Yes. This edition has more chill-out zones, so you can take a break and catch your breath between concerts, performances and exploring new spaces.',
            ],
          },
        },
        {
          question: {
            pl: 'Co z intensywnymi bodźcami i światłem stroboskopowym?',
            en: 'What about intense stimuli and strobe lights?',
          },
          answer: {
            pl: [
              'Performansy i wystawy zawierające intensywne bodźce lub światło stroboskopowe będą odpowiednio oznaczone. Zwróć uwagę na oznaczenia przed wejściem i wybierz to, co jest dla Ciebie komfortowe.',
            ],
            en: [
              'Performances and exhibitions with intense stimuli or strobe lights will be clearly marked. Look out for the signs before entering and choose what feels comfortable for you.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy na miejscu kupię jedzenie? Czy mogę przynieść własne?',
            en: 'Can I buy food there? Can I bring my own?',
          },
          answer: {
            pl: [
              'Jedzenie kupisz u naszych partnerów w food truckach. Co do zasady nie można wnosić własnego jedzenia. Wyjątek dotyczy osób, które potrzebują go ze względów zdrowotnych, również w związku z przyjmowaniem leków.',
            ],
            en: [
              'You can buy food from our partners’ food trucks. As a rule, you cannot bring your own food. The exception is people who need it for health reasons, including when taking medication.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy obowiązuje ograniczenie wieku?',
            en: 'Is there an age limit?',
          },
          answer: {
            pl: [
              'Nie wprowadzamy ograniczenia wieku. Osoby poniżej 18. roku życia mogą uczestniczyć w wydarzeniu pod opieką osoby dorosłej. Jeśli przychodzisz bez dorosłego opiekuna, zabierz ze sobą pisemną zgodę rodzica lub opiekuna prawnego na udział w wydarzeniu.',
            ],
            en: [
              'There is no age limit. People under 18 can attend with an adult. If you are coming without an adult guardian, bring written consent from a parent or legal guardian to attend the event.',
            ],
          },
        },
        {
          question: {
            pl: 'Czy mogę wnieść wodę?',
            en: 'Can I bring water?',
          },
          answer: {
            pl: ['Tak, można wnosić wodę w zamkniętej butelce.'],
            en: ['Yes, you can bring water in a sealed bottle.'],
          },
        },
        {
          question: {
            pl: 'Czy mogę zabrać aparat, robić zdjęcia i je publikować?',
            en: 'Can I bring a camera, take photos and post them?',
          },
          answer: {
            pl: [
              'Tak, możesz wnieść aparat fotograficzny, robić zdjęcia i dzielić się nimi. Zachęcamy do oznaczania Stref Czasowych i @smoothsail_pl, chętnie zobaczymy festiwal z Twojej perspektywy.',
              'Pamiętaj przy tym o prywatności innych osób, szczególnie podczas nocnej, imprezowej części wydarzenia. Zanim zrobisz komuś zdjęcie z bliska lub opublikujesz fotografię, na której jest głównym bohaterem, zapytaj, czy czuje się z tym komfortowo. Uszanuj odmowę.',
            ],
            en: [
              'Yes, you can bring a camera, take photos and share them. We encourage you to tag Strefy Czasowe and @smoothsail_pl — we would love to see the festival from your perspective.',
              'Please respect other people’s privacy, especially during the late-night party part of the event. Before taking a close-up of someone or posting a photo where they are the main subject, ask whether they are comfortable with it. Respect a no.',
            ],
          },
        },
        {
          question: {
            pl: 'Nigdy nie byłem na STREFACH. Od czego zacząć?',
            en: 'I have never been to STREFY. Where do I start?',
          },
          answer: {
            pl: [
              'Przyjdź z zapasem czasu i daj sobie chwilę na rozejrzenie się. Warto sprawdzić nie tylko znane nazwiska, ale również opisy projektów, które na pierwszy rzut oka trudno przypisać do jednej kategorii. Nie musisz wiedzieć z góry, co będzie Twoim ulubionym momentem wieczoru.',
            ],
            en: [
              'Arrive with time to spare and give yourself a moment to look around. Check out not only the well-known names, but also the descriptions of projects that are hard to put into one category at first glance. You do not need to know in advance what your favourite moment of the evening will be.',
            ],
          },
        },
      ],
    },
  ],
]
