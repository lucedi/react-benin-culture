import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkContentAccess } from "@/services/payment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Crown, Loader2 } from "lucide-react";
import PaymentModal from "./PaymentModal";
import PremiumBadge from "./PremiumBadge";

interface PremiumContentGuardProps {
  contentId: number;
  contentTitle: string;
  price: number;
  currency?: string;
  isPremium: boolean;
  children: React.ReactNode;
  previewContent?: React.ReactNode;
}

const PremiumContentGuard = ({
  contentId,
  contentTitle,
  price,
  currency = "XOF",
  isPremium,
  children,
  previewContent,
}: PremiumContentGuardProps) => {
  const { isAuthenticated, user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    checkAccess();
  }, [contentId, isAuthenticated]);

  const checkAccess = async () => {
    if (!isPremium) {
      setHasAccess(true);
      setIsLoading(false);
      return;
    }

    if (!isAuthenticated) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const accessResponse = await checkContentAccess(contentId);
      setHasAccess(accessResponse.has_access);
    } catch (error) {
      console.error("Error checking access:", error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    checkAccess();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Si le contenu n'est pas premium ou si l'utilisateur a accès
  if (!isPremium || hasAccess) {
    return <>{children}</>;
  }

  // Si le contenu est premium et l'utilisateur n'a pas accès
  return (
    <>
      <Card className="border-2 border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-yellow-50/50">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Icône et badge */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <PremiumBadge variant="large" />
            </div>

            {/* Titre */}
            <div>
              <h3 className="text-2xl font-bold mb-2">Contenu Premium</h3>
              <p className="text-muted-foreground">
                Ce contenu nécessite un paiement unique pour être débloqué
              </p>
            </div>

            {/* Aperçu si disponible */}
            {previewContent && (
              <div className="bg-background/60 rounded-lg p-6 border border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                <div className="relative blur-sm pointer-events-none">
                  {previewContent}
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Lock className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
            )}

            {/* Prix et action */}
            <div className="space-y-4 pt-4">
              <div className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: currency,
                  minimumFractionDigits: 0,
                }).format(price)}
              </div>

              {isAuthenticated ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Débloquer le contenu
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Connectez-vous pour débloquer ce contenu
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => (window.location.href = "/auth")}
                  >
                    Se connecter
                  </Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p>• Accès illimité à vie</p>
                <p>• Paiement sécurisé par Fedapay</p>
                <p>• Support Mobile Money et carte bancaire</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de paiement */}
      {isAuthenticated && (
        <PaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          contentId={contentId}
          contentTitle={contentTitle}
          amount={price}
          currency={currency}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default PremiumContentGuard;
