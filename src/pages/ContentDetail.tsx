import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Eye,
  Share2,
  Bookmark,
  MapPin,
  Languages,
  Calendar,
  User,
  Crown,
  Star,
  Send,
  ImageIcon,
  Play,
  FileAudio,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { regions } from "@/data/regions";
import { languages } from "@/data/languages";
import { contentTypes } from "@/data/contentTypes";

// Données de démonstration
const mockContent = {
  id: "1",
  title: "La légende du roi Béhanzin",
  description:
    "L'histoire du dernier roi indépendant du Dahomey, symbole de résistance face à la colonisation française.",
  fullContent: `Le roi Béhanzin, né Kondo en 1844, fut le onzième roi du Dahomey et le dernier à régner de manière indépendante avant la colonisation française.

Son règne (1889-1894) fut marqué par une résistance acharnée contre l'expansion coloniale française. Surnommé "Le Roi Requin" (Gbêhanzin signifie "le monde porte l'œuf que la terre désire"), il était reconnu pour son intelligence stratégique et son courage.

Béhanzin hérita d'un royaume puissant, doté d'une armée redoutable comprenant les célèbres Amazones du Dahomey, des femmes guerrières d'élite. Face à l'avancée française, il mena plusieurs batailles, notamment à Cotonou et à Abomey.

Malgré sa résistance héroïque, Béhanzin fut contraint de capituler en 1894. Il fut exilé en Martinique, puis en Algérie, où il mourut en 1906. Son corps fut rapatrié au Bénin en 1928.

Aujourd'hui, Béhanzin reste un symbole de la résistance africaine face au colonialisme et une figure emblématique de l'histoire du Bénin. Son palais à Abomey est inscrit au patrimoine mondial de l'UNESCO.`,
  type: "story",
  region: "zou",
  language: "fon",
  author: {
    id: "a1",
    name: "Koffi Mensah",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    bio: "Historien et conteur béninois",
  },
  likes: 245,
  views: 1820,
  image: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=800",
  isPremium: false,
  createdAt: "2024-01-15",
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=400",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400",
    },
  ],
  translations: [
    { language: "french", available: true },
    { language: "fon", available: true },
    { language: "yoruba", available: false },
  ],
};

const mockComments = [
  {
    id: "c1",
    author: { name: "Marie Dossou", avatar: "" },
    content:
      "Magnifique récit ! J'ai appris beaucoup sur notre histoire. Merci pour ce partage.",
    rating: 5,
    createdAt: "2024-01-16",
    likes: 12,
  },
  {
    id: "c2",
    author: { name: "Paul Agbo", avatar: "" },
    content:
      "Béhanzin restera à jamais un héros de notre peuple. Cette histoire mérite d'être connue de tous.",
    rating: 5,
    createdAt: "2024-01-17",
    likes: 8,
  },
  {
    id: "c3",
    author: { name: "Aïcha Bello", avatar: "" },
    content:
      "Très bien écrit et documenté. J'aurais aimé avoir plus de détails sur les Amazones.",
    rating: 4,
    createdAt: "2024-01-18",
    likes: 5,
  },
];

const ContentDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const content = mockContent;
  const region = regions.find((r) => r.id === content.region);
  const language = languages.find((l) => l.id === content.language);
  const contentType = contentTypes.find((ct) => ct.id === content.type);
  const TypeIcon = contentType?.icon;

  const averageRating =
    mockComments.reduce((acc, c) => acc + c.rating, 0) / mockComments.length;

  const handleSubmitComment = () => {
    if (newComment.trim() && userRating > 0) {
      // TODO: Implémenter l'envoi du commentaire
      console.log("Nouveau commentaire:", {
        content: newComment,
        rating: userRating,
      });
      setNewComment("");
      setUserRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Back Button */}
          <Link to="/explorer" className="absolute top-4 left-4 z-10">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>

          {/* Premium Badge */}
          {content.isPremium && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">
                <Crown className="h-4 w-4 mr-1" />
                Contenu Premium
              </Badge>
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardContent className="p-6 md:p-8">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="gap-1">
                      {TypeIcon && <TypeIcon className="h-3 w-3" />}
                      {contentType?.name}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {content.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {region?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      {language?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(content.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {averageRating.toFixed(1)} ({mockComments.length} avis)
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={content.author.avatar} />
                      <AvatarFallback>{content.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {content.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {content.author.bio}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Content */}
                  <div className="prose prose-stone max-w-none">
                    <p className="text-lg text-muted-foreground mb-4">
                      {content.description}
                    </p>
                    {content.fullContent
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="text-foreground mb-4">
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {/* Media Gallery */}
                  {content.media && content.media.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <h3 className="font-semibold text-foreground mb-4">
                        Médias associés
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {content.media.map((media, index) => (
                          <div
                            key={index}
                            className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer group"
                          >
                            {media.type === "image" && (
                              <img
                                src={media.url}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            )}
                            {media.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <Play className="h-10 w-10 text-white" />
                              </div>
                            )}
                            {media.type === "audio" && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FileAudio className="h-10 w-10 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <Separator className="my-6" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className="gap-2"
                      >
                        <Heart
                          className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                        />
                        {content.likes + (isLiked ? 1 : 0)}
                      </Button>
                      <Button
                        variant={isSaved ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsSaved(!isSaved)}
                        className="gap-2"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                        />
                        Sauvegarder
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Partager
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="shadow-card mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Commentaires ({mockComments.length})
                  </h3>

                  {/* Add Comment */}
                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">
                      Ajouter un commentaire
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">
                        Votre note:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-5 w-5 transition-colors ${
                                star <= userRating
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground hover:text-accent"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <Textarea
                      placeholder="Partagez votre avis sur ce contenu..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || userRating === 0}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Publier
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {comment.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {comment.author.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "fr-FR"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= comment.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {comment.content}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-muted-foreground"
                        >
                          <Heart className="h-3 w-3" />
                          {comment.likes}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Statistiques
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Eye className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xl font-bold text-foreground">
                        {content.views}
                      </p>
                      <p className="text-xs text-muted-foreground">Vues</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Heart className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xl font-bold text-foreground">
                        {content.likes}
                      </p>
                      <p className="text-xs text-muted-foreground">J'aime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Translations Card */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Traductions disponibles
                  </h3>
                  <div className="space-y-2">
                    {content.translations.map((trans) => {
                      const lang = languages.find(
                        (l) => l.id === trans.language
                      );
                      return (
                        <div
                          key={trans.language}
                          className={`flex items-center justify-between p-2 rounded-lg ${
                            trans.available
                              ? "bg-muted/50 cursor-pointer hover:bg-muted"
                              : "opacity-50"
                          }`}
                        >
                          <span className="text-sm text-foreground">
                            {lang?.name || trans.language}
                          </span>
                          {trans.available ? (
                            <Badge variant="outline" className="text-xs">
                              Disponible
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Bientôt
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Region Info */}
              {region && (
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      À propos de la région
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        {region.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {region.description}
                    </p>
                    {region.capital && (
                      <p className="text-xs text-muted-foreground">
                        Capitale: {region.capital}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {region.languages.map((lang) => (
                        <Badge
                          key={lang}
                          variant="secondary"
                          className="text-xs"
                        >
                          {languages.find((l) => l.id === lang)?.name || lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContentDetail;
