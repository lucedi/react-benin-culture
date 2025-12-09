import { FileText, TrendingUp, Users, Eye, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ContentStats = () => {
  const recentActivity = [
    { id: 1, action: "Nouveau contenu soumis", title: "La légende du serpent arc-en-ciel", time: "Il y a 2 heures", type: "submission" },
    { id: 2, action: "Contenu validé", title: "Recette du Amiwo authentique", time: "Il y a 3 heures", type: "approved" },
    { id: 3, action: "Nouveau commentaire", title: "Les danses traditionnelles Yoruba", time: "Il y a 5 heures", type: "comment" },
    { id: 4, action: "Nouvelle inscription", title: "Marie Adjovi", time: "Il y a 6 heures", type: "signup" },
    { id: 5, action: "Contenu rejeté", title: "Article non conforme", time: "Il y a 8 heures", type: "rejected" }
  ];

  const topContent = [
    { id: 1, title: "La légende de Béhanzin", views: 2453, comments: 45, rating: 4.8 },
    { id: 2, title: "Recette du Wassa-Wassa", views: 1876, comments: 32, rating: 4.7 },
    { id: 3, title: "Les rites vodoun de Ouidah", views: 1654, comments: 28, rating: 4.9 },
    { id: 4, title: "Chants traditionnels Bariba", views: 1432, comments: 21, rating: 4.6 },
    { id: 5, title: "La danse Zangbeto", views: 1298, comments: 19, rating: 4.5 }
  ];

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "submission": return <Badge variant="secondary">Soumission</Badge>;
      case "approved": return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Validé</Badge>;
      case "rejected": return <Badge variant="destructive">Rejeté</Badge>;
      case "comment": return <Badge variant="outline">Commentaire</Badge>;
      case "signup": return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Inscription</Badge>;
      default: return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Activité récente
          </CardTitle>
          <CardDescription>
            Les dernières actions sur la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Contenus populaires
          </CardTitle>
          <CardDescription>
            Les contenus les plus consultés ce mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div 
                key={content.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="text-2xl font-bold text-muted-foreground w-8">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{content.title}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {content.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {content.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content by Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contenus par catégorie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "Histoires", count: 45, color: "bg-primary" },
              { type: "Recettes", count: 38, color: "bg-amber-500" },
              { type: "Articles", count: 32, color: "bg-blue-500" },
              { type: "Musique", count: 24, color: "bg-purple-500" },
              { type: "Traditions", count: 17, color: "bg-green-500" }
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm">{item.type}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users by Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Utilisateurs par rôle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { role: "Lecteurs", count: 285, color: "bg-muted-foreground" },
              { role: "Contributeurs", count: 32, color: "bg-blue-500" },
              { role: "Modérateurs", count: 5, color: "bg-amber-500" },
              { role: "Administrateurs", count: 2, color: "bg-destructive" }
            ].map((item) => (
              <div key={item.role} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm">{item.role}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentStats;
