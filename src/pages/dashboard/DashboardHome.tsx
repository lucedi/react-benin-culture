import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/layouts/DashboardLayout";

const stats = [
  { 
    title: "Contenus publiés", 
    value: "156", 
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  { 
    title: "Utilisateurs actifs", 
    value: "324", 
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  { 
    title: "Vues ce mois", 
    value: "12.4K", 
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  { 
    title: "En attente", 
    value: "12", 
    change: "-3",
    trend: "down",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
];

const recentContent = [
  { id: 1, title: "La légende du serpent arc-en-ciel", type: "Histoire", status: "pending", author: "Koffi M.", date: "Il y a 2h" },
  { id: 2, title: "Recette du Amiwo authentique", type: "Recette", status: "approved", author: "Aïcha D.", date: "Il y a 3h" },
  { id: 3, title: "Les rites vodoun de Ouidah", type: "Article", status: "pending", author: "Jean-Pierre H.", date: "Il y a 5h" },
  { id: 4, title: "Chants traditionnels de l'Atacora", type: "Musique", status: "approved", author: "Natitingou C.", date: "Il y a 8h" },
];

const topContributors = [
  { name: "Koffi Mensah", contributions: 23, avatar: "KM" },
  { name: "Aïcha Dossou", contributions: 18, avatar: "AD" },
  { name: "Jean-Pierre H.", contributions: 15, avatar: "JP" },
  { name: "Marie Adjovi", contributions: 12, avatar: "MA" },
];

const DashboardHome = () => {
  return (
    <DashboardLayout 
      title="Tableau de bord" 
      description="Bienvenue, Admin Principal"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-amber-500" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-amber-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">vs mois dernier</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Contenus récents</CardTitle>
            <Button variant="ghost" size="sm">Voir tout</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div 
                  key={content.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{content.type}</Badge>
                      <Badge 
                        variant={content.status === "approved" ? "default" : "secondary"}
                        className={content.status === "approved" ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" : ""}
                      >
                        {content.status === "approved" ? "Publié" : "En attente"}
                      </Badge>
                    </div>
                    <p className="font-medium truncate">{content.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Par {content.author} • {content.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Voir</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Top contributeurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{contributor.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.contributions} publications</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content by Category */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Répartition des contenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Histoires & Contes", count: 45, total: 156, color: "bg-primary" },
              { name: "Recettes", count: 38, total: 156, color: "bg-amber-500" },
              { name: "Articles culturels", count: 32, total: 156, color: "bg-blue-500" },
              { name: "Musique", count: 24, total: 156, color: "bg-purple-500" },
              { name: "Traditions", count: 17, total: 156, color: "bg-green-500" },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">{category.count} ({Math.round(category.count / category.total * 100)}%)</span>
                </div>
                <Progress 
                  value={(category.count / category.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardHome;
