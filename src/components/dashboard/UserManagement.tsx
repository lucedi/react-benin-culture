import { useState } from "react";
import { Search, MoreVertical, Shield, User, UserCog, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "moderator" | "contributor" | "reader";
  status: "active" | "suspended";
  joinedAt: string;
  contributions: number;
}

const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Koffi Mensah",
    email: "koffi@example.com",
    avatar: "",
    role: "contributor",
    status: "active",
    joinedAt: "2024-01-01",
    contributions: 15
  },
  {
    id: "2",
    name: "Aïcha Dossou",
    email: "aicha@example.com",
    avatar: "",
    role: "moderator",
    status: "active",
    joinedAt: "2023-11-15",
    contributions: 8
  },
  {
    id: "3",
    name: "Jean-Pierre Houngbédji",
    email: "jp@example.com",
    avatar: "",
    role: "contributor",
    status: "active",
    joinedAt: "2023-12-20",
    contributions: 23
  },
  {
    id: "4",
    name: "Marie Adjovi",
    email: "marie@example.com",
    avatar: "",
    role: "reader",
    status: "active",
    joinedAt: "2024-01-10",
    contributions: 0
  },
  {
    id: "5",
    name: "Admin Principal",
    email: "admin@benin-culture.com",
    avatar: "",
    role: "admin",
    status: "active",
    joinedAt: "2023-01-01",
    contributions: 45
  }
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  const getRoleBadge = (role: UserData["role"]) => {
    const config = {
      admin: { label: "Administrateur", variant: "destructive" as const, icon: Shield },
      moderator: { label: "Modérateur", variant: "default" as const, icon: UserCog },
      contributor: { label: "Contributeur", variant: "secondary" as const, icon: Edit },
      reader: { label: "Lecteur", variant: "outline" as const, icon: User }
    };
    const { label, variant, icon: Icon } = config[role];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = () => {
    if (!selectedUser || !newRole) return;

    setUsers(prev => 
      prev.map(u => 
        u.id === selectedUser.id 
          ? { ...u, role: newRole as UserData["role"] }
          : u
      )
    );

    toast({
      title: "Rôle modifié",
      description: `${selectedUser.name} est maintenant ${newRole}.`,
    });

    setSelectedUser(null);
    setNewRole("");
  };

  const handleSuspendUser = (user: UserData) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );

    toast({
      title: user.status === "active" ? "Utilisateur suspendu" : "Utilisateur réactivé",
      description: `${user.name} a été ${user.status === "active" ? "suspendu" : "réactivé"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
          <CardDescription>
            Gérez les rôles et les permissions des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
                <SelectItem value="moderator">Modérateurs</SelectItem>
                <SelectItem value="contributor">Contributeurs</SelectItem>
                <SelectItem value="reader">Lecteurs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Utilisateur</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Rôle</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Contributions</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Inscrit le</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {user.contributions}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {new Date(user.joinedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                        {user.status === "active" ? "Actif" : "Suspendu"}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedUser(user);
                            setNewRole(user.role);
                          }}>
                            <UserCog className="h-4 w-4 mr-2" />
                            Modifier le rôle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user)}>
                            <Shield className="h-4 w-4 mr-2" />
                            {user.status === "active" ? "Suspendre" : "Réactiver"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Change Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le rôle</DialogTitle>
            <DialogDescription>
              Changer le rôle de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="moderator">Modérateur</SelectItem>
                <SelectItem value="contributor">Contributeur</SelectItem>
                <SelectItem value="reader">Lecteur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Annuler
            </Button>
            <Button onClick={handleRoleChange}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
