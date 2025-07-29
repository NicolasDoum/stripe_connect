// Express server to handle Stripe redirect URLs
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { handleRefreshUrl, handleReturnUrl } = require('./create_account_link');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store account IDs in memory (use a database in production)
const accountSessions = new Map();

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>Stripe Partner Onboarding Server</h1>
    <p>This server handles redirect URLs for Stripe Connect onboarding.</p>
    <p>To create a new partner account, run the script locally.</p>
  `);
});

// Refresh URL endpoint - handles expired or invalid account links
app.get('/stripe/refresh', async (req, res) => {
  try {
    // Get account ID from session or query parameter
    const accountId = req.query.account_id || accountSessions.get(req.sessionID);
    
    if (!accountId) {
      return res.status(400).send('Account ID not found');
    }
    
    // Create a new account link
    const newUrl = await handleRefreshUrl(accountId);
    
    // Redirect partner to the new account link
    res.redirect(newUrl);
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).send('Error creating new account link');
  }
});

// Return URL endpoint - handles completed or saved onboarding
app.get('/stripe/return', async (req, res) => {
  try {
    // Get account ID from session or query parameter
    const accountId = req.query.account_id || accountSessions.get(req.sessionID);
    
    if (!accountId) {
      return res.status(400).send('Account ID not found');
    }
    
    // Check if onboarding is complete
    const isComplete = await handleReturnUrl(accountId);
    
    if (isComplete) {
      res.send(`
        <h1>Onboarding Complete!</h1>
        <p>Your partner account is now fully set up.</p>
        <p>Account ID: ${accountId}</p>
      `);
    } else {
      res.send(`
        <h1>Onboarding In Progress</h1>
        <p>Your partner still needs to complete some requirements.</p>
        <p>They can continue onboarding later from their dashboard.</p>
        <p>Account ID: ${accountId}</p>
      `);
    }
  } catch (error) {
    console.error('Return error:', error);
    res.status(500).send('Error checking account status');
  }
});

// Webhook endpoint to listen for account updates
app.post('/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'account.updated':
      const account = event.data.object;
      console.log('Account updated:', account.id);
      console.log('Requirements:', account.requirements);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`\nEnvironment variables loaded from .env file`);
  console.log(`Make sure your .env file contains all necessary configurations`);
});