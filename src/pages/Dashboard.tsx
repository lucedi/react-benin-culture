import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  MessageSquare,
  TrendingUp,
  Bell
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PendingContentList from "@/components/dashboard/PendingContentList";
import UserManagement from "@/components/dashboard/UserManagement";
import ContentStats from "@/components/dashboard/ContentStats";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user role - in real app this comes from auth
  type UserRole = "admin" | "moderator" | "contributor";
  const userRole = "admin" as UserRole;

  const stats = {
    pendingContent: 12,
    publishedContent: 156,
    totalUsers: 324,
    totalComments: 1287,
    todayViews: 2453
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground">
                {userRole === "admin" && "Gérez la plateforme, les utilisateurs et les contenus"}
                {userRole === "moderator" && "Validez les contenus soumis par les contributeurs"}
                {userRole === "contributor" && "Gérez vos publications et suivez leur statut"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              {(userRole === "admin" || userRole === "contributor") && (
                <Button onClick={() => navigate("/publier")}>
                  Créer un contenu
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pendingContent}</p>
                    <p className="text-xs text-muted-foreground">En attente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.publishedContent}</p>
                    <p className="text-xs text-muted-foreground">Publiés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <p className="text-xs text-muted-foreground">Utilisateurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalComments}</p>
                    <p className="text-xs text-muted-foreground">Commentaires</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.todayViews}</p>
                    <p className="text-xs text-muted-foreground">Vues aujourd'hui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                <FileText className="h-4 w-4" />
                Modération
                {stats.pendingContent > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 px-1.5">
                    {stats.pendingContent}
                  </Badge>
                )}
              </TabsTrigger>
              {userRole === "admin" && (
                <TabsTrigger value="users" className="gap-2">
                  <Users className="h-4 w-4" />
                  Utilisateurs
                </TabsTrigger>
              )}
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ContentStats />
            </TabsContent>

            <TabsContent value="pending">
              <PendingContentList />
            </TabsContent>

            {userRole === "admin" && (
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
            )}

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>
                    Configurez les options de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Les paramètres seront disponibles prochainement.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
