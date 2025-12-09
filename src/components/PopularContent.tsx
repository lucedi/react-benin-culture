import { Heart, Eye, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getContenus, Contenu } from "@/services/contenus";
import { useNavigate } from "react-router-dom";

const PopularContent = () => {
  const [contenus, setContenus] = useState<Contenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContenus = async () => {
      try {
        setLoading(true);
        const response = await getContenus();
        // Limiter à 6 contenus pour l'affichage
        setContenus(response.data.data.slice(0, 6));
      } catch (err) {
        console.error("Erreur lors de la récupération des contenus:", err);
        setError("Impossible de charger les contenus");
      } finally {
        setLoading(false);
      }
    };

    fetchContenus();
  }, []);

  const getContentDescription = (texte: string) => {
    // Extraire les 150 premiers caractères pour la description
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

  const isPremium = (type_acces: string) => {
    return type_acces.toLowerCase() !== "free";
  };

  const handleContentClick = (id: number) => {
    navigate(`/content/${id}`);
  };
  return (
    <section id="contenus" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block text-accent font-medium mb-4">
              TENDANCES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Contenus populaires
            </h2>
          </div>
          <a
            href="/explorer"
            className="mt-4 md:mt-0 text-accent hover:text-accent/80 font-medium inline-flex items-center gap-2 group"
          >
            Voir tout
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <span className="ml-3 text-muted-foreground">
              Chargement des contenus...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contenus.map((content) => (
              <article
                key={content.id}
                onClick={() => handleContentClick(content.id)}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border border-border hover:border-accent/30"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getDefaultImage(content.typecontenu.nom)}
                    alt={content.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/60 to-transparent" />

                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {content.typecontenu.nom}
                  </Badge>

                  {/* Premium Badge */}
                  {isPremium(content.type_acces) && (
                    <Badge className="absolute top-4 right-4 bg-gold text-earth-dark">
                      Premium
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {content.titre}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {getContentDescription(content.texte)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {content.region.nom_regions}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs">
                      {content.langue.nom_langues}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && contenus.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Aucun contenu disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularContent;
