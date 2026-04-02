# D-Blanks Domain Migration Checklist

## ✅ Files Modified

### 1. `src/app/layout.tsx`
- ✅ Updated `metadataBase` to `https://dblanks.site`
- ✅ Added Twitter card metadata
- ✅ Added GoogleBot specific crawl directives
- ✅ Added publisher field
- ✅ Configured OG image path

### 2. `src/app/sitemap.ts`
- ✅ Updated baseUrl to use `NEXT_PUBLIC_BASE_URL`
- ✅ Fallback changed to `https://dblanks.site`

### 3. `src/app/robots.ts`
- ✅ Updated baseUrl to use `NEXT_PUBLIC_BASE_URL`
- ✅ Added GPTBot disallow (prevents AI training crawling)
- ✅ Added `/admin/login` and `/test/` to disallow

### 4. `src/app/(public)/courses/[slug]/page.tsx`
- ✅ Updated baseUrl in JSON-LD schema

### 5. `next.config.js`
- ✅ Added security headers
- ✅ Added cache headers for static assets
- ✅ Added redirect template for old domain (commented, enable if needed)

### 6. `.env.example`
- ✅ Added production URL comments

---

## 📋 Production Deployment Checklist

### 1. Environment Variables (.env.local)

```bash
# For production deployment
NEXT_PUBLIC_BASE_URL=https://dblanks.site
NEXTAUTH_URL=https://dblanks.site
```

### 2. Create OG Image

Create `public/og-image.png` (1200x630px) with:
- D-Blanks branding
- Gaming/vocational training imagery
- Text: "D-Blanks - Gaming & Vocational Training"

**Tools**: Use Canva, Figma, or Photoshop

### 3. Domain DNS Configuration

Ensure these DNS records are set:
```
A record: @ → your_server_ip
CNAME: www → dblanks.site
```

### 4. SSL Certificate

- Enable HTTPS (auto-renewal recommended)
- Enable HTTP/2 for performance

### 5. Hostinger/Vercel Deployment

**If deploying to Vercel:**
```bash
# Set environment variables in Vercel Dashboard
NEXT_PUBLIC_BASE_URL=https://dblanks.site
NEXTAUTH_URL=https://dblanks.site
```

---

## 🔍 SEO Verification Checklist

### Core Web Vitals Targets

| Metric | Target | Action |
|--------|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Optimize images, use Next.js Image, enable caching |
| **INP** (Interaction to Next Paint) | < 200ms | Minimize JS, code splitting, lazy load components |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Reserve image dimensions, font-display: swap |

### E-E-A-T Signals to Add

| Signal | Where to Add |
|--------|--------------|
| **Author Bio** | Create `/src/app/authors/page.tsx` with founder bios |
| **Company Info** | Footer or `/about` page with full address, registration |
| **Contact Details** | Visible phone, email, physical address |
| **Reviews/Testimonials** | Schema markup for reviews |
| **Certifications** | Display vocational training certifications |

### Structured Data to Add

```typescript
// Add to layout.tsx or page components

// Organization Schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "D-Blanks",
  "url": "https://dblanks.site",
  "logo": "https://dblanks.site/favicon.jpeg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "customer service"
  }
}

// LocalBusiness Schema (for Google Maps)
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D-Blanks",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  }
}
```

---

## 🔒 Security Checklist

### Already Implemented
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ robots.txt blocks GPTBot
- ✅ Admin routes blocked from indexing
- ✅ API routes blocked from indexing

### Additional Security (Recommended)

```typescript
// Add to next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        // ... existing headers ...
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
        },
      ],
    },
  ];
}
```

---

## 📱 Social Sharing Verification

### LinkedIn
- OG image: 1200x630px ✅
- Title: Max 60 chars
- Description: Max 155 chars

### Twitter
- Twitter card: summary_large_image ✅
- Image: Min 300x157px, max 4096x4096px
- Alt text on images recommended

### WhatsApp
- Uses OG metadata
- Image: Min 200x200px recommended

---

## 🚀 Old Domain Redirect (If Applicable)

If `dblanks.in` existed, enable the redirect in `next.config.js`:

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'dblanks.in' }],
      destination: 'https://dblanks.site/:path*',
      permanent: true, // 301 redirect for SEO
    },
  ];
},
```

---

## 📊 Post-Deployment Verification

1. **Google Search Console**
   - Add property for `https://dblanks.site`
   - Submit sitemap: `https://dblanks.site/sitemap.xml`
   - Check for crawl errors

2. **Bing Webmaster**
   - Add property for `https://dblanks.site`
   - Submit sitemap

3. **Core Web Vitals Report**
   - Use PageSpeed Insights
   - Check Mobile and Desktop separately

4. **Social Debuggers**
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

5. **Structured Data Testing**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Schema Markup Validator

---

## 📝 Notes

- The `NEXT_PUBLIC_BASE_URL` env variable is the single source of truth
- All metadata, sitemap, and robots.txt use this variable
- Ensure `.env.local` has the production URL before deployment
- Run `npm run build` and test locally before deploying
