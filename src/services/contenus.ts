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

export interface Contenu {
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
  user: any | null;
  langue: Langue;
  region: Region;
}

export interface ContenusResponse {
  success: boolean;
  data: Contenu[];
}

const API_URL = import.meta.env.VITE_API_URL + "api/v1/contenus";

export const getContenus = () => {
  return axios.get<ContenusResponse>(API_URL);
};
