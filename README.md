# FLAVRE - Premium Restaurant Ordering Experience

FLAVRE is a high-end restaurant web application built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, and Sonner. It is designed as a polished portfolio-grade product that demonstrates modern UI engineering, premium visual design, interaction design, and a complete frontend ordering flow.

The project is a frontend-only restaurant ordering experience. Customers can browse a cinematic menu, filter dishes, preview products, customize orders, add items to cart, apply coupons, choose delivery or pickup, and send a structured order message through WhatsApp.

## Live Product Concept

FLAVRE represents a premium Arabic restaurant brand with a luxury dark visual identity, warm golden highlights, cinematic food imagery, glassmorphism surfaces, and smooth motion. The goal is not just to display food items, but to create an ordering experience that feels modern, elegant, and memorable.

## Key Features

- Cinematic homepage with animated hero, parallax-style movement, bold typography, and glowing calls to action.
- Modern menu experience with visual category filters, search, sorting, animated tabs, and immersive product cards.
- Product preview modal with variants, price display, rating, and quick add actions.
- Product detail page with interactive size selection, extras, notes, quantity controls, and live animated price updates.
- Smart upsell system that suggests related items using simple rule-based logic.
- Animated cart with add, remove, quantity update interactions, coupon support, and order summary.
- Checkout flow with delivery or pickup options, form validation, and WhatsApp order generation.
- Animated order status screen showing progress from Preparing to Cooking to On the way.
- Global cinematic animated background with dark gradients, warm glow, subtle noise, and premium atmosphere.
- Global route loading overlay with the FLAVRE logo, spinner, glow, and progress animation.
- Multiple themes including gold, neon, dark, ruby, green, blue, purple, and red.
- Toast notifications replacing disruptive alerts.
- Loading skeletons and smooth page transitions.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand with persisted state
- Sonner toast notifications
- Lucide React icons
- Zod and React Hook Form

## Project Structure

```txt
src/
  app/                  App Router pages, layouts, loading screens
  components/
    cart/               Cart UI and interactions
    checkout/           Checkout form and validation
    layout/             Global background and navigation loader
    menu/               Menu browser, product cards, upsells, configurator
    order/              Order progress experience
    sections/           Navbar, footer, homepage sections
    ui/                 Reusable UI primitives
  config/               Brand, feature flags, theme tokens
  data/                 Menu, offers, branches, FAQs, testimonials
  lib/                  Cart logic, utilities, WhatsApp generation, upsell rules
  store/                Zustand app store
  types/                Shared TypeScript types
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Customizing the Brand

The main brand configuration lives in:

```txt
src/config/site.ts
```

You can update:

- Restaurant name
- Tagline
- Description
- Logo and favicon paths
- WhatsApp number
- Phone, email, and address
- Social media links
- Delivery fee
- Minimum order settings
- Default theme
- Feature flags

## Updating Menu Data

All restaurant content is stored in:

```txt
src/data/menu.ts
```

This file controls:

- Categories
- Products
- Product variants
- Add-ons
- Offers
- Branches
- FAQs
- Testimonials

Each product supports multiple variants, add-ons, rating, preparation time, image, category, and featured status.

## WhatsApp Ordering Flow

The app does not require a backend to complete an order. Checkout generates a formatted WhatsApp message containing:

- Customer name and phone
- Delivery or pickup method
- Address or branch
- Scheduled time
- Cart items
- Variants
- Add-ons
- Notes
- Coupon
- Subtotal, discount, delivery fee, and total

The WhatsApp message logic is located in:

```txt
src/lib/whatsapp.ts
```

Update the WhatsApp number in:

```ts
contact: {
  whatsapp: "01148618451"
}
```

## Smart Upsell System

FLAVRE includes a reusable rule-based upsell system. It suggests related dishes in the product page and cart, such as drinks, starters, desserts, or complementary meals.

Upsell rules are defined in:

```txt
src/lib/upsell.ts
```

The reusable UI component is:

```txt
src/components/menu/upsell-section.tsx
```

This keeps business logic separate from presentation and makes the feature easy to expand later.

## Theme System

Theme tokens are defined in:

```txt
src/config/themes.ts
```

Supported themes:

- Gold
- Neon
- Dark
- Ruby
- Green
- Blue
- Purple
- Red

The selected theme is persisted through Zustand and applied globally by:

```txt
src/components/ui/theme-hydrator.tsx
```

## Feature Flags

Feature flags are available in `src/config/site.ts`:

```ts
features: {
  offers: true,
  coupons: true,
  delivery: true,
  pickup: true,
  animations: true,
  themes: true,
  testimonials: true,
  faq: true
}
```

This makes the template flexible for different restaurant use cases.

## UI and Motion Design

The interface uses motion intentionally:

- Page transitions between routes
- Animated global navigation loader
- Product card reveal and hover interactions
- Animated category and sort pills
- Modal entrance and exit transitions
- Live price animation during customization
- Cart item add and remove animations
- Order progress animation after checkout

Animations are lightweight and mostly rely on opacity, transform, and layout transitions to keep performance high.

## Performance Notes

- No heavy background videos.
- Cinematic atmosphere is created with CSS gradients, noise, and lightweight animations.
- Product images use Next.js `Image`.
- Reusable components keep UI logic organized.
- Reduced motion preferences are respected in global CSS and motion components.

## Backend Status

This project is frontend-only by design.

It does not include:

- Authentication
- Database
- REST or GraphQL API
- Payment gateway
- Admin dashboard

The final order is sent through WhatsApp using a generated `wa.me` link.

## Why This Project Matters

FLAVRE demonstrates the ability to build more than a static restaurant website. It shows product thinking, interaction design, reusable component architecture, clean state management, and a polished customer journey from discovery to checkout.

It is suitable for:

- Frontend portfolio presentation
- Restaurant landing and ordering template
- UI/UX case study
- Next.js App Router demonstration
- Premium brand experience prototype
