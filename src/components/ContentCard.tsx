import { Link } from "react-router-dom";
import { Heart, Eye, Clock, MapPin, Languages, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { regions } from "@/data/regions";
import { languages } from "@/data/languages";
import { contentTypes } from "@/data/contentTypes";

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    description: string;
    type: string;
    region: string;
    language: string;
    author: string;
    likes: number;
    views: number;
    image: string;
    isPremium: boolean;
    createdAt: string;
  };
  viewMode?: "grid" | "list";
}

const ContentCard = ({ content, viewMode = "grid" }: ContentCardProps) => {
  const region = regions.find(r => r.id === content.region);
  const language = languages.find(l => l.id === content.language);
  const contentType = contentTypes.find(ct => ct.id === content.type);
  const TypeIcon = contentType?.icon;

  if (viewMode === "list") {
    return (
      <Link to={`/content/${content.id}`}>
        <Card className="hover:shadow-card transition-all duration-300 group overflow-hidden">
          <CardContent className="p-0">
            <div className="flex gap-4">
              <div className="relative w-48 h-32 flex-shrink-0">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {content.isPremium && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-accent text-accent-foreground">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1 py-3 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  {TypeIcon && <TypeIcon className="h-4 w-4 text-primary" />}
                  <Badge variant="outline" className="text-xs">
                    {contentType?.name}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {content.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {content.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {region?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Languages className="h-3 w-3" />
                    {language?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {content.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {content.views}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/content/${content.id}`}>
      <Card className="hover:shadow-card transition-all duration-300 group overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {TypeIcon && <TypeIcon className="h-3 w-3 mr-1" />}
                {contentType?.name}
              </Badge>
            </div>
            
            {content.isPremium && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent text-accent-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>
            )}

            {/* Region & Language */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-white text-xs">
                <MapPin className="h-3 w-3" />
                {region?.name}
              </span>
              <span className="flex items-center gap-1 text-white text-xs">
                <Languages className="h-3 w-3" />
                {language?.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {content.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {content.description}
            </p>

            {/* Author & Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Par {content.author}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {content.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {content.views}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
