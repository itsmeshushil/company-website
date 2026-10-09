# Lotus Media Website — Deployment & Handover Guide

**Client:** Lotus Media (The Advertising Company)  
**Location:** Pokhara, Gandaki Province, Nepal  
**Official Contacts:**
- **Phone / WhatsApp:** `+977 9856083105`
- **Email:** `lotusmedia.nepal@gmail.com`
- **Instagram:** `https://www.instagram.com/lotusmedia.nepal/`
- **Facebook:** `https://www.facebook.com/lotusmedia.nepal/`

---

## 1. Brand Identity System & Design Tokens

The Lotus Media website is built strictly from the authentic brand assets:

| Token | Hex Code | RGB | Brand Application |
|---|---|---|---|
| `--brand-green` | `#00944C` | `0, 148, 76` | Official "LOTUS MEDIA" logotype, primary buttons, active indicators |
| `--brand-rose` | `#ED2E62` | `237, 46, 98` | Official Lotus petal & play mark, secondary CTAs, attention accents |
| `--brand-dark` | `#121212` | `18, 18, 18` | Official "The Advertising Company" tagline, high-contrast dark sections, footer |
| `--bg-primary` | `#FFFFFF` | `255, 255, 255` | Clean canvas surfaces, content readability |
| `--bg-secondary`| `#F8F9FA` | `248, 249, 250`| Section alternation background |

### Typography System

- **Headings & Display:** `Space Grotesk` (Weights: `600`, `700`) — Bold, modern, creative, distinctive agency editorial aesthetic.
- **Body & Paragraphs:** `Inter` (Weights: `400`, `500`) — Exceptional digital screen readability, high x-height, optimized tracking (`-0.011em`).
- **Navigation & CTAs:** `Inter` (Weights: `600`, `700`) — Crisp, authoritative buttons and interactive navigation labels with positive letter spacing (`0.015em`).
- **Tags & Badges:** `Inter` (Weight: `700`) — Uppercase with expanded tracking (`0.1em`).

---

## 2. Project Structure

```text
Lotus Website/
├── index.html                   # Complete modern agency homepage
├── 404.html                     # Branded 404 error page
├── sitemap.xml                  # XML sitemap for Google Search Console
├── robots.txt                   # Search engine crawling rules
├── contact.php                  # cPanel / PHP form processor with spam protection
├── DEPLOYMENT.md                # Deployment and maintenance guide
├── css/
│   ├── style.css                # Master design tokens & responsive components
│   └── animations.css           # Scroll reveals, infinite marquee, reduced-motion rules
├── js/
│   └── main.js                  # Sticky header, portfolio filters, lightbox, form handler
└── assets/
    ├── brand/
    │   ├── lotus-media-logo.png          # Official transparent logo for light backgrounds
    │   ├── lotus-media-logo-darkmode.png # Official logo variant for dark backgrounds
    │   ├── favicon.svg                   # Scalable vector favicon
    │   └── hero-studio.jpg               # Cinematic studio hero visual
    └── portfolio/
        ├── brand-identity.jpg            # Graphic design & branding case
        ├── motion-graphics.jpg           # 3D motion graphics suite
        ├── video-production.jpg          # Commercial cinema production
        ├── digital-marketing.jpg         # Viral campaign performance
        ├── ai-automation.jpg             # AI lead engine & workflow
        ├── reel-cafe.jpg                 # 9:16 vertical cafe reel
        └── reel-adventure.jpg            # 9:16 vertical adventure reel
```

---

## 3. How to Deploy to cPanel (Shared Hosting / VPS in Nepal)

cPanel is the standard hosting environment in Nepal:

1. **Log in to cPanel** (`yourdomain.com/cpanel` or via your hosting provider).
2. Open **File Manager** and navigate to your web root (`public_html` or subdomain folder).
3. Select all files and folders in this project directory:
   - `index.html`
   - `404.html`
   - `sitemap.xml`
   - `robots.txt`
   - `contact.php`
   - `css/`
   - `js/`
   - `assets/`
4. Zip them together and upload to `public_html`, then click **Extract**.
5. Ensure file permissions are standard:
   - Directories: `755`
   - Files: `644`
6. Verify form delivery:
   - When a visitor submits the contact form, `contact.php` will route the email directly to `lotusmedia.nepal@gmail.com`.
   - If your cPanel host requires SMTP authentication rather than standard `mail()`, you can configure PHPMailer or cPanel's default Webmail routing in `contact.php`.

---

## 4. How to Update Portfolio Projects in the Future

Each portfolio project in `index.html` is represented by an article tag with data attributes:

```html
<div class="portfolio-item" data-category="video" data-project 
     data-title="Your New Project Title" 
     data-category-label="Commercial Video" 
     data-desc="Description of the project deliverables..."
     data-thumb="assets/portfolio/your-new-image.jpg" 
     data-type="image"> <!-- or data-type="video" data-src="assets/portfolio/your-video.mp4" -->
  ...
</div>
```

- To add a new vertical Instagram reel: Use `class="portfolio-item vertical-reel category-reel"` with `data-category="video"`.
- To attach a real video to the lightbox popup: Set `data-type="video"` and `data-src="url-or-path-to-video.mp4"`.

---

## 5. SEO & Social Meta Configuration

- The website includes Schema.org `ProfessionalService` JSON-LD structured data.
- Meta tags for Open Graph (Facebook/Instagram) and Twitter Cards are configured in `index.html`.
- Submit `https://yourdomain.com/sitemap.xml` to Google Search Console for instant indexing.
