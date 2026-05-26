# Pickup Point Selector

Interactive pickup point selector built with Next.js, React, TypeScript and Leaflet using the Delivery Gateway public GraphQL API.

## Features

- Interactive map with marker clustering
- Pickup point search by city or address
- Detailed pickup point info panel
- Pickup point selection state handling
- Loading and error states
- Internationalization (EN/HU)
- Docker support

## Tech Stack

- Next.js App Router
- React + TypeScript
- TanStack Query
- Zustand
- Leaflet + React Leaflet
- next-intl
- Docker

## Requirements

- Node.js v24.13.0
- pnpm v11.1.3

```bash
nvm use
```

## Getting Started

### Local development

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open:

```txt
http://localhost:3000
```

### Production build

```bash
pnpm build
pnpm start
```

### Docker

```bash
docker compose --env-file .env.local up --build
```

## Environment Variables

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=
NEXT_PUBLIC_MERCHANT_ID=
NEXT_PUBLIC_SESSION_ID=
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=
```

## Notes

- Marker clustering is used to handle large datasets efficiently.
- Initial dataset size is intentionally limited for performance reasons.
- The interactive map and pickup point fetching are client-side rendered because Leaflet depends on browser APIs.
- A separate side info panel was introduced for better UX and readability instead of displaying detailed opening hours inside map popups.

## Future Improvements

- Debounced geocoding search
- Viewport-based pickup point loading
- URL-persisted selected pickup point
- Lazy loading markers by zoom level
