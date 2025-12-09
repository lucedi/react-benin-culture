import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin, Users, Square } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getContenus, Contenu } from "@/services/contenus";
import { getRegions, RegionBackend } from "@/services/regions";

const RegionContenus = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  const [contenus, setContenus] = useState<Contenu[]>([]);
  const [region, setRegion] = useState<RegionBackend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupérer tous les contenus
        const contenusResponse = await getContenus();
        const allContenus = contenusResponse.data.data;

        // Filtrer par région
        const filteredContenus = allContenus.filter(
          (c) => c.region_id === Number(regionId)
        );
        setContenus(filteredContenus);

        // Récupérer les infos de la région
        const regionsResponse = await getRegions();
        const foundRegion = regionsResponse.data.data.find(
          (r) => r.id === Number(regionId)
        );
        setRegion(foundRegion || null);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les contenus de cette région");
      } finally {
        setLoading(false);
      }
    };

    if (regionId) {
      fetchData();
    }
  }, [regionId]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num);
  };

  const getContentDescription = (texte: string) => {
    const cleanText = texte.replace(/\r?\n/g, " ").trim();
    return cleanText.length > 150
      ? cleanText.substring(0, 150) + "..."
      : cleanText;
  };

  const getDefaultImage = (typeContenu: string) => {
    const images: Record<string, string> = {
      Histoire:
        "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=600&q=80",
      Recette:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
      Article:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
      Musique:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
      Vidéo:
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
      Photo:
        "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80",
    };
    return (
      images[typeContenu] ||
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section avec infos de la région */}
        {region && (
          <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-16 md:py-20">
            <div className="container mx-auto px-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/regions")}
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux régions
              </Button>

              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  {region.nom_regions}
                </h1>

                {region.description && (
                  <p className="text-xl text-white/90 mb-6">
                    {region.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{region.localisation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">
                      {formatNumber(region.population)} habitants
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5" />
                    <span className="font-medium">
                      {formatNumber(region.superficie)} km²
                    </span>
                  </div>
                </div>
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
        )}

        {/* Contenus Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-accent" />
                <span className="ml-4 text-xl text-muted-foreground">
                  Chargement des contenus...
                </span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-500 text-xl">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/regions")}
                  className="mt-4"
                >
                  Retour aux régions
                </Button>
              </div>
            )}

            {/* Contenus Grid */}
            {!loading && !error && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Contenus culturels de {region?.nom_regions}
                  </h2>
                  <p className="text-muted-foreground">
                    {contenus.length} contenu{contenus.length > 1 ? "s" : ""}{" "}
                    disponible{contenus.length > 1 ? "s" : ""}
                  </p>
                </div>

                {contenus.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contenus.map((contenu) => (
                      <article
                        key={contenu.id}
                        onClick={() => navigate(`/content/${contenu.id}`)}
                        className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border border-border hover:border-accent/30"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getDefaultImage(contenu.typecontenu.nom)}
                            alt={contenu.titre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/60 to-transparent" />

                          {/* Type Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                              {contenu.typecontenu.nom}
                            </span>
                          </div>

                          {/* Premium Badge */}
                          {contenu.type_acces.toLowerCase() !== "free" && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-gold text-earth-dark px-3 py-1 rounded-full text-xs font-semibold">
                                Premium
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {contenu.titre}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {getContentDescription(contenu.texte)}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{contenu.langue.nom_langues}</span>
                            <span className="text-xs">{contenu.statut}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg mb-4">
                      Aucun contenu disponible pour cette région
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/regions")}
                    >
                      Explorer d'autres régions
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RegionContenus;
