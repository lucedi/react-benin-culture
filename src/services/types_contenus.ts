import axios from "axios";

export interface TypeContenu {
  id: number;
  created_at: Date;
  updated_at: Date;
  nom: string;
}

const API_URL = import.meta.env.VITE_API_URL + "api/v1/types-contenu";

export const getTypesContenu = () => {
  return axios.get<TypeContenu[]>(API_URL);
};
