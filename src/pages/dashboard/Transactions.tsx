import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { getUserTransactions, Transaction } from "@/services/payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getUserTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error("Erreur lors du chargement des transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      approved: {
        icon: CheckCircle,
        label: "Approuvé",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      declined: {
        icon: XCircle,
        label: "Refusé",
        className: "bg-red-100 text-red-800 border-red-200",
      },
      pending: {
        icon: Clock,
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      canceled: {
        icon: AlertCircle,
        label: "Annulé",
        className: "bg-gray-100 text-gray-800 border-gray-200",
      },
    };

    const variant = variants[status];
    const Icon = variant.icon;

    return (
      <Badge variant="outline" className={variant.className}>
        <Icon className="w-3 h-3 mr-1" />
        {variant.label}
      </Badge>
    );
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <DashboardLayout
      title="Mes Transactions"
      description="Historique de vos paiements et achats de contenus premium"
    >
      <Card>
        <CardHeader>
          <CardTitle>Historique des transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucune transaction</h3>
              <p className="text-muted-foreground mb-6">
                Vous n'avez pas encore effectué de paiement
              </p>
              <button
                onClick={() => navigate("/explorer")}
                className="text-primary hover:underline"
              >
                Explorer les contenus premium
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Contenu</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">
                        #{transaction.id}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(transaction.created_at)}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            navigate(`/content/${transaction.content_id}`)
                          }
                          className="text-primary hover:underline text-sm"
                        >
                          Contenu #{transaction.content_id}
                        </button>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </TableCell>
                      <TableCell className="text-sm capitalize">
                        {transaction.payment_method || "—"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistiques */}
      {!isLoading && transactions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">
                Total dépensé
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatAmount(
                  transactions
                    .filter((t) => t.status === "approved")
                    .reduce((sum, t) => sum + t.amount, 0),
                  "XOF"
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">
                Contenus débloqués
              </div>
              <div className="text-2xl font-bold text-green-600">
                {transactions.filter((t) => t.status === "approved").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">
                Transactions en attente
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {transactions.filter((t) => t.status === "pending").length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Transactions;
