import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "@/services/payment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "pending"
  >("loading");
  const [message, setMessage] = useState("");
  const [contentId, setContentId] = useState<number | null>(null);

  useEffect(() => {
    verifyTransaction();
  }, []);

  const verifyTransaction = async () => {
    const transactionId = searchParams.get("transaction_id");

    if (!transactionId) {
      setStatus("error");
      setMessage("ID de transaction manquant");
      return;
    }

    try {
      const response = await verifyPayment(Number(transactionId));

      setContentId(response.transaction.content_id);

      switch (response.status) {
        case "approved":
          setStatus("success");
          setMessage(
            "Paiement réussi ! Vous avez maintenant accès au contenu."
          );
          break;
        case "declined":
          setStatus("error");
          setMessage("Le paiement a été refusé. Veuillez réessayer.");
          break;
        case "canceled":
          setStatus("error");
          setMessage("Le paiement a été annulé.");
          break;
        case "pending":
          setStatus("pending");
          setMessage(
            "Le paiement est en cours de traitement. Veuillez patienter."
          );
          break;
        default:
          setStatus("error");
          setMessage("Statut de paiement inconnu");
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la vérification du paiement"
      );
    }
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Vérification du paiement...
            </h2>
            <p className="text-muted-foreground">
              Veuillez patienter pendant que nous vérifions votre paiement
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-green-600">
              Paiement réussi !
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {contentId && (
                <Button
                  size="lg"
                  onClick={() => navigate(`/content/${contentId}`)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Accéder au contenu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard/transactions")}
              >
                Voir mes transactions
              </Button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-red-600">
              Paiement échoué
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {contentId && (
                <Button
                  size="lg"
                  onClick={() => navigate(`/content/${contentId}`)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Réessayer
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/explorer")}
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        );

      case "pending":
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-yellow-600">
              Paiement en cours
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={verifyTransaction} variant="outline">
                Vérifier à nouveau
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard/transactions")}
              >
                Voir mes transactions
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-8">{renderContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCallback;
