import { BookOpen, UtensilsCrossed, Music, Film, ImageIcon, FileText, Mic } from "lucide-react";

export interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: typeof BookOpen;
  acceptedFormats?: string[];
}

export const contentTypes: ContentType[] = [
  {
    id: "story",
    name: "Histoire / Conte",
    description: "Récits traditionnels, légendes et contes issus des traditions orales",
    icon: BookOpen,
    acceptedFormats: ["text"]
  },
  {
    id: "recipe",
    name: "Recette culinaire",
    description: "Plats traditionnels, ingrédients et techniques de préparation",
    icon: UtensilsCrossed,
    acceptedFormats: ["text", "image", "video"]
  },
  {
    id: "article",
    name: "Article culturel",
    description: "Écrits sur les danses, rites, musiques, tenues et fêtes",
    icon: FileText,
    acceptedFormats: ["text", "image"]
  },
  {
    id: "music",
    name: "Musique",
    description: "Chants traditionnels, rythmes et mélodies du Bénin",
    icon: Music,
    acceptedFormats: ["audio", "video"]
  },
  {
    id: "video",
    name: "Vidéo",
    description: "Documentaires, performances et captations culturelles",
    icon: Film,
    acceptedFormats: ["video"]
  },
  {
    id: "gallery",
    name: "Galerie photos",
    description: "Collections d'images sur la culture béninoise",
    icon: ImageIcon,
    acceptedFormats: ["image"]
  },
  {
    id: "audio",
    name: "Audio / Podcast",
    description: "Enregistrements sonores, interviews et podcasts culturels",
    icon: Mic,
    acceptedFormats: ["audio"]
  }
];

export const getContentTypeById = (id: string) => contentTypes.find(ct => ct.id === id);
