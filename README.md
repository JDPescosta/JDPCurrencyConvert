# Currency Converter

A small TypeScript currency conversion application using React. Enjoy! :)

## Development

```bash
npm install
npm run dev
```

## Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages. The deployment workflow triggers on every push to the main branch.

### Environment Variables

The following environment variables need to be set in your GitHub repository secrets:

1. Go to your repository settings → Secrets and variables → Actions
2. Add the following repository secrets:

- `VITE_COUNTRY_BASE_URL`: Base URL for the country API
- `VITE_EXCHANGE_BASE_URL`: Base URL for the exchange rate API
- `VITE_EXCHANGE_API_KEY`: Your exchange rate API key
