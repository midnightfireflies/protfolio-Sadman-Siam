# Md. Sadman Siam — Hugo Portfolio

A custom Hugo portfolio built as an original hybrid of two design ideas:

- **Hugo Coder:** minimal developer identity, restrained typography, profile-first presentation, theme switching.
- **Hugo Introduction:** full-page opening, smooth single-page flow, section-based storytelling, project-focused portfolio structure.

No third-party theme code is bundled. This project is intentionally standalone so you do **not** need to clone a theme, install npm packages, or run PostCSS.

## Run it on your Mac

Your preferred location:

```bash
cd "/Volumes/Mac Disk/Programming/HTML"
```

Extract this project there, then:

```bash
cd sadman-siam-fusion-portfolio
hugo server -D
```

Open:

```text
http://localhost:1313/
```

The project is designed for Hugo 0.166.x and does not depend on deprecated `languageCode` configuration.

## Main files

```text
sadman-siam-fusion-portfolio/
├── hugo.toml
├── data/
│   └── portfolio.toml       # Most portfolio text and lists live here
├── layouts/
│   ├── index.html           # Single-page home experience
│   ├── 404.html
│   ├── _default/
│   │   ├── baseof.html
│   │   └── single.html
│   └── partials/
│       ├── head.html
│       ├── nav.html
│       └── footer.html
├── assets/
│   ├── css/main.css
│   └── js/main.js
├── content/
│   ├── about.md
│   ├── projects.md
│   ├── experience.md
│   ├── achievements.md
│   └── contact.md
└── static/
    ├── images/avatar.jpg
    ├── files/Sadman-Siam-CV.pdf
    ├── files/Sadman-Siam-CV.docx
    └── favicon.svg
```

## Edit your information

For most text, projects, skills, education, certifications, learning tracks, and experience, edit:

```text
data/portfolio.toml
```

For email, LinkedIn, GitHub, CV paths, location, and SEO metadata, edit:

```text
hugo.toml
```

## Replace your photo

Replace:

```text
static/images/avatar.jpg
```

Keep the filename the same, or update the path in `layouts/index.html` and `layouts/partials/head.html`.

## Replace your CV

Replace either or both:

```text
static/files/Sadman-Siam-CV.pdf
static/files/Sadman-Siam-CV.docx
```

## Before deployment

Change this in `hugo.toml`:

```toml
baseURL = "https://example.com/"
```

to your final GitHub Pages, Netlify, Cloudflare Pages, or custom-domain URL.

## Contact form

The contact form intentionally has no fake backend. When submitted, it opens the visitor's email client with the form fields pre-filled.

## GitHub projects

The home page requests your latest public repositories from the GitHub REST API in the browser. If the API is unavailable, the site gracefully falls back to a link to your GitHub profile.

## v3 interface refinements

- Skill tags are now consistent rounded rectangles with centered labels.
- Hero social links use explicit high-contrast chips instead of blend-mode text.
- Project cards use a tighter gallery layout.
- The Projects section includes an off-canvas project navigator. Use “Browse project index” or the side tab while the section is visible; the drawer slides in from the right and supports Escape/backdrop close.
