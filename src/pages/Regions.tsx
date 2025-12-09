import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Square,
  Compass,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getRegions, RegionBackend } from "@/services/regions";

// Images magnifiques pour chaque r�gion (modifiables � votre guise)
const regionImages: Record<string, string> = {
  Atacora:
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
  Alibori:
    "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=800&q=80",
  Borgou:
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
  Donga:
    "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
  Collines:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  Zou: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
  Plateau:
    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&q=80",
  "Ou�m�":
    "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
  Atlantique:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  Littoral:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  Mono: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  Couffo:
    "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=800&q=80",
  Mali: "https://images.unsplash.com/photo-1571490885430-69876ce33567?w=800&q=80",
};

const defaultImage =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80";

// Couleurs de gradient magnifiques selon la localisation
const getGradientByLocation = (localisation: string): string => {
  const lower = localisation.toLowerCase();
  if (lower.includes("nord")) {
    return "from-orange-500/90 via-red-600/80 to-amber-700/90";
  } else if (lower.includes("sud")) {
    return "from-blue-500/90 via-cyan-600/80 to-teal-700/90";
  } else {
    return "from-purple-500/90 via-pink-600/80 to-rose-700/90";
  }
};

const Regions = () => {
  const [regions, setRegions] = useState<RegionBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const response = await getRegions();
        setRegions(response.data.data);
      } catch (err) {
        console.error("Erreur lors de la r�cup�ration des r�gions:", err);
        setError("Impossible de charger les r�gions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num);
  };

  const handleRegionClick = (regionId: number) => {
    // Navigation vers une page qui affiche les contenus filtr�s par r�gion
    navigate(`/region/${regionId}/contenus`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section Magnifique */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6 animate-float">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">12 Régions à Découvrir</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Les Régions du Bénin
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                Explorez la richesse culturelle et la diversité de chaque région
                du Bénin, de l'Atacora au nord jusqu'au Littoral au sud.
              </p>
            </div>
          </div>

          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-auto">
              <path
                fill="#fff5f0"
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-accent" />
                <span className="ml-4 text-xl text-muted-foreground">
                  Chargement des régions...
                </span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-500 text-xl">{error}</p>
              </div>
            )}

            {/* Regions Cards */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {regions.map((region, index) => (
                  <article
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-8"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image de fond */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={regionImages[region.nom_regions] || defaultImage}
                        alt={region.nom_regions}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${getGradientByLocation(
                          region.localisation
                        )} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}
                      ></div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top: Localisation badge */}
                        <div className="flex justify-between items-start">
                          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
                            <Compass className="w-4 h-4" />
                            {region.localisation}
                          </div>

                          <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:bg-white/50 transition-colors duration-300">
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Bottom: Region info */}
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                              {region.nom_regions}
                            </h2>
                            {region.description && (
                              <p className="text-white/90 text-sm line-clamp-2">
                                {region.description}
                              </p>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 group-hover:bg-white/30 transition-colors duration-300">
                              <div className="flex items-center gap-2 text-white/80 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="text-xs font-medium">
                                  Population
                                </span>
                              </div>
                              <p className="text-white font-bold text-lg">
                                {formatNumber(region.population)}
                              </p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 group-hover:bg-white/30 transition-colors duration-300">
                              <div className="flex items-center gap-2 text-white/80 mb-1">
                                <Square className="w-4 h-4" />
                                <span className="text-xs font-medium">
                                  Superficie
                                </span>
                              </div>
                              <p className="text-white font-bold text-lg">
                                {formatNumber(region.superficie)} km�
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && regions.length === 0 && (
              <div className="text-center py-20">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-xl">
                  Aucune région disponible pour le moment
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Regions;
