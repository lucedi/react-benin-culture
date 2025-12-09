export interface Region {
  id: string;
  name: string;
  description: string;
  capital?: string;
  languages: string[];
  image?: string;
}

export const regions: Region[] = [
  {
    id: "atacora",
    name: "Atacora",
    description: "Région montagneuse du nord-ouest, berceau des Somba et de leurs célèbres Tata",
    capital: "Natitingou",
    languages: ["ditammari", "waama", "nateni"]
  },
  {
    id: "alibori",
    name: "Alibori",
    description: "Vaste région du nord, terre des Baribas et des Peuls",
    capital: "Kandi",
    languages: ["bariba", "fulfuldé", "dendi"]
  },
  {
    id: "borgou",
    name: "Borgou",
    description: "Région historique, ancien royaume de Nikki",
    capital: "Parakou",
    languages: ["bariba", "dendi", "fulfuldé"]
  },
  {
    id: "donga",
    name: "Donga",
    description: "Terre des Yom et carrefour culturel du centre-nord",
    capital: "Djougou",
    languages: ["yom", "lokpa", "dendi"]
  },
  {
    id: "collines",
    name: "Collines",
    description: "Région vallonnée au cœur du Bénin, mosaïque ethnique",
    capital: "Dassa-Zoumé",
    languages: ["idaatcha", "mahi", "fon"]
  },
  {
    id: "zou",
    name: "Zou",
    description: "Cœur historique du royaume du Dahomey, riche en traditions vodoun",
    capital: "Abomey",
    languages: ["fon", "mahi"]
  },
  {
    id: "plateau",
    name: "Plateau",
    description: "Terre des Nagots et carrefour des cultures yoruba",
    capital: "Sakété",
    languages: ["yoruba", "goun", "fon"]
  },
  {
    id: "oueme",
    name: "Ouémé",
    description: "Région lacustre, terre des cités sur pilotis",
    capital: "Porto-Novo",
    languages: ["goun", "yoruba", "tori"]
  },
  {
    id: "atlantique",
    name: "Atlantique",
    description: "Région côtière dynamique, porte d'entrée du Bénin",
    capital: "Ouidah",
    languages: ["fon", "aïzo", "toffin"]
  },
  {
    id: "littoral",
    name: "Littoral",
    description: "Région de Cotonou, capitale économique du Bénin",
    capital: "Cotonou",
    languages: ["fon", "mina", "goun"]
  },
  {
    id: "mono",
    name: "Mono",
    description: "Région frontalière du sud-ouest, terre des Adjas",
    capital: "Lokossa",
    languages: ["adja", "mina", "saxwè"]
  },
  {
    id: "couffo",
    name: "Couffo",
    description: "Région rurale aux traditions ancestrales préservées",
    capital: "Aplahoué",
    languages: ["adja", "fon"]
  }
];

export const getRegionById = (id: string) => regions.find(r => r.id === id);
