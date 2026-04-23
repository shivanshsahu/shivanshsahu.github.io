# Shivansh — Portfolio Site

Static single-page portfolio. Vanilla HTML/CSS/JS with a Python build step that pre-renders markdown content into `index.html` at build time.

---

## Deploying to GitHub Pages (fastest path)

1. **Create a new GitHub repo.** Name it `shivansh-sahu.github.io` (a user-site repo — fastest; serves at `https://shivansh-sahu.github.io/`). Or any name — you just get a slightly longer URL.

2. **Push this folder to the repo:**
   ```bash
   cd portfolio_site
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable Pages.** Go to repo Settings → Pages → Source: "Deploy from a branch" → Branch: `main` → Folder: `/ (root)` → Save.

4. **Wait ~60 seconds.** GitHub shows the live URL at the top of the Pages settings page. Open it and verify.

---

## Rebuilding content

Content lives in `content/` as markdown files. To rebuild `index.html` after editing any of them:

```bash
cd portfolio_site
python3 build_site.py
```

The build:
- Converts markdown → HTML using the `markdown` Python library
- Wraps each `## Case Study N:` heading in a `.case-study-card` div with `id="case-N"`
- Wraps each `## Loss N:` heading in a `.case-study-card.loss-card` div with `id="loss-N"`
- Injects the result between the `<!-- BUILD:CONTENT_START -->` / `<!-- BUILD:CONTENT_END -->` sentinels in `index.html`
- Idempotent: safe to re-run.

First-time setup:
```bash
pip3 install --user markdown
```

---

## Case studies (dedicated pages)

Each case study has its own page at `cases/<slug>.html`:

| File | Title |
|---|---|
| `heating-catalog.html` | The Revenue the Dashboard Was Hiding |
| `streetwear-reviews.html` | 5,028 Reviews, One Real Problem |
| `lighting-specs.html` | The Survey Question Nobody Was Asking |
| `patriotic-pivot.html` | The Loss That Paid for the Program |
| `apparel-rebuild.html` | Three Pages, Three Wins, One Rebuild |
| `safety-funnel.html` | 36% Leaving Before They Started |
| `tea-sticky-atc.html` | When the ATC Follows the Buyer |
| `baby-checkout.html` | Why 88% of Mobile Traffic Was Leaving the Checkout |
| `unit-economics.html` | 158 More Orders, $17,899 Less Revenue |
| `device-fork.html` | Two Platforms, Two Answers |
| `iterative-pdp.html` | Three PDPs in Eight Weeks |

Send an employer a single case study: `https://<your-github-pages-url>/cases/heating-catalog.html`

## Standalone pages

| File | Purpose |
|---|---|
| `tools-skills.html` | Full tool stack with proficiency levels |
| `ai-automation.html` | AI workflows + CRO Engine blueprint |
| `capabilities/gokwik-postmessage.html` | GoKwik postMessage implementation (real code) |
| `capabilities/gtm-automation.html` | GTM bulk provisioning across 8 properties (real code) |

Losses are still inline on the main page via URL fragments: `#loss-1`, `#loss-2`, `#loss-3`.

## Adding a case study

1. Create `content/cases/<slug>.md` with YAML frontmatter (see any existing file for the fields).
2. Run `python3 build_site.py`.
3. Commit and push.

The build script auto-discovers any `.md` file in `content/cases/` and generates a page + adds a preview card to the main page in the order specified by the `order:` frontmatter field.

## Adding a testimonial

Testimonials render as cards in the "What People Say" section on the main page (no individual pages — they're short quotes).

1. Create `content/testimonials/<first-last>.md`:

```
---
name: Jane Doe
role: VP Growth
relationship: Client — 2024 engagement on checkout optimization
date: Apr 2026
order: 3
---

The actual quote text goes here as a single paragraph. Do not add a blank line inside the quote or it will render as two blockquotes.
```

2. Run `python3 build_site.py`. The new testimonial will appear in the grid, sorted by `order`.

3. Initials are auto-generated from the `name` field for the avatar circle.

**Where to source testimonials:**
- LinkedIn recommendations (most common — copy-paste the text verbatim)
- Email quotes from clients (ask permission to use first)
- Slack messages from teammates at prior roles (ask permission)

**Naming convention:** lowercase, dash-separated — `jane-doe.md`, not `JaneDoe.md`.

## Visual placeholders

Inside any case-study markdown, use this syntax to mark where a screenshot or diagram should go:

```
[VISUAL: Short description of what the image should show]
```

This renders as a styled "Visual Needed" callout box on the page, so the reader sees what would be there and what it would show. Replace later with `<img>` tags pointing at uploaded images.

---

## Structure

```
portfolio_site/
  index.html              # Built output — open this in a browser
  build_site.py           # Pre-renders markdown into index.html
  css/styles.css          # Full design system
  js/script.js            # Counters, scroll reveal, mobile nav, active-link highlighting
  .nojekyll               # Tells GitHub Pages to serve files as-is
  content/                # Markdown source for all long-form sections
    how_i_work.md
    sanitized_case_studies.md
    ops_and_pm_portfolio.md
    instrumentation_portfolio.md
```

---

## Previewing locally

```bash
cd portfolio_site
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Required because some browsers block `file://` URLs from loading the Google Fonts stylesheet.)
