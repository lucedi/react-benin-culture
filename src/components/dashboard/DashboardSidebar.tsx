import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Bell,
  Plus,
  LogOut,
  ChevronLeft,
  Home,
  BarChart3,
  MessageSquare,
  FolderOpen
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Vue d'ensemble", url: "/dashboard", icon: LayoutDashboard },
  { title: "Modération", url: "/dashboard/moderation", icon: FileText, badge: 12 },
  { title: "Contenus", url: "/dashboard/contenus", icon: FolderOpen },
  { title: "Statistiques", url: "/dashboard/stats", icon: BarChart3 },
];

const adminNavItems = [
  { title: "Utilisateurs", url: "/dashboard/users", icon: Users },
  { title: "Commentaires", url: "/dashboard/comments", icon: MessageSquare },
  { title: "Paramètres", url: "/dashboard/settings", icon: Settings },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-display font-bold text-xl">B</span>
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-bold text-foreground">
                Bénin<span className="text-accent">Culture</span>
              </span>
            )}
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && !collapsed && (
                        <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="px-2 mt-4">
            <Button 
              className="w-full justify-start gap-2" 
              onClick={() => navigate("/publier")}
            >
              <Plus className="h-4 w-4" />
              Créer un contenu
            </Button>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin Principal</p>
              <p className="text-xs text-muted-foreground truncate">admin@benin-culture.com</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
