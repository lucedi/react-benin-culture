import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiscoverSection from "@/components/DiscoverSection";
import PopularContent from "@/components/PopularContent";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DiscoverSection />
        <PopularContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
