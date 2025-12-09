# Guide d'Intégration des Paiements Fedapay

Ce document explique comment intégrer le système de paiement Fedapay côté backend pour permettre les paiements de contenus premium.

## Vue d'ensemble

Le système de paiement permet aux utilisateurs de débloquer des contenus premium via :
- **Mobile Money** : MTN Money, Moov Money, Orange Money
- **Cartes bancaires** : Visa, Mastercard

## Configuration Fedapay

### 1. Créer un compte Fedapay

1. Rendez-vous sur [https://fedapay.com](https://fedapay.com)
2. Créez un compte business
3. Vérifiez votre compte
4. Récupérez vos clés API (mode test et production)

### 2. Variables d'environnement Backend

Ajoutez ces variables dans votre fichier `.env` :

```env
FEDAPAY_SECRET_KEY=sk_sandbox_xxxxxxxxxxxxx  # Clé secrète Fedapay
FEDAPAY_PUBLIC_KEY=pk_sandbox_xxxxxxxxxxxxx  # Clé publique Fedapay
FEDAPAY_MODE=sandbox  # ou 'live' pour la production
FEDAPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # Secret pour webhooks
```

## Modèle de données

### Table `transactions`

```sql
CREATE TABLE transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'XOF',
    status ENUM('pending', 'approved', 'declined', 'canceled') DEFAULT 'pending',
    transaction_id VARCHAR(255) UNIQUE,  -- ID de transaction Fedapay
    payment_method VARCHAR(50),  -- 'mobile_money', 'card', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (content_id) REFERENCES contenus(id),

    INDEX idx_user_id (user_id),
    INDEX idx_content_id (content_id),
    INDEX idx_status (status)
);
```

### Ajouter un champ `is_premium` à la table `contenus`

```sql
ALTER TABLE contenus
ADD COLUMN is_premium BOOLEAN DEFAULT FALSE,
ADD COLUMN price DECIMAL(10, 2) DEFAULT NULL,
ADD COLUMN currency VARCHAR(3) DEFAULT 'XOF';
```

## Endpoints API Requis

### 1. POST `/api/v1/payments/initiate`

Initialiser un paiement pour un contenu premium.

**Request Body:**
```json
{
  "content_id": 123,
  "amount": 1000,
  "currency": "XOF",
  "description": "Accès au contenu: Ma recette traditionnelle",
  "callback_url": "https://votreapp.com/payment/callback"
}
```

**Response:**
```json
{
  "transaction_id": 456,
  "payment_url": "https://checkout.fedapay.com/xxxxxxxx",
  "token": "tok_xxxxxxxx"
}
```

**Logique Backend (exemple Python/FastAPI):**

```python
from fedapay import FedaPay, Transaction as FedaPayTransaction

@router.post("/payments/initiate")
async def initiate_payment(
    request: PaymentInitRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Vérifier que le contenu existe et est premium
    content = db.query(Content).filter(Content.id == request.content_id).first()
    if not content or not content.is_premium:
        raise HTTPException(status_code=400, detail="Contenu non premium")

    # Créer une transaction locale
    transaction = Transaction(
        user_id=current_user.id,
        content_id=request.content_id,
        amount=request.amount,
        currency=request.currency,
        status="pending"
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    # Initialiser le paiement Fedapay
    FedaPay.set_api_key(os.getenv("FEDAPAY_SECRET_KEY"))
    FedaPay.set_environment(os.getenv("FEDAPAY_MODE"))

    fedapay_transaction = FedaPayTransaction.create({
        "description": request.description,
        "amount": int(request.amount),
        "currency": {"iso": request.currency},
        "callback_url": request.callback_url,
        "custom_metadata": {
            "transaction_id": transaction.id,
            "user_id": current_user.id,
            "content_id": request.content_id
        }
    })

    # Mettre à jour la transaction avec l'ID Fedapay
    transaction.transaction_id = str(fedapay_transaction.id)
    db.commit()

    # Générer le lien de paiement
    token = fedapay_transaction.generate_token()

    return {
        "transaction_id": transaction.id,
        "payment_url": f"https://checkout.fedapay.com/{token.token}",
        "token": token.token
    }
```

### 2. GET `/api/v1/payments/verify/{transaction_id}`

Vérifier le statut d'une transaction.

**Response:**
```json
{
  "status": "approved",
  "transaction": {
    "id": 456,
    "user_id": 1,
    "content_id": 123,
    "amount": 1000,
    "currency": "XOF",
    "status": "approved",
    "transaction_id": "trx_xxxxxxxx",
    "payment_method": "mobile_money",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:35:00Z"
  }
}
```

**Logique:**

```python
@router.get("/payments/verify/{transaction_id}")
async def verify_payment(
    transaction_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id,
        Transaction.user_id == current_user.id
    ).first()

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction non trouvée")

    # Vérifier le statut chez Fedapay
    if transaction.transaction_id:
        FedaPay.set_api_key(os.getenv("FEDAPAY_SECRET_KEY"))
        fedapay_transaction = FedaPayTransaction.retrieve(transaction.transaction_id)

        # Mettre à jour le statut local
        transaction.status = fedapay_transaction.status
        transaction.payment_method = fedapay_transaction.mode
        db.commit()

    return {
        "status": transaction.status,
        "transaction": transaction
    }
```

### 3. GET `/api/v1/payments/access/{content_id}`

Vérifier si l'utilisateur a accès à un contenu premium.

**Response:**
```json
{
  "content_id": 123,
  "has_access": true,
  "transaction": {
    "id": 456,
    "amount": 1000,
    "status": "approved"
  }
}
```

**Logique:**

```python
@router.get("/payments/access/{content_id}")
async def check_content_access(
    content_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Vérifier si le contenu est premium
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Contenu non trouvé")

    # Si non premium, accès libre
    if not content.is_premium:
        return {"content_id": content_id, "has_access": True}

    # Vérifier si l'utilisateur a payé
    transaction = db.query(Transaction).filter(
        Transaction.content_id == content_id,
        Transaction.user_id == current_user.id,
        Transaction.status == "approved"
    ).first()

    return {
        "content_id": content_id,
        "has_access": transaction is not None,
        "transaction": transaction
    }
```

### 4. GET `/api/v1/payments/transactions`

Récupérer l'historique des transactions de l'utilisateur.

**Response:**
```json
[
  {
    "id": 456,
    "user_id": 1,
    "content_id": 123,
    "amount": 1000,
    "currency": "XOF",
    "status": "approved",
    "payment_method": "mobile_money",
    "created_at": "2025-01-15T10:30:00Z"
  }
]
```

### 5. POST `/api/v1/payments/webhook`

Webhook pour recevoir les notifications Fedapay.

**Important :** Fedapay envoie des notifications pour chaque changement de statut de transaction.

```python
@router.post("/payments/webhook")
async def fedapay_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    # Vérifier la signature du webhook
    signature = request.headers.get("X-Fedapay-Signature")
    payload = await request.body()

    # Vérifier l'authenticité (voir doc Fedapay)
    # ...

    data = await request.json()

    if data["entity"] == "transaction":
        transaction_id = data["entity"]["custom_metadata"]["transaction_id"]

        transaction = db.query(Transaction).filter(
            Transaction.id == transaction_id
        ).first()

        if transaction:
            transaction.status = data["entity"]["status"]
            transaction.payment_method = data["entity"]["mode"]
            db.commit()

    return {"status": "ok"}
```

## Configuration du Webhook Fedapay

1. Connectez-vous à votre dashboard Fedapay
2. Allez dans **Paramètres** → **Webhooks**
3. Ajoutez l'URL : `https://votre-api.com/api/v1/payments/webhook`
4. Sélectionnez l'événement : `transaction.updated`
5. Copiez le secret du webhook dans vos variables d'environnement

## Exemple d'utilisation Frontend

```tsx
import PremiumContentGuard from "@/components/PremiumContentGuard";

const ContentPage = () => {
  const content = {
    id: 123,
    title: "Ma recette traditionnelle",
    is_premium: true,
    price: 1000,
    currency: "XOF"
  };

  return (
    <PremiumContentGuard
      contentId={content.id}
      contentTitle={content.title}
      price={content.price}
      isPremium={content.is_premium}
      previewContent={
        <p>Voici un aperçu de la recette...</p>
      }
    >
      {/* Contenu complet visible uniquement après paiement */}
      <div>
        <h1>{content.title}</h1>
        <p>Contenu complet de la recette...</p>
      </div>
    </PremiumContentGuard>
  );
};
```

## Tests en Mode Sandbox

Fedapay fournit des numéros de test pour le Mobile Money :

- **MTN Money** : +229 9700 0000 (code OTP : 0000)
- **Moov Money** : +229 9600 0000 (code OTP : 0000)
- **Orange Money** : +229 9500 0000 (code OTP : 0000)

## Sécurité

1. **Validation** : Toujours valider que le montant payé correspond au prix du contenu
2. **HTTPS** : Utilisez HTTPS en production
3. **Webhooks** : Vérifiez toujours la signature des webhooks
4. **Clés API** : Ne jamais exposer vos clés secrètes côté frontend

## Documentation Fedapay

- Documentation officielle : https://docs.fedapay.com
- SDK Python : https://github.com/fedapay/fedapay-python
- SDK PHP : https://github.com/fedapay/fedapay-php
- SDK Node.js : https://github.com/fedapay/fedapay-node

## Support

Pour toute question sur l'intégration Fedapay :
- Email : support@fedapay.com
- Discord : https://discord.gg/fedapay
