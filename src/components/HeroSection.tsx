import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImage from "@/assets/hero-benin.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollToDiscover = () => {
    const element = document.getElementById("decouvrir");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Culture béninoise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
              <span className="text-cream text-sm font-medium">
                Découvrez le patrimoine du Bénin
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="animate-fade-up text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cream mb-6 leading-tight"
              style={{ animationDelay: "0.1s" }}
            >
              Plongez au cœur de la{" "}
              <span className="text-gradient">culture béninoise</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="animate-fade-up text-lg md:text-xl text-cream/80 mb-8 max-w-2xl mx-auto"
              style={{ animationDelay: "0.2s" }}
            >
              Explorez les traditions, l'histoire, la musique, la cuisine et les légendes 
              d'un des pays les plus riches culturellement d'Afrique de l'Ouest.
            </p>

            {/* CTA Buttons */}
            <div 
              className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ animationDelay: "0.3s" }}
            >
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-glow group"
                onClick={scrollToDiscover}
              >
                Commencer l'exploration
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                // size="lg" 
                // variant="outline" 
                className="border-cream/30 text-cream hover:bg-cream/10 px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la vidéo
              </Button>
            </div>

            {/* Stats */}
            <div 
              className="animate-fade-up mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "500+", label: "Contenus" },
                { value: "50K+", label: "Visiteurs" },
                { value: "12", label: "Catégories" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-cream/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToDiscover}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cream/50 rounded-full animate-bounce" />
          </div>
        </button>
      </section>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-earth-dark">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-cream">Découvrez la culture béninoise</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-earth-dark flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-accent" />
              </div>
              <p className="text-cream/70">
                Vidéo de présentation bientôt disponible
              </p>
              <p className="text-cream/50 text-sm mt-2">
                Une immersion visuelle dans la richesse culturelle du Bénin
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
