# Stripe Connect Partner Onboarding - Project Notes

## Overview
This project implements Stripe Connect partner onboarding using Account Links. It creates connected accounts and generates onboarding URLs for partners to complete their setup through Stripe's hosted onboarding flow.

## Key Learnings

### 1. API Key Requirements
- **Secret API Key Required**: You need a full secret key (starts with `sk_live_` or `sk_test_`), not a restricted key
- Restricted keys cannot create connected accounts or account links
- Keep secret keys secure and only use server-side

### 2. Account Link Architecture
- **Account Links are single-use**: Each URL can only be visited once
- **Refresh URL**: Required for when links expire or are invalidated
- **Return URL**: Where partners land after completing/exiting onboarding
- Links expire after a few minutes or if accessed by preview bots

### 3. Environment Setup
- Store sensitive data in `.env` file (gitignored)
- Key environment variables:
  - `STRIPE_SECRET_KEY`: Your Stripe secret key
  - `REFRESH_URL`: URL to handle expired links
  - `RETURN_URL`: URL after onboarding completion
  - `STRIPE_WEBHOOK_SECRET`: Optional for tracking updates

### 4. Deployment Considerations
- **Local vs Production**: 
  - Create accounts locally using `npm run create-account`
  - Deploy only the redirect handler server to production
  - This prevents unauthorized account creation attempts
- **Railway Deployment**:
  - Automatically provides PORT environment variable
  - Add Stripe keys as environment variables in Railway dashboard
  - Update local `.env` with production URLs after deployment

### 5. Stripe Security
- Stripe may temporarily restrict account creation if it detects suspicious activity
- Must confirm in Stripe Dashboard that account creation was intentional
- Error: "We've temporarily restricted your ability to create this type of connected account"

### 6. Onboarding Types
- **Upfront onboarding**: Collects all `eventually_due` requirements
- **Incremental onboarding**: Only collects `currently_due` requirements
- Set via `collection_options.fields` parameter

### 7. Account Types
- **Standard**: Full Stripe Dashboard access
- **Express**: Limited Dashboard access
- **Custom**: No Dashboard access (platform manages everything)

## Common Commands

```bash
# Install dependencies
npm install

# Create a new partner account (run locally)
npm run create-account

# Start the redirect handler server
npm start

# Deploy to Railway
git push origin main  # Railway auto-deploys
```

## Troubleshooting

1. **"Invalid request" errors**: Check if Stripe has restricted your account
2. **Expired links**: Links are single-use and expire quickly
3. **Webhook signature failures**: Ensure webhook secret matches Dashboard
4. **Account requirements**: Use `account.requirements` to check what's needed

## Best Practices

1. Always run account creation locally, not on production servers
2. Pre-fill known information to simplify partner onboarding
3. Handle both refresh and return URLs properly
4. Monitor account.updated webhooks for requirement changes
5. Test with Stripe test mode before going live

## Next Steps

- Implement webhook handling for real-time status updates
- Add database to track account states
- Create admin dashboard to monitor partner onboarding progress
- Implement email notifications for onboarding status