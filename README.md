# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (GitHub Pages)

This project is configured to deploy automatically to GitHub Pages from the `main` branch via a workflow in `.github/workflows/deploy.yml`.

### Project URL

It will be served at:

```
https://<org-or-username>.github.io/mvp_6/
```

### Key Settings

- `vite.config.js` sets `base: '/mvp_6/'` so assets resolve correctly under the project path.
- `BrowserRouter` in `App.jsx` uses `basename="/mvp_6"`.
- A `404.html` (copy of `index.html`) is generated during the workflow so client-side routes work on refresh.

### Custom Domain

If you add a custom domain in the repository Pages settings:

1. Create DNS records pointing your domain to GitHub Pages (A records for apex or CNAME for subdomain).
2. After the domain is verified and HTTPS is issued, you may (optionally) remove the subpath configuration:
   - Remove `base` from `vite.config.js`.
   - Remove the `basename` prop in `App.jsx`'s `BrowserRouter`.
3. Re-deploy (`git push`) to produce root-relative asset paths.

### Local Deploy Test

```
npm ci
npm run build
npx serve dist
```

Then visit `http://localhost:3000/mvp_6/` (adjust if using different static server) to mimic the subpath.

### Force Redeploy

Make any commit to `main` (even `docs: trigger deploy`) and push. The workflow rebuilds and publishes automatically.

### Notes

If you later convert this to a user/org root site (`<org>.github.io` repo), remove the `base` and `basename` settings and update links.
