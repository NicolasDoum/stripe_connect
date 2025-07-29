// Stripe Account Link Setup for Partner Onboarding
// This script creates a connected account and generates an account link for onboarding

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPartnerAccount() {
  try {
    // Step 1: Create a connected account
    const account = await stripe.accounts.create({
      type: 'standard', // or 'express' for simpler onboarding
      // Pre-fill information if available
      email: process.env.PARTNER_EMAIL || 'partner@example.com',
      business_profile: {
        name: process.env.PARTNER_BUSINESS_NAME || 'Partner Business Name',
        url: process.env.PARTNER_WEBSITE_URL || 'https://partner-website.com'
      },
      // Request capabilities as needed
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      }
    });

    console.log('Connected account created:', account.id);
    
    // Step 2: Create an Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: process.env.REFRESH_URL || 'http://localhost:3000/stripe/refresh',
      return_url: process.env.RETURN_URL || 'http://localhost:3000/stripe/return',
      type: 'account_onboarding',
      collection_options: {
        fields: 'eventually_due' // For upfront onboarding, or 'currently_due' for incremental
      }
    });

    console.log('Account Link created:', accountLink.url);
    console.log('\nSend your partner to this URL to complete onboarding:');
    console.log(accountLink.url);
    
    return {
      accountId: account.id,
      onboardingUrl: accountLink.url
    };
    
  } catch (error) {
    console.error('Error creating account link:', error);
    throw error;
  }
}

// Refresh URL handler - creates a new account link when the previous one expires
async function handleRefreshUrl(accountId) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.REFRESH_URL || 'http://localhost:3000/stripe/refresh',
      return_url: process.env.RETURN_URL || 'http://localhost:3000/stripe/return',
      type: 'account_onboarding',
      collection_options: {
        fields: 'eventually_due'
      }
    });
    
    return accountLink.url;
  } catch (error) {
    console.error('Error refreshing account link:', error);
    throw error;
  }
}

// Return URL handler - check if onboarding is complete
async function handleReturnUrl(accountId) {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    
    // Check if there are any outstanding requirements
    const hasOutstandingRequirements = 
      account.requirements.currently_due.length > 0 || 
      account.requirements.eventually_due.length > 0;
    
    if (hasOutstandingRequirements) {
      console.log('Onboarding incomplete. Outstanding requirements:', {
        currently_due: account.requirements.currently_due,
        eventually_due: account.requirements.eventually_due
      });
      return false;
    } else {
      console.log('Onboarding complete! Account is ready to use.');
      return true;
    }
  } catch (error) {
    console.error('Error checking account status:', error);
    throw error;
  }
}

// Execute the function
createPartnerAccount();

module.exports = {
  createPartnerAccount,
  handleRefreshUrl,
  handleReturnUrl
};