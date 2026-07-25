# YABI Location

Static website for YABI Location, a Belgian commercial van rental business.

## Pages

- `index.html` - French homepage
- `contact.html` - French contact and quote page
- `en.html` - English homepage
- `contact-en.html` - English contact and quote page

The live site is designed for Cloudflare Pages. The quote forms currently post to the development Convex backend:

```text
https://kindhearted-caiman-242.eu-west-1.convex.site/api/quotes
```

## Local Checks

```bash
npm run check
node --check script.js
```

## Deploy

```bash
npx wrangler pages deploy . --project-name yabi-location --branch main
```
