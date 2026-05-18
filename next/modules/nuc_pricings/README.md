# nuc_pricings

Module for pricing sections with payment links.

## Features

- **Pricing Section Component** - Beautiful, responsive pricing tables with 3 category types
- **Payment Links** - Direct links to payment pages (Stripe Payment Links, etc.)
- **Plan Categories**:
  - **Customer** - For individuals and small businesses
  - **Programmer** - Built for developers and tech teams
  - **Entrepreneur** - Scale your business to the next level

## Usage

### Pricing Section

```vue
<template>
  <nuc-section-pricing />
</template>
```

## Customization

Plans are defined in `components/pricing/plans.ts`. You can modify:

- Plan names and descriptions
- Pricing amounts and currencies
- Feature lists
- Payment links (monthlyLink, oneTimeLink)

## Components

- `NucSectionPricing` - Main pricing section component with category tabs and plan cards
