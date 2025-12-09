import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  MapPin,
  Globe,
  Calendar,
  Tag,
  AlertCircle,
  Lock,
  Crown,
} from "lucide-react";
import { getTypesContenu, TypeContenu } from "@/services/types_contenus";
import { ContenuParTypes, getContenusByType } from "@/services/contenupartype";
import { useParams } from "react-router-dom";

const TypeContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [types, setTypes] = useState<TypeContenu[]>([]);
  const [contenus, setContenus] = useState<ContenuParTypes[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les types de contenu au chargement
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await getTypesContenu();
        setTypes(response.data);
        if (id && response.data.length > 0) {
          console.log("retour", response.data);
          setSelectedType(Number(id));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types de contenu",
          error
        );
        setError("Impossible de charger les types de contenu");
      }
    };

    fetchTypes();
  }, [id]);

  // Récupérer les contenus quand le type change
  useEffect(() => {
    if (selectedType) {
      const fetchContenus = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getContenusByType(selectedType);
          setContenus(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des contenus", error);
          setError("Impossible de charger les contenus");
        } finally {
          setLoading(false);
        }
      };

      fetchContenus();
    }
  }, [selectedType]);

  const handleTypeChange = (id: number) => {
    setSelectedType(id);
  };

  const getStatusColor = (statut: string) => {
    if (statut === "En attente de validation") {
      return "bg-green-100 text-green-800 border-green-200";
    }
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const getAccessBadge = (type_acces: string) => {
    if (type_acces === "free") {
      return null; // Ne rien afficher pour le contenu gratuit
    }

    const accessTypes: Record<string, { label: string; color: string; icon: any }> = {
      premium: {
        label: "Premium",
        color: "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-500",
        icon: Crown
      },
      private: {
        label: "Privé",
        color: "bg-gray-700 text-white border-gray-600",
        icon: Lock
      },
      subscription: {
        label: "Abonnement",
        color: "bg-blue-500 text-white border-blue-600",
        icon: Crown
      }
    };

    const config = accessTypes[type_acces.toLowerCase()] || {
      label: type_acces,
      color: "bg-purple-500 text-white border-purple-600",
      icon: Lock
    };

    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.startsWith("-0"))
      return "Date non disponible";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR");
    } catch {
      return "Date non disponible";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Patrimoine Culturel du Bénin
          </h1>
          <p className="mt-2 text-gray-600">
            Découvrez l'histoire et les traditions des régions du Bénin
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Type Selector */}
        {/* <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type de contenu
          </label>
          <div className="relative">
            <select
              value={selectedType || ""}
              onChange={(e) => handleTypeChange(Number(e.target.value))}
              className="block w-full max-w-xs px-4 py-3 pr-10 text-base border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent rounded-lg bg-white shadow-sm appearance-none cursor-pointer transition-all hover:border-orange-300"
              disabled={types.length === 0}
            >
              {types.length === 0 && <option value="">Chargement...</option>}
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nom}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div> */}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle
              className="text-red-500 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Chargement des contenus...</p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && contenus.length > 0 && (
          <div className="space-y-8">
            {contenus.map((contenu) => (
              <article
                key={contenu.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Article Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex-1">
                      {contenu.titre}
                    </h2>
                    <div className="flex items-center gap-2">
                      {contenu.type_acces && getAccessBadge(contenu.type_acces)}
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                          contenu.statut
                        )}`}
                      >
                        {contenu.statut}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Bar */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {contenu.typecontenu && (
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-orange-500" />
                        <span className="font-medium">
                          {contenu.typecontenu.nom}
                        </span>
                      </div>
                    )}
                    {contenu.region && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        <span>
                          {contenu.region.nom_regions} ·{" "}
                          {contenu.region.localisation}
                        </span>
                      </div>
                    )}
                    {contenu.langue && (
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-orange-500" />
                        <span>{contenu.langue.nom_langues}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-orange-500" />
                      <span>{formatDate(contenu.date_creation)}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {contenu.texte
                      .split(/\r?\n\r?\n/)
                      .filter((p) => p.trim())
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                    Lire la suite →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && contenus.length === 0 && selectedType && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Tag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun contenu disponible
            </h3>
            <p className="text-gray-600">
              Aucun article n'est disponible pour ce type de contenu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeContentDetails;
