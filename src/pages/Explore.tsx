import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Languages, Grid, List, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ContentCard from "@/components/ContentCard";
import { regions } from "@/data/regions";
import { languages } from "@/data/languages";
import { contentTypes } from "@/data/contentTypes";
import { getContenus, Contenu } from "@/services/contenus";

const Explore = () => {
  const [contenus, setContenus] = useState<Contenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchContenus = async () => {
      try {
        setLoading(true);
        const response = await getContenus();
        setContenus(response.data.data);
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
    const cleanText = texte.replace(/\r?\n/g, " ").trim();
    return cleanText.length > 120 ? cleanText.substring(0, 120) + "..." : cleanText;
  };

  const getDefaultImage = (typeContenu: string) => {
    const images: Record<string, string> = {
      "Histoire": "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=400",
      "Recette": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400",
      "Article": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400",
      "Musique": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      "Vidéo": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400",
      "Photo": "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400",
    };
    return images[typeContenu] || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400";
  };

  const getRegionId = (nomRegion: string) => {
    const regionMap: Record<string, string> = {
      "Zou": "zou",
      "Atlantique": "atlantique",
      "Littoral": "littoral",
      "Ouémé": "oueme",
      "Plateau": "plateau",
      "Borgou": "borgou",
      "Alibori": "alibori",
      "Atacora": "atacora",
      "Donga": "donga",
      "Collines": "collines",
      "Mono": "mono",
      "Couffo": "couffo",
    };
    return regionMap[nomRegion] || nomRegion.toLowerCase();
  };

  const getLanguageId = (nomLangue: string) => {
    const langMap: Record<string, string> = {
      "Français": "french",
      "Fon": "fon",
      "Yoruba": "yoruba",
      "Bariba": "bariba",
      "Dendi": "dendi",
      "Goun": "goun",
      "Adja": "adja",
      "Mina": "mina",
      "Ditammari": "ditammari",
      "Peul": "fulfuldé",
      "Yom": "yom",
      "Idaatcha": "idaatcha",
    };
    return langMap[nomLangue] || nomLangue.toLowerCase();
  };

  const getTypeId = (nomType: string) => {
    const typeMap: Record<string, string> = {
      "Histoire": "story",
      "Recette": "recipe",
      "Article": "article",
      "Musique": "music",
      "Vidéo": "video",
      "Photo": "gallery",
      "Audio": "audio",
    };
    return typeMap[nomType] || nomType.toLowerCase();
  };

  // Transformer les contenus du backend en format ContentCard
  const transformedContents = contenus.map(contenu => ({
    id: contenu.id.toString(),
    title: contenu.titre,
    description: getContentDescription(contenu.texte),
    type: getTypeId(contenu.typecontenu.nom),
    region: getRegionId(contenu.region.nom_regions),
    language: getLanguageId(contenu.langue.nom_langues),
    author: contenu.user?.name || "Anonyme",
    likes: Math.floor(Math.random() * 500), // Simulé pour le moment
    views: Math.floor(Math.random() * 5000), // Simulé pour le moment
    image: getDefaultImage(contenu.typecontenu.nom),
    isPremium: contenu.type_acces.toLowerCase() !== "free",
    createdAt: contenu.date_creation
  }));

  const filteredContents = transformedContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || content.type === selectedType;
    const matchesRegion = selectedRegion === "all" || content.region === selectedRegion;
    const matchesLanguage = selectedLanguage === "all" || content.language === selectedLanguage;

    return matchesSearch && matchesType && matchesRegion && matchesLanguage;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedRegion("all");
    setSelectedLanguage("all");
  };

  const hasActiveFilters = searchQuery || selectedType !== "all" || selectedRegion !== "all" || selectedLanguage !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explorer la Culture Béninoise
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Découvrez les histoires, recettes, musiques et traditions de toutes les régions du Bénin
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un contenu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {contentTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[160px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Région" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les régions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[160px]">
                    <Languages className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les langues</SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                {searchQuery && (
                  <Badge variant="secondary">Recherche: {searchQuery}</Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary">
                    {contentTypes.find(t => t.id === selectedType)?.name}
                  </Badge>
                )}
                {selectedRegion !== "all" && (
                  <Badge variant="secondary">
                    {regions.find(r => r.id === selectedRegion)?.name}
                  </Badge>
                )}
                {selectedLanguage !== "all" && (
                  <Badge variant="secondary">
                    {languages.find(l => l.id === selectedLanguage)?.name}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer tout
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
                <span className="ml-3 text-muted-foreground">Chargement des contenus...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            )}

            {/* Results */}
            {!loading && !error && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredContents.length} résultat{filteredContents.length > 1 ? "s" : ""} trouvé{filteredContents.length > 1 ? "s" : ""}
                  </p>
                </div>

                {filteredContents.length > 0 ? (
                  <div className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }>
                    {filteredContents.map(content => (
                      <ContentCard
                        key={content.id}
                        content={content}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      Aucun contenu ne correspond à vos critères
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Réinitialiser les filtres
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

export default Explore;
