# Meeksha Agro Trading Company — Website

React (Vite) single-page website for Meeksha Agro Trading Company, Narasapura, Kolar.

## 1. Run locally

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## 2. Add your product images

1. Create a folder `public/products/`
2. Drop images in it, e.g. `public/products/msol-ks.png`
3. In `src/data/products.js`, set the product's `image` field:

```js
image: 'products/msol-ks.png',
```

(No leading slash — this keeps paths working on GitHub Pages.)

Tip: export bottle images from your catalogue PDF, resize to ~800px wide,
and compress at https://squoosh.app before adding. Keeps the site fast.

## 3. Deploy to GitHub Pages

One-time setup:

```bash
# create a repo named meeksha-agro on github.com first, then:
git init
git add .
git commit -m "Meeksha Agro website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/meeksha-agro.git
git push -u origin main
```

Deploy (every time you change something):

```bash
npm run deploy
```

Then on GitHub: **Settings → Pages → Source: Deploy from branch → `gh-pages` branch → Save.**
Site goes live at `https://<YOUR-USERNAME>.github.io/meeksha-agro/`

> If you rename the repo, update `base` in `vite.config.js` to match.

## 4. Custom domain (e.g. meekshaagro.com)

1. Buy the domain (GoDaddy / Hostinger / Cloudflare — ₹700–1000/yr for .com, .in often cheaper).
2. In the domain's DNS settings add:
   - `A` records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` record for `www` → `<YOUR-USERNAME>.github.io`
3. GitHub repo → Settings → Pages → Custom domain → enter `www.meekshaagro.com` → tick **Enforce HTTPS**.
4. Change `base: '/meeksha-agro/'` to `base: '/'` in `vite.config.js`, then run `npm run deploy` again.
5. Create `public/CNAME` containing exactly one line: `www.meekshaagro.com` (so the domain survives redeploys).

## 5. Editing content

| What | Where |
|---|---|
| Products, categories, dosages | `src/data/products.js` |
| Phone, email, address, license | `COMPANY` object in `src/data/products.js` |
| Colors, fonts | CSS variables at the top of `src/styles.css` |
| Sections / layout | `src/App.jsx` |
