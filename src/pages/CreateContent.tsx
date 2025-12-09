import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, Plus, ImageIcon, FileVideo, FileAudio, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { regions } from "@/data/regions";
import { languages } from "@/data/languages";
import { contentTypes } from "@/data/contentTypes";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video" | "audio" | "document";
}

const CreateContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [contentType, setContentType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: MediaFile[] = [];
    
    Array.from(files).forEach((file) => {
      let type: MediaFile["type"] = "document";
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";
      else if (file.type.startsWith("audio/")) type = "audio";

      const preview = type === "image" ? URL.createObjectURL(file) : "";
      
      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type
      });
    });

    setMediaFiles([...mediaFiles, ...newFiles]);
  };

  const removeMedia = (id: string) => {
    setMediaFiles(mediaFiles.filter(m => m.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !contentType || !selectedRegion || !selectedLanguage) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Contenu soumis avec succès !",
      description: "Votre contenu est en attente de validation par un modérateur.",
    });

    setIsSubmitting(false);
    navigate("/explorer");
  };

  const getMediaIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image": return <ImageIcon className="h-6 w-6" />;
      case "video": return <FileVideo className="h-6 w-6" />;
      case "audio": return <FileAudio className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Publier un nouveau contenu
            </h1>
            <p className="text-muted-foreground">
              Partagez vos connaissances sur la culture béninoise avec la communauté
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Décrivez votre contenu de manière claire et attractive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: La légende du roi Béhanzin"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description courte *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Une brève description qui apparaîtra dans les aperçus"
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="fullContent">Contenu complet *</Label>
                  <Textarea
                    id="fullContent"
                    value={fullContent}
                    onChange={(e) => setFullContent(e.target.value)}
                    placeholder="Écrivez votre histoire, recette ou article ici..."
                    className="mt-1"
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Classification */}
            <Card>
              <CardHeader>
                <CardTitle>Classification</CardTitle>
                <CardDescription>
                  Catégorisez votre contenu pour faciliter sa découverte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Type de contenu *</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Région *</Label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner une région" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Langue principale *</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(lang => (
                          <SelectItem key={lang.id} value={lang.id}>
                            {lang.name} ({lang.nativeName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Premium Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-base">Contenu Premium</Label>
                    <p className="text-sm text-muted-foreground">
                      Les utilisateurs devront payer pour accéder au contenu complet
                    </p>
                  </div>
                  <Switch
                    checked={isPremium}
                    onCheckedChange={setIsPremium}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Médias</CardTitle>
                <CardDescription>
                  Ajoutez des images, vidéos ou fichiers audio pour enrichir votre contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Upload Zone */}
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Cliquez ou déposez vos fichiers ici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Images, vidéos, audios ou documents PDF
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*,audio/*,.pdf"
                  />
                </label>

                {/* Uploaded Files */}
                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {mediaFiles.map((media) => (
                      <div 
                        key={media.id}
                        className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        {media.type === "image" && media.preview ? (
                          <img 
                            src={media.preview} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {getMediaIcon(media.type)}
                            <span className="text-xs text-muted-foreground mt-2 px-2 text-center truncate max-w-full">
                              {media.file.name}
                            </span>
                          </div>
                        )}
                        <Badge 
                          variant="secondary" 
                          className="absolute bottom-2 left-2 text-xs capitalize"
                        >
                          {media.type}
                        </Badge>
                        <button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                * Champs obligatoires
              </p>
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Soumettre pour validation"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateContent;
