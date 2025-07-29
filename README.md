# Stripe Connect Partner Onboarding

This project helps you onboard partners using Stripe Connect with account links.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret (optional)
PORT=3000
REFRESH_URL=https://your-domain.railway.app/stripe/refresh
RETURN_URL=https://your-domain.railway.app/stripe/return
```

3. Run the server:
```bash
npm start
```

## Usage

### Create a new partner account:
```bash
npm run create-account
```

This will:
- Create a new connected account
- Generate an onboarding URL
- Display the URL for your partner to complete onboarding

### Server endpoints:
- `/stripe/refresh` - Handles expired account links
- `/stripe/return` - Handles completed/saved onboarding
- `/stripe/webhook` - Receives account updates (optional)

## Deployment on Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy!

The app will automatically use the Railway-provided URLs.