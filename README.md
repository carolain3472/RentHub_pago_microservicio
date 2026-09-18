# RentHub — Payment service

Node service that handles card payments for
[RentHub](https://github.com/carolain3472/RentHub_backend), isolated from the
main API so that card data never reaches the Django application.

Express · Stripe · Sequelize · PostgreSQL · Elastic APM

## Why it is separate

Card handling drags compliance obligations along with it. Keeping the Stripe
integration in its own service means the Django API — which holds users, objects
and rentals — never sees a card number, and the audit surface stays small.

The service creates a Stripe customer and then a charge, keeping its own record
in PostgreSQL via Sequelize. Elastic APM is wired in for tracing, since a payment
failing silently is worse than a payment failing loudly.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Checkout view (EJS) |
| `POST` | `/payment` | Create customer and charge |

## Running it

```bash
npm install
cp .env.example .env    # Stripe keys, database URL
npm start
```

## The rest of the system

| Repository | Role |
|---|---|
| [RentHub_backend](https://github.com/carolain3472/RentHub_backend) | Django REST API |
| [RentHub_frontend](https://github.com/carolain3472/RentHub_frontend) | React + Vite client |
| **RentHub_pago_microservicio** (this one) | Payment service |

## Known limitations

- Uses `stripe.charges.create`, which Stripe has superseded with Payment Intents;
  it does not support 3D Secure and will fail against European cards
- No webhook handling, so an asynchronous payment outcome never reaches the system
- No idempotency key on charge creation: a retried request can charge twice
- No automated tests
