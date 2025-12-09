import axios from "axios";

export interface TypeContenu {
  id: number;
  nom: string;
  created_at: string;
  updated_at: string;
}

export interface Langue {
  id: number;
  nom_langues: string;
  code_langues: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Region {
  id: number;
  nom_regions: string;
  description: string;
  population: number;
  superficie: number;
  localisation: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  url: string;
  type: string;
  // Ajoute d'autres propriétés selon ta structure media
}

export interface ContenuParTypes {
  id: number;
  titre: string;
  typecontenu_id: number;
  texte: string;
  date_creation: string;
  statut: string;
  auteur_id: number | null;
  parent_id: number | null;
  region_id: number;
  langue_id: number;
  type_acces: string;
  moderateur_id: number | null;
  date_validation: string | null;
  created_at: string | null;
  updated_at: string | null;
  typecontenu: TypeContenu;
  user: any | null; // Remplace 'any' par ton interface User si tu en as une
  langue: Langue;
  region: Region;
  media: Media[];
}

// const API_URL = import.meta.env.VITE_API_URL + "api/v1/typecontenus/{id}";

export const getContenusByType = (id: number) => {
  const API_URL_WITH_ID =
    import.meta.env.VITE_API_URL + `api/v1/typecontenus/${id}`;
  return axios.get<ContenuParTypes[]>(API_URL_WITH_ID);
};
