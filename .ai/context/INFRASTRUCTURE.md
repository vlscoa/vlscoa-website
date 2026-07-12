# Infrastructure

> Deployment, environments, CI/CD, and external services.
> Update manually or regenerate with `/codebase-overview`.

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| *Development* | *localhost:3000* | *Local dev* |
| *Staging* | *staging.example.com* | *Pre-production testing* |
| *Production* | *app.example.com* | *Live* |

## CI/CD

*Describe pipeline (GitHub Actions, Vercel, etc.)*

## External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| *e.g., Stripe* | *Payments* | *`.env` STRIPE_KEY* |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| *DATABASE_URL* | *Yes* | *PostgreSQL connection string* |
