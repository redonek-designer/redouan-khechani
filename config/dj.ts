export type Track = {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  artwork: string;
  duration: number; // seconds (used as fallback display)
  tag?: string;
};

export type Event = {
  id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  image: string;
  status: "upcoming" | "sold-out" | "past";
};

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: string;
  span: string; // tailwind col/row span classes for asymmetric grid
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const djConfig = {
  name: "REDNEXT",
  location: "Agadir / Taghazout, Morocco",
  locationShort: "AGADIR · TAGHAZOUT",
  tagline: "Sound of the Atlantic.",
  role: "DJ · PRODUCER · AGADIR / TAGHAZOUT",
  bio:
    "Born on Morocco's Atlantic coast, REDNEXT brings together electronic energy, deep atmosphere and the raw spirit of Agadir and Taghazout. Sunsets, ocean winds and late-night crowds shape a sound that travels from the surf town to the dancefloor.",
  email: "bookings@rednext.maroc",
  description:
    "REDNEXT is a DJ and producer based in Agadir and Taghazout, Morocco. Discover the music, events and booking information.",
  whatsappMessage:
    "Hello, I would like to book REDNEXT for an event.",
  introAudio: "/audio/dj-intro.wav",
  map: {
    center: {
      lat: 30.4278,
      lng: -9.5981,
    },
    agadir: { name: "AGADIR", lat: 30.4278, lng: -9.5981 },
    taghazout: { name: "TAGHAZOUT", lat: 30.5428, lng: -9.7089 },
    embed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-9.85%2C30.30%2C-9.35%2C30.70&layer=mapnik&marker=30.4830%2C-9.6500",
    link: "https://www.openstreetmap.org/?mlat=30.48&mlon=-9.65#map=11/30.48/-9.65",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Taghazout,+Morocco",
  },
  stats: [
    { value: 100, suffix: "+", label: "EVENTS" },
    { value: 50, suffix: "K+", label: "LISTENERS" },
    { value: 10, suffix: "+", label: "YEARS" },
  ] as Stat[],
  tracks: [
    {
      id: "atlantic-nights",
      title: "ATLANTIC NIGHTS",
      subtitle: "DJ SET · TAGHAZOUT",
      src: "/audio/atlantic-nights.wav",
      artwork: "/images/music-01.jpg",
      duration: 348,
      tag: "FEATURED",
    },
    {
      id: "sunset-session",
      title: "SUNSET SESSION",
      subtitle: "DJ MIX · AGADIR",
      src: "/audio/sunset-session.wav",
      artwork: "/images/music-02.jpg",
      duration: 412,
    },
    {
      id: "red-waves",
      title: "RED WAVES",
      subtitle: "ORIGINAL TRACK",
      src: "/audio/red-waves.wav",
      artwork: "/images/music-03.jpg",
      duration: 295,
    },
    {
      id: "taghazout-after-dark",
      title: "TAGHAZOUT AFTER DARK",
      subtitle: "LIVE SET · CLUB",
      src: "/audio/taghazout-after-dark.wav",
      artwork: "/images/music-04.jpg",
      duration: 386,
    },
  ] as Track[],
  events: [
    {
      id: "sunset-session",
      date: "12 SEP",
      month: "SEP",
      year: "2026",
      title: "SUNSET SESSION",
      location: "TAGHAZOUT · MOROCCO",
      image: "/images/event-01.jpg",
      status: "upcoming",
    },
    {
      id: "atlantic-night",
      date: "22 SEP",
      month: "SEP",
      year: "2026",
      title: "ATLANTIC NIGHT",
      location: "AGADIR · MOROCCO",
      image: "/images/event-02.jpg",
      status: "upcoming",
    },
    {
      id: "red-phone-festival",
      date: "03 OCT",
      month: "OCT",
      year: "2026",
      title: "RED PHONE FESTIVAL",
      location: "TAGHAZOUT BAY · MOROCCO",
      image: "/images/event-03.jpg",
      status: "upcoming",
    },
  ] as Event[],
  gallery: [
    { id: "g1", src: "/images/gallery-01.jpg", title: "NIGHT ONE", category: "CLUB · AGADIR", span: "md:col-span-2 md:row-span-2" },
    { id: "g2", src: "/images/gallery-02.jpg", title: "AFTER DARK", category: "FESTIVAL", span: "" },
    { id: "g3", src: "/images/gallery-03.jpg", title: "THE OCEAN", category: "TAGHAZOUT", span: "md:col-span-1" },
    { id: "g4", src: "/images/gallery-04.jpg", title: "FIRST LIGHT", category: "SUNRISE SET", span: "" },
    { id: "g5", src: "/images/gallery-05.jpg", title: "CROWD WAVE", category: "CONCERT", span: "md:col-span-2" },
    { id: "g6", src: "/images/gallery-06.jpg", title: "GOLDEN HOUR", category: "BEACH CLUB", span: "" },
    { id: "g7", src: "/images/gallery-07.jpg", title: "WHITE NOISE", category: "CLUB · TAGHAZOUT", span: "" },
    { id: "g8", src: "/images/gallery-08.jpg", title: "THE BOOTH", category: "BACKSTAGE", span: "md:col-span-2 md:row-span-1" },
  ] as GalleryItem[],
  social: {
    instagram: "https://instagram.com/rednext",
    soundcloud: "https://soundcloud.com/rednext",
    youtube: "https://youtube.com/@rednext",
    whatsapp: "",
  },
};

export const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "MUSIC", href: "#music" },
  { label: "EVENTS", href: "#events" },
  { label: "ABOUT", href: "#about" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CONTACT", href: "#contact" },
];
