import axios from "axios";

export interface RegionBackend {
  id: number;
  created_at: string;
  updated_at: string;
  nom_regions: string;
  description: string | null;
  population: number;
  superficie: number;
  localisation: string;
}

export interface RegionsResponse {
  success: boolean;
  data: RegionBackend[];
}

const API_URL = import.meta.env.VITE_API_URL + "api/v1/regions";

export const getRegions = () => {
  return axios.get<RegionsResponse>(API_URL);
};
