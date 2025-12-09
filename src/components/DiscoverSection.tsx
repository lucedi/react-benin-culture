import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTypesContenu, TypeContenu } from "@/services/types_contenus";

const DiscoverSection = () => {
  const [typesContenu, setTypesContenu] = useState<TypeContenu[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try {
      const res = await getTypesContenu();
      console.log(res.data);
      setTypesContenu(res.data.data); // Change ici : res.data.data au lieu de res.data
    } catch (err) {
      console.error(err);
      setTypesContenu([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  if (loading) {
    return <div>Chargement...</div>;
  }
  const handleCardClick = (typeContenuId: number) => {
    navigate(`/type-contenu/${typeContenuId}`);
  };

  return (
    <section id="decouvrir" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-accent font-medium mb-4">
            EXPLOREZ
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Découvrez la culture béninoise
          </h2>
          <p className="text-muted-foreground text-lg">
            Une richesse culturelle unique qui se transmet de génération en
            génération. Explorez nos différentes catégories et laissez-vous
            émerveiller.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typesContenu &&
            typesContenu.length > 0 &&
            typesContenu.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group relative bg-card hover:bg-card/80 rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border border-border hover:border-accent/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/src/assets/img/${item?.nom?.toLowerCase()}.jpeg`}
                    alt={item.nom}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/src/assets/img/Toffee.jpeg";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {item.nom}
                  </h3>

                  {/* Description optionnelle si disponible */}
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    Dégustez des histoires, des recettes, des danses et des
                    chants béninois qui célèbrent notre patrimoine.
                  </p>
                </div>

                {/* ARROW */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent"
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
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
