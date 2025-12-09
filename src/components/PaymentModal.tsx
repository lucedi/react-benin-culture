import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CreditCard, Smartphone, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { initiatePayment } from "@/services/payment";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
  contentTitle: string;
  amount: number;
  currency?: string;
  onSuccess?: (transactionId: number) => void;
}

const PaymentModal = ({
  open,
  onClose,
  contentId,
  contentTitle,
  amount,
  currency = "XOF",
  onSuccess,
}: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("mobile_money");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePayment = async () => {
    if (paymentMethod === "mobile_money" && !phoneNumber) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }

    try {
      setIsLoading(true);

      // Initier le paiement via le backend
      const response = await initiatePayment({
        content_id: contentId,
        amount: amount,
        currency: currency,
        description: `Accès au contenu: ${contentTitle}`,
        callback_url: `${window.location.origin}/payment/callback`,
      });

      // Rediriger vers la page de paiement Fedapay
      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        toast.success("Paiement initié avec succès", {
          description: "Vous allez être redirigé vers la page de paiement",
        });

        if (onSuccess) {
          onSuccess(response.transaction_id);
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'initialisation du paiement";
      toast.error("Erreur de paiement", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Débloquer le contenu premium
          </DialogTitle>
          <DialogDescription>
            Accédez à "{contentTitle}" en effectuant un paiement unique.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Montant */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Montant à payer</span>
              <span className="text-2xl font-bold text-primary">
                {formatAmount(amount, currency)}
              </span>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Choisissez votre méthode de paiement
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="mobile_money" id="mobile_money" />
                <Label
                  htmlFor="mobile_money"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <Smartphone className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-sm text-muted-foreground">
                      MTN Money, Moov Money, Orange Money
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <CreditCard className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Carte bancaire</p>
                    <p className="text-sm text-muted-foreground">
                      Visa, Mastercard
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Numéro de téléphone pour Mobile Money */}
          {paymentMethod === "mobile_money" && (
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Ex: +229 XX XX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Le numéro associé à votre compte Mobile Money
              </p>
            </div>
          )}

          {/* Avertissement sécurisé */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Le paiement est sécurisé par <strong>Fedapay</strong>. Vos
              informations bancaires ne sont jamais stockées sur nos serveurs.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement...
              </>
            ) : (
              <>Payer {formatAmount(amount, currency)}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
