# MediNitor — Medical Technology & Diagnostics

A responsive, self-contained B2B medical equipment website starter for **GitHub Pages**. No Node.js, build commands, API keys or paid hosting required.

## Before you publish

This is a **starter/demo**, not a representation of existing inventory, registered products, regulatory approvals, manufacturer affiliations, or authorized distributor contracts. The site accurately labels the catalog as a *planned sourcing portfolio* and the named Chinese manufacturers as *independent research references*. It should only claim authorization **after obtaining valid written appointment(s)** that cover the brands, products and Bangladesh territory.

1. Confirm your legal business name, trademark and legal entity status before publishing corporate assertions.
2. Edit `config.js` and add your **verified, owned business email address**. Without one, the inquiry form offers to **copy inquiry text**. With one, clicking submit launches the visitor's email app, prefilled with inquiry details. A backend is not involved.
3. Customize the portfolio in `data.js` and copy in `index.html`. Remove categories you do not intend to market.
4. Replace illustrations with licensed manufacturer media or your own photos **only after obtaining appropriate usage permission**. This template includes original generic SVG artwork only, not brand logos.
5. Verify company registrations, import authorization and applicable Bangladesh medical-device/IVD product registration and import requirements before representing products as available.
6. Replace draft wording and update your legal contact information once established. Do not publish a fabricated address, customer count, testimonial, brand authorization or certification.
7. Consider adding a privacy notice and a real form service before handling website inquiries at scale. Avoid collecting patient information or medical records through the form.

## Fastest publishing method (no terminal)

1. Sign in to [GitHub](https://github.com), click **New repository**. Example: `medinitor-website`. A public repository is suitable for GitHub Pages on GitHub Free.
2. **Extract the ZIP** locally. Upload the *contents of the `medinitor-website` folder* (not the ZIP file and not an extra wrapping folder) using **Add file → Upload files**. Keep `index.html`, `styles.css`, `config.js`, `data.js`, `app.js`, and the `assets/` folder in the repository root.
3. Open repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/(root)**, then Save.
4. Wait for Pages deployment and open: `https://YOUR-USERNAME.github.io/medinitor-website/`. The project repository name determines the URL.
5. You can instead name the repository **`YOUR-USERNAME.github.io`** for `https://YOUR-USERNAME.github.io/`.
6. For a custom domain such as `www.YOUR-DOMAIN.com`, first purchase/control it, then configure it in **Settings → Pages → Custom domain**, and create the DNS CNAME following the official GitHub Docs. Enforce HTTPS when available.

Official GitHub docs:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Editing the website

| File | Purpose |
| --- | --- |
| `index.html` | Page content, manufacturer references, site metadata |
| `styles.css` | Colors, fonts, design system, responsive layout |
| `data.js` | Product department names, descriptions, examples |
| `config.js` | Public official contact email |
| `app.js` | Search, filters, mobile navigation, inquiry handling |
| `assets/favicon.svg` | Website favicon |
| `assets/og-preview.svg` | Social preview image starter |
| `.nojekyll` | Publish unchanged static files with GitHub Pages |

### Contact form behavior

Because GitHub Pages is static, the form **does not send data to a server**. It only generates an email via `mailto:` if `contactEmail` is set, or copies an inquiry using the browser's clipboard otherwise. Some visitors do not have a configured email app, so for a production lead-generation workflow use a properly configured hosted form/email backend with spam protection and a privacy policy. Never commit passwords or other secrets into public site files.

### Custom domain

Do **not** assume `medinitor.com` is available or owned. Search domain availability and trademark conflicts first. Customize DNS only after registering the domain.

## Verified research references (independent, not partners)

- Mindray: https://www.mindray.com/en/products-solutions
- Wondfo: https://en.wondfo.com/solutions/
- Snibe: https://www.snibe.com/en/
- EDAN: https://www.edan.com/
- DIRUI: https://en.dirui.com.cn/product?type=product_instrument_en
- Sansure: https://en.sansure.com/products-and-solutions/
- BIOBASE: https://www.biobase.com/

## Regulatory check before commercial launch (Bangladesh)

- DGDA medical-device registration guidance: https://dgda.gov.bd/
- CCI&E import registration: https://olm.ccie.gov.bd/
- Bangladesh Customs: https://bangladeshcustoms.gov.bd/

Medical-device and in-vitro diagnostic requirements vary by product and risk category. Confirm them with DGDA and a qualified Bangladesh import/regulatory professional for each product.

## Design / technical notes

- Semantic HTML, responsive CSS, keyboard-friendly navigation, reduced-motion support, accessible input labels, form validation and simple SEO metadata.
- Uses Google Fonts as an optional enhancement; system fonts work offline. No third-party code execution dependencies.
- Manufacturer names are plain-text references with links to official sites, not logos or partnership claims.

© MediNitor website starter. Original template code and custom vector illustration provided for adaptation to your business. Third-party names belong to their respective owners.
