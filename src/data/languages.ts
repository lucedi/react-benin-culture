export interface Language {
  id: string;
  name: string;
  nativeName: string;
  speakers?: string;
  regions: string[];
}

export const languages: Language[] = [
  {
    id: "fon",
    name: "Fon",
    nativeName: "Fɔ̀ngbè",
    speakers: "~2 millions",
    regions: ["zou", "atlantique", "littoral", "oueme"]
  },
  {
    id: "yoruba",
    name: "Yoruba",
    nativeName: "Yorùbá",
    speakers: "~1.5 million",
    regions: ["plateau", "oueme", "collines"]
  },
  {
    id: "bariba",
    name: "Bariba",
    nativeName: "Baatonum",
    speakers: "~600 000",
    regions: ["borgou", "alibori"]
  },
  {
    id: "dendi",
    name: "Dendi",
    nativeName: "Dendi",
    speakers: "~400 000",
    regions: ["alibori", "borgou", "donga"]
  },
  {
    id: "goun",
    name: "Goun",
    nativeName: "Gungbe",
    speakers: "~500 000",
    regions: ["oueme", "plateau", "littoral"]
  },
  {
    id: "adja",
    name: "Adja",
    nativeName: "Ajagbe",
    speakers: "~500 000",
    regions: ["mono", "couffo"]
  },
  {
    id: "mina",
    name: "Mina",
    nativeName: "Mina",
    speakers: "~200 000",
    regions: ["mono", "littoral"]
  },
  {
    id: "ditammari",
    name: "Ditammari",
    nativeName: "Ditammari",
    speakers: "~150 000",
    regions: ["atacora"]
  },
  {
    id: "fulfuldé",
    name: "Peul / Fulfuldé",
    nativeName: "Fulfulde",
    speakers: "~300 000",
    regions: ["alibori", "borgou", "atacora"]
  },
  {
    id: "yom",
    name: "Yom",
    nativeName: "Yom",
    speakers: "~100 000",
    regions: ["donga"]
  },
  {
    id: "idaatcha",
    name: "Idaatcha",
    nativeName: "Idaatcha",
    speakers: "~100 000",
    regions: ["collines"]
  },
  {
    id: "french",
    name: "Français",
    nativeName: "Français",
    speakers: "Langue officielle",
    regions: ["toutes"]
  }
];

export const getLanguageById = (id: string) => languages.find(l => l.id === id);
