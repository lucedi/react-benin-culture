import { useState } from "react";
import { Eye, CheckCircle, XCircle, MessageSquare, Clock, User, MapPin, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PendingContent {
  id: string;
  title: string;
  description: string;
  type: string;
  region: string;
  language: string;
  author: {
    name: string;
    avatar: string;
  };
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

const mockPendingContent: PendingContent[] = [
  {
    id: "1",
    title: "La légende du serpent arc-en-ciel",
    description: "Une histoire traditionnelle sur l'origine du serpent arc-en-ciel dans la mythologie Fon.",
    type: "story",
    region: "zou",
    language: "fon",
    author: { name: "Koffi Mensah", avatar: "" },
    submittedAt: "2024-01-15T10:30:00",
    status: "pending"
  },
  {
    id: "2",
    title: "Recette du Amiwo authentique",
    description: "La recette traditionnelle du Amiwo, plat emblématique du sud du Bénin.",
    type: "recipe",
    region: "atlantique",
    language: "goun",
    author: { name: "Aïcha Dossou", avatar: "" },
    submittedAt: "2024-01-14T15:45:00",
    status: "pending"
  },
  {
    id: "3",
    title: "Les rites vodoun de Ouidah",
    description: "Exploration des cérémonies vodoun et leur signification culturelle.",
    type: "article",
    region: "atlantique",
    language: "fon",
    author: { name: "Jean-Pierre Houngbédji", avatar: "" },
    submittedAt: "2024-01-13T09:15:00",
    status: "pending"
  },
  {
    id: "4",
    title: "Chants traditionnels de l'Atacora",
    description: "Collection de chants traditionnels des peuples Somba et Otammari.",
    type: "music",
    region: "atacora",
    language: "ditammari",
    author: { name: "Natitingou Culture", avatar: "" },
    submittedAt: "2024-01-12T14:20:00",
    status: "pending"
  }
];

const PendingContentList = () => {
  const { toast } = useToast();
  const [pendingContent, setPendingContent] = useState<PendingContent[]>(mockPendingContent);
  const [selectedContent, setSelectedContent] = useState<PendingContent | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      story: "Histoire",
      recipe: "Recette",
      article: "Article",
      music: "Musique",
      tradition: "Tradition"
    };
    return types[type] || type;
  };

  const handleAction = (content: PendingContent, action: "approve" | "reject") => {
    setSelectedContent(content);
    setActionType(action);
    setReviewNote("");
  };

  const confirmAction = () => {
    if (!selectedContent || !actionType) return;

    setPendingContent(prev => 
      prev.map(c => 
        c.id === selectedContent.id 
          ? { ...c, status: actionType === "approve" ? "approved" : "rejected" }
          : c
      )
    );

    toast({
      title: actionType === "approve" ? "Contenu validé" : "Contenu rejeté",
      description: actionType === "approve" 
        ? `"${selectedContent.title}" est maintenant visible publiquement.`
        : `"${selectedContent.title}" a été rejeté. L'auteur sera notifié.`,
    });

    setSelectedContent(null);
    setActionType(null);
    setReviewNote("");
  };

  const pendingItems = pendingContent.filter(c => c.status === "pending");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Contenus en attente de validation
          </CardTitle>
          <CardDescription>
            {pendingItems.length} contenu(s) nécessitent votre attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingItems.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Aucun contenu en attente</p>
              <p className="text-muted-foreground">Tous les contenus ont été traités.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingItems.map((content) => (
                <div 
                  key={content.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <Badge variant="secondary">{getTypeLabel(content.type)}</Badge>
                        <h3 className="font-semibold text-foreground">{content.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {content.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {content.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {content.region}
                        </span>
                        <span className="flex items-center gap-1">
                          <Languages className="h-3 w-3" />
                          {content.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(content.submittedAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleAction(content, "approve")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Valider
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleAction(content, "reject")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Valider le contenu" : "Rejeter le contenu"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? "Ce contenu sera publié et visible par tous les utilisateurs."
                : "Ce contenu sera rejeté et l'auteur sera notifié."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="font-medium mb-2">{selectedContent?.title}</p>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                {actionType === "approve" ? "Note (optionnel)" : "Raison du rejet *"}
              </label>
              <Textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder={actionType === "approve" 
                  ? "Ajouter une note pour l'auteur..."
                  : "Expliquez pourquoi ce contenu est rejeté..."}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedContent(null)}>
              Annuler
            </Button>
            <Button 
              onClick={confirmAction}
              variant={actionType === "approve" ? "default" : "destructive"}
              disabled={actionType === "reject" && !reviewNote.trim()}
            >
              {actionType === "approve" ? "Confirmer la validation" : "Confirmer le rejet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingContentList;
