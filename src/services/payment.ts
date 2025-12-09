import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "api/v1";

export interface Transaction {
  id: number;
  user_id: number;
  content_id: number;
  amount: number;
  currency: string;
  status: "pending" | "approved" | "declined" | "canceled";
  transaction_id?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentInitRequest {
  content_id: number;
  amount: number;
  currency?: string;
  description?: string;
  callback_url?: string;
}

export interface PaymentInitResponse {
  transaction_id: number;
  payment_url: string;
  token: string;
}

export interface PaymentVerifyResponse {
  status: "approved" | "declined" | "canceled" | "pending";
  transaction: Transaction;
}

export interface ContentAccess {
  content_id: number;
  has_access: boolean;
  transaction?: Transaction;
}

/**
 * Initialiser un paiement pour un contenu premium
 */
export const initiatePayment = async (
  data: PaymentInitRequest
): Promise<PaymentInitResponse> => {
  const response = await axios.post<PaymentInitResponse>(
    `${API_URL}/payments/initiate`,
    data
  );
  return response.data;
};

/**
 * Vérifier le statut d'un paiement
 */
export const verifyPayment = async (
  transactionId: number
): Promise<PaymentVerifyResponse> => {
  const response = await axios.get<PaymentVerifyResponse>(
    `${API_URL}/payments/verify/${transactionId}`
  );
  return response.data;
};

/**
 * Vérifier si l'utilisateur a accès à un contenu premium
 */
export const checkContentAccess = async (
  contentId: number
): Promise<ContentAccess> => {
  const response = await axios.get<ContentAccess>(
    `${API_URL}/payments/access/${contentId}`
  );
  return response.data;
};

/**
 * Récupérer l'historique des transactions de l'utilisateur
 */
export const getUserTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get<Transaction[]>(
    `${API_URL}/payments/transactions`
  );
  return response.data;
};

/**
 * Récupérer les détails d'une transaction
 */
export const getTransaction = async (
  transactionId: number
): Promise<Transaction> => {
  const response = await axios.get<Transaction>(
    `${API_URL}/payments/transactions/${transactionId}`
  );
  return response.data;
};

/**
 * Annuler une transaction en attente
 */
export const cancelTransaction = async (
  transactionId: number
): Promise<void> => {
  await axios.post(`${API_URL}/payments/cancel/${transactionId}`);
};
