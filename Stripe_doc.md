# Stripe-hosted onboarding

Onboard connected accounts by redirecting them to a Stripe-hosted onboarding flow.

Stripe-hosted onboarding handles the collection of business and identity verification information from connected accounts, requiring minimal effort by the platform. It’s a web form hosted by Stripe that renders dynamically based on the capabilities, country, and business type of each connected account.
![](https://b.stripecdn.com/docs-statics-srv/assets/hosted_onboarding_form.37ff5a6f7d39a33ebda671e33419971c.png)

The hosted onboarding form in Stripe’s sample integration, [Rocket Deliveries](https://rocketdeliveries.io/.md).

Stripe-hosted onboarding with Accounts v1 supports [networked onboarding](https://docs.stripe.com/connect/networked-onboarding.md), which allows owners of multiple Stripe accounts to share business information between them. When they onboard an account, they can reuse that information from an existing account instead of resubmitting it.

## Customise the onboarding form [Dashboard]

Go to the [Connect settings page](https://dashboard.stripe.com/account/applications/settings.md) in the Dashboard to customise the visual appearance of the form with your brand’s name, colour, and icon. Stripe-hosted onboarding requires this information. Stripe also recommends [collecting bank account information](https://dashboard.stripe.com/settings/connect/payouts/onboarding.md) from your connected accounts as they’re onboarding.

## Create an account and pre-fill information [Server-side]

Create a [connected account](https://docs.stripe.com/api/accounts.md) with the default [controller](https://docs.stripe.com/api/accounts/create#create_account-controller.md) properties. See [design an integration](https://docs.stripe.com/connect/design-an-integration.md) to learn more about controller properties. Alternatively, you can create a connected account by specifying an account [type](https://docs.stripe.com/api/accounts/create#create_account-type.md).

If you specify the account’s country or request any capabilities for it, then the account owner can’t change its country. Otherwise, it depends on the account’s Dashboard access:

- **Full Stripe Dashboard:** During onboarding, the account owner can select any acquiring country, the same as when signing up for a normal Stripe account. Stripe automatically requests a set of capabilities for the account based on the selected country.
- **Express Dashboard:** During onboarding, the account owner can select from a list of countries that you configure in your platform Dashboard [Onboarding options](https://dashboard.stripe.com/settings/connect/onboarding-options/countries.md). You can also configure those options to specify the default capabilities to request for accounts in each country.
- **No Stripe Dashboard**: If Stripe is responsible for collecting requirements, then the onboarding flow lets the account owner select any acquiring country. Otherwise, your custom onboarding flow must set the country and request capabilities.

#### With controller properties

```curl
curl -X POST https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:"
```

```cli
stripe accounts create
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

account = Stripe::Account.create()
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

account = client.v1.accounts.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
import stripe
stripe.api_key = "<<YOUR_SECRET_KEY>>"

account = stripe.Account.create()
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

account = client.accounts.create()
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$account = $stripe->accounts->create([]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

AccountCreateParams params = AccountCreateParams.builder().build();

Account account = Account.create(params);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

AccountCreateParams params = AccountCreateParams.builder().build();

Account account = client.accounts().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const account = await stripe.accounts.create();
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.AccountParams{}
result, err := account.New(params)
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.AccountCreateParams{}
result, err := sc.V1Accounts.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

var options = new AccountCreateOptions();
var service = new AccountService();
Account account = service.Create(options);
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new AccountCreateOptions();
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Accounts;
Account account = service.Create(options);
```

#### With account type

```curl
curl https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=standard
```

```cli
stripe accounts create  \
  --type=standard
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

account = Stripe::Account.create({type: 'standard'})
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

account = client.v1.accounts.create({type: 'standard'})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
import stripe
stripe.api_key = "<<YOUR_SECRET_KEY>>"

account = stripe.Account.create(type="standard")
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

account = client.accounts.create({"type": "standard"})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$account = $stripe->accounts->create(['type' => 'standard']);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

AccountCreateParams params =
  AccountCreateParams.builder().setType(AccountCreateParams.Type.STANDARD).build();

Account account = Account.create(params);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

AccountCreateParams params =
  AccountCreateParams.builder().setType(AccountCreateParams.Type.STANDARD).build();

Account account = client.accounts().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const account = await stripe.accounts.create({
  type: 'standard',
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.AccountParams{Type: stripe.String(stripe.AccountTypeStandard)}
result, err := account.New(params)
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.AccountCreateParams{Type: stripe.String(stripe.AccountTypeStandard)}
result, err := sc.V1Accounts.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

var options = new AccountCreateOptions { Type = "standard" };
var service = new AccountService();
Account account = service.Create(options);
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new AccountCreateOptions { Type = "standard" };
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.Accounts;
Account account = service.Create(options);
```

The response includes the ID, which you use to reference the `Account` throughout your integration.

### Request capabilities

You can request [capabilities](https://docs.stripe.com/connect/account-capabilities#creating.md) when creating an account by setting the desired capabilities’ `requested` property to true. For accounts with access to the Express Dashboard, you can also configure your [Onboarding options](https://dashboard.stripe.com/settings/connect/onboarding-options/countries.md) to automatically request certain capabilities when creating an account.

Stripe’s onboarding UIs automatically collect the requirements for requested capabilities. To reduce onboarding effort, request only the capabilities you need.

### Pre-fill information

If you have information about the account holder (such as their name, address, or other details), you can simplify onboarding by providing it when you create or update the account. The onboarding interface asks the account holder to confirm the pre-filled information before accepting the [Connect service agreement](https://docs.stripe.com/connect/service-agreement-types.md). The account holder can edit any pre-filled information before they accept the service agreement, even if you provided the information using the Accounts API.

If you onboard an account and your platform provides it with a URL, pre-fill the account’s [business_profile.url](https://docs.stripe.com/api/accounts/create#create_account-business_profile-url.md). If the business doesn’t have a URL, you can pre-fill its [business_profile.product_description](https://docs.stripe.com/api/accounts/create#create_account-business_profile-product_description.md) instead.

When testing your integration, use [test data](https://docs.stripe.com/connect/testing.md) to simulate different outcomes including identity verification, business information verification, payout failures, and more.

## Determine the information to collect

As the platform, you must decide if you want to collect the required information from your connected accounts *up front* (Upfront onboarding is a type of onboarding where you collect all required verification information from your users at sign-up) or *incrementally* (Incremental onboarding is a type of onboarding where you gradually collect required verification information from your users. You collect a minimum amount of information at sign-up, and you collect more information as the connected account earns more revenue). Up-front onboarding collects the `eventually_due` requirements for the account, while incremental onboarding only collects the `currently_due` requirements.

| Onboarding type | Advantages                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Up-front**    | - Normally requires only one request for all information
  - Avoids the possibility of payout and processing issues due to missed deadlines
  - Exposes potential risk early when accounts refuse to provide information |
| **Incremental** | - Accounts can onboard quickly because they don’t have to provide as much information                                                                                                                                    |

To determine whether to use up-front or incremental onboarding, review the [requirements](https://docs.stripe.com/connect/required-verification-information.md) for your connected accounts’ locations and capabilities. While Stripe tries to minimise any impact to connected accounts, requirements might change over time.

For connected accounts where you’re responsible for requirement collection, you can customise the behaviour of [future requirements](https://docs.stripe.com/connect/handle-verification-updates.md) using the `collection_options` parameter. To collect the account’s future requirements, set [`collection_options.future_requirements`](https://docs.stripe.com/api/account_links/create#create_account_link-collection_options-future_requirements.md) to `include`.

## Create an Account Link [Server-side]

Create an [Account Link](https://docs.stripe.com/api/account_links.md) using the connected account ID and include a [refresh URL](#refresh-url.md) and a [return URL](#return-url.md). Stripe redirects the connected account to the refresh URL if the Account Link URL has already been visited, has expired, or is otherwise invalid. Stripe redirects connected accounts to the return URL when they have completed or left the onboarding flow. Additionally, based on the information you need to collect, pass either `currently_due` or `eventually_due` for `collection_options.fields`. This example passes `eventually_due` to use upfront onboarding. Set to `currently_due` for incremental onboarding.

```curl
curl https://api.stripe.com/v1/account_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d account="{{CONNECTEDACCOUNT_ID}}" \
  --data-urlencode refresh_url="https://example.com/refresh" \
  --data-urlencode return_url="https://example.com/return" \
  -d type=account_onboarding \
  -d "collection_options[fields]"=eventually_due
```

```cli
stripe account_links create  \
  --account="{{CONNECTEDACCOUNT_ID}}" \
  --refresh-url="https://example.com/refresh" \
  --return-url="https://example.com/return" \
  --type=account_onboarding \
  -d "collection_options[fields]"=eventually_due
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = '<<YOUR_SECRET_KEY>>'

account_link = Stripe::AccountLink.create({
  account: '{{CONNECTEDACCOUNT_ID}}',
  refresh_url: 'https://example.com/refresh',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
  collection_options: {fields: 'eventually_due'},
})
```

```ruby
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

account_link = client.v1.account_links.create({
  account: '{{CONNECTEDACCOUNT_ID}}',
  refresh_url: 'https://example.com/refresh',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
  collection_options: {fields: 'eventually_due'},
})
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
import stripe
stripe.api_key = "<<YOUR_SECRET_KEY>>"

account_link = stripe.AccountLink.create(
  account="{{CONNECTEDACCOUNT_ID}}",
  refresh_url="https://example.com/refresh",
  return_url="https://example.com/return",
  type="account_onboarding",
  collection_options={"fields": "eventually_due"},
)
```

```python
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
client = StripeClient("<<YOUR_SECRET_KEY>>")

account_link = client.account_links.create({
  "account": "{{CONNECTEDACCOUNT_ID}}",
  "refresh_url": "https://example.com/refresh",
  "return_url": "https://example.com/return",
  "type": "account_onboarding",
  "collection_options": {"fields": "eventually_due"},
})
```

```php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
$stripe = new \Stripe\StripeClient('<<YOUR_SECRET_KEY>>');

$accountLink = $stripe->accountLinks->create([
  'account' => '{{CONNECTEDACCOUNT_ID}}',
  'refresh_url' => 'https://example.com/refresh',
  'return_url' => 'https://example.com/return',
  'type' => 'account_onboarding',
  'collection_options' => ['fields' => 'eventually_due'],
]);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
Stripe.apiKey = "<<YOUR_SECRET_KEY>>";

AccountLinkCreateParams params =
  AccountLinkCreateParams.builder()
    .setAccount("{{CONNECTEDACCOUNT_ID}}")
    .setRefreshUrl("https://example.com/refresh")
    .setReturnUrl("https://example.com/return")
    .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
    .setCollectionOptions(
      AccountLinkCreateParams.CollectionOptions.builder()
        .setFields(AccountLinkCreateParams.CollectionOptions.Fields.EVENTUALLY_DUE)
        .build()
    )
    .build();

AccountLink accountLink = AccountLink.create(params);
```

```java
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

AccountLinkCreateParams params =
  AccountLinkCreateParams.builder()
    .setAccount("{{CONNECTEDACCOUNT_ID}}")
    .setRefreshUrl("https://example.com/refresh")
    .setReturnUrl("https://example.com/return")
    .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
    .setCollectionOptions(
      AccountLinkCreateParams.CollectionOptions.builder()
        .setFields(AccountLinkCreateParams.CollectionOptions.Fields.EVENTUALLY_DUE)
        .build()
    )
    .build();

AccountLink accountLink = client.accountLinks().create(params);
```

```node
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');

const accountLink = await stripe.accountLinks.create({
  account: '{{CONNECTEDACCOUNT_ID}}',
  refresh_url: 'https://example.com/refresh',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
  collection_options: {
    fields: 'eventually_due',
  },
});
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
stripe.Key = "<<YOUR_SECRET_KEY>>"

params := &stripe.AccountLinkParams{
  Account: stripe.String("{{CONNECTEDACCOUNT_ID}}"),
  RefreshURL: stripe.String("https://example.com/refresh"),
  ReturnURL: stripe.String("https://example.com/return"),
  Type: stripe.String("account_onboarding"),
  CollectionOptions: &stripe.AccountLinkCollectionOptionsParams{
    Fields: stripe.String("eventually_due"),
  },
}
result, err := accountlink.New(params)
```

```go
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
params := &stripe.AccountLinkCreateParams{
  Account: stripe.String("{{CONNECTEDACCOUNT_ID}}"),
  RefreshURL: stripe.String("https://example.com/refresh"),
  ReturnURL: stripe.String("https://example.com/return"),
  Type: stripe.String("account_onboarding"),
  CollectionOptions: &stripe.AccountLinkCreateCollectionOptionsParams{
    Fields: stripe.String("eventually_due"),
  },
}
result, err := sc.V1AccountLinks.Create(context.TODO(), params)
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
StripeConfiguration.ApiKey = "<<YOUR_SECRET_KEY>>";

var options = new AccountLinkCreateOptions
{
    Account = "{{CONNECTEDACCOUNT_ID}}",
    RefreshUrl = "https://example.com/refresh",
    ReturnUrl = "https://example.com/return",
    Type = "account_onboarding",
    CollectionOptions = new AccountLinkCollectionOptionsOptions
    {
        Fields = "eventually_due",
    },
};
var service = new AccountLinkService();
AccountLink accountLink = service.Create(options);
```

```dotnet
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
var options = new AccountLinkCreateOptions
{
    Account = "{{CONNECTEDACCOUNT_ID}}",
    RefreshUrl = "https://example.com/refresh",
    ReturnUrl = "https://example.com/return",
    Type = "account_onboarding",
    CollectionOptions = new AccountLinkCollectionOptionsOptions
    {
        Fields = "eventually_due",
    },
};
var client = new StripeClient("<<YOUR_SECRET_KEY>>");
var service = client.V1.AccountLinks;
AccountLink accountLink = service.Create(options);
```

### Redirect your connected account to the Account Link URL

Redirect the connected account to the Account Link URL to send them to the onboarding flow. Each Account Link URL can only be used once, because it grants access to the account holder’s personal information. Authenticate the account in your application before redirecting them to this URL.

## Identify and address requirement updates [Server-side]

Set up your integration to [listen for changes](https://docs.stripe.com/connect/handling-api-verification#verification-process.md) to account requirements. You can test handling new requirements (and how they might disable charges and payouts) with the [test trigger cards](https://docs.stripe.com/connect/testing#trigger-cards.md).

Send a connected account back through onboarding when it has any `currently_due` or `eventually_due` requirements. You don’t need to identify the specific requirements, because the onboarding interface knows what information it needs to collect. For example, if a typo is preventing verification of the account owner’s identity, onboarding prompts them to upload an identity document.

Stripe notifies you about any [upcoming requirements updates](https://support.stripe.com/user/questions/onboarding-requirements-updates.md) that affect your connected accounts. You can proactively collect this information by reviewing the [future requirements](https://docs.stripe.com/api/accounts/object#account_object-future_requirements.md) for your accounts.

For connected accounts where [controller.requirement_collection](https://docs.stripe.com/api/accounts/object#account_object-controller-requirement_collection.md) is `stripe`, stop receiving updates for identity information after creating an [Account Link](https://docs.stripe.com/api/account_links.md) or [Account Session](https://docs.stripe.com/api/account_sessions.md).

Accounts store identity information in the `company` and `individual` hashes.

### Handle verification errors

Listen to the [account.updated](https://docs.stripe.com/api/events/types#event_types-account.updated.md) event. If the account contains any `currently_due` fields when the `current_deadline` arrives, the corresponding functionality is disabled and those fields are added to `past_due`.

Let your accounts remediate their verification requirements by directing them to the Stripe-hosted onboarding form.
 (See full diagram at https://docs.stripe.com/connect/hosted-onboarding)
## Handle the connected account returning to your platform [Server-side]

The Account Link requires a `refresh_url` and `return_url` to handle all cases in which the connected account is redirected back to your platform. It’s important to implement these correctly to provide the best onboarding flow for your connected accounts.

> You can use HTTP for your `refresh_url` and `return_url` while you’re in a testing environment (for example, to test locally), but live mode only accepts HTTPS. Be sure you’ve swapped any testing URLs for HTTPS URLs before going live.

### Refresh URL

Your connected account is redirected to the `refresh_url` when:

- The link has expired (a few minutes have passed since the link was created).
- The link was already visited (the connected account refreshed the page or clicked the **back** or **forward** button).
- The link was shared in a third-party application such as a messaging client that attempts to access the URL to preview it. Many clients automatically visit links which causes them to expire.

The `refresh_url` should call a method on your server to create a new [Account Link](https://docs.stripe.com/api/account_links.md) with the same parameters and redirect the connected account to the new Account Link URL.

### Return URL

Stripe redirects the connected account back to this URL when they complete the onboarding flow or click **Save for later** at any point in the flow. It **does not** mean that all information has been collected, or that there are no outstanding requirements on the account. It only means the flow was entered and exited properly.

No state is passed with this URL. After a connected account is redirected to the `return_url`, determine if the account has completed onboarding. [Retrieve the account](https://docs.stripe.com/api/accounts/retrieve.md) and check the [requirements](https://docs.stripe.com/api/accounts/object#account_object-requirements.md) hash for outstanding requirements. Alternatively, listen to the `account.updated` event sent to your webhook endpoint and cache the state of the account in your application. If the account hasn’t completed onboarding, provide prompts in your application to allow them to continue onboarding later.

## Handle connected account-initiated updates [Server-side]

Stripe-hosted onboarding also supports connected account-initiated updates to the information they’ve already provided. Listen to the `account.updated` event sent to your webhook endpoint to be notified when the account completes requirements and updates their information.

When you create an Account Link, you can set the `type` to either `account_onboarding` or `account_update`.

> #### Account Link type restriction
> 
> You can create Account Links of type `account_update` only for connected accounts where your platform is responsible for collecting requirements, including Custom accounts. You can’t create them for accounts that have access to a Stripe-hosted Dashboard. If you use [Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md), you can include components that allow your connected accounts to update their own information. For an account without Stripe-hosted Dashboard access where Stripe is liable for negative balances, you must use embedded components.

### Account Links for account_onboarding

Account Links of this type provide a form for inputting outstanding requirements. Use it when you’re onboarding a new connected account, or when an existing user has new requirements (such as when a connected account had already provided enough information, but you requested a new capability that needs additional info). Send them to this type of Account Link to just collect the new information you need.

### Account Links for account_update

Account Links of this type are enabled for accounts where your platform is responsible for requirement collection. `account_update` links display the attributes that are already populated on the account object and allows your connected account to edit previously provided information (for example, they need to update their address). Provide an option in your application (for example, “edit my profile” or “update my verification information”) for connected accounts to make updates themselves.

## Browser support

Stripe-hosted onboarding is only supported in web browsers. You can’t use it in embedded web views inside mobile or desktop applications.
