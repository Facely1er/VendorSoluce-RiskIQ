# VendorIQ Pro - Deployment Guide

Complete guide for deploying VendorIQ Pro React application to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Test application locally (`npm run dev`)
- [ ] Run production build (`npm run build`)
- [ ] Test production build (`npm run preview`)
- [ ] Check for console errors
- [ ] Verify all features work correctly
- [ ] Test on multiple browsers
- [ ] Test responsive design on mobile
- [ ] Review environment variables
- [ ] Update version number in package.json
- [ ] Create backup of current data

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Free tier available
- Excellent performance
- Built-in CI/CD

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd react-vendoriq
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? vendoriq-pro
   - Directory? ./
   - Override build command? No
   - Override output directory? No

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

---

### Option 2: Netlify (Great Alternative)

**Why Netlify?**
- Simple deployment
- Free tier with custom domains
- Form handling
- Serverless functions support

**Method A: Using Netlify CLI**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   cd react-vendoriq
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Method B: Using Netlify Drop**

1. Build your project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop your `dist` folder
4. Done!

**Method C: GitHub Integration**

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/vendoriq-pro",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```js
   export default defineConfig({
     base: '/vendoriq-pro/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings
   - Pages section
   - Source: gh-pages branch

---

### Option 4: AWS S3 + CloudFront

**Why AWS?**
- Enterprise-grade
- Global CDN
- Scalable
- Full control

**Steps:**

1. **Build project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create bucket (e.g., vendoriq-pro)
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html`

3. **Configure Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::vendoriq-pro/*"
       }
     ]
   }
   ```

4. **Upload Files**
   ```bash
   aws s3 sync dist/ s3://vendoriq-pro --delete
   ```

5. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Default Root Object: `index.html`
   - Error Pages: Custom 404 → `/index.html` (200 response)

6. **Get CloudFront URL**
   - Use the distribution domain name
   - Or add custom domain via Route 53

---

### Option 5: Docker Container

**Why Docker?**
- Consistent environment
- Easy to deploy anywhere
- Portable

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

**Build and Run:**
```bash
docker build -t vendoriq-pro .
docker run -p 8080:80 vendoriq-pro
```

**Deploy to Docker Hub:**
```bash
docker tag vendoriq-pro username/vendoriq-pro:latest
docker push username/vendoriq-pro:latest
```

---

### Option 6: Traditional Web Hosting

**For shared hosting (cPanel, Plesk, etc.):**

1. **Build project**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload contents of `dist/` folder to public_html
   - Or specific subdirectory

3. **Configure .htaccess** (for Apache)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Configure nginx** (if available)
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

---

## 🔧 Build Configuration

### Optimizing Build

**vite.config.js:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.logs
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
})
```

---

## 🌐 Custom Domain Setup

### Vercel
```bash
vercel domains add yourdomain.com
```
Add DNS records as instructed by Vercel

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records

### CloudFront
1. Request SSL certificate in ACM
2. Add CNAME in CloudFront distribution
3. Update Route 53 or DNS provider

---

## 🔐 Environment Variables

### Production Environment Variables

**.env.production:**
```env
VITE_APP_TITLE=VendorIQ Pro
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

### Setting Variables by Platform

**Vercel:**
```bash
vercel env add VITE_API_URL production
```

**Netlify:**
```bash
netlify env:set VITE_API_URL "https://api.yourdomain.com"
```

**GitHub Pages:**
- Use GitHub Secrets
- Add to workflow file

---

## 📊 Performance Optimization

### 1. Enable Compression

**Netlify** (netlify.toml):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

**Vercel** (vercel.json):
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Enable CDN

Most platforms (Vercel, Netlify, CloudFront) include CDN by default.

### 3. Image Optimization

- Use WebP format
- Compress images
- Lazy load images

### 4. Code Splitting

Already configured in Vite - creates separate chunks automatically.

---

## 🔍 Monitoring & Analytics

### Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry Error Tracking

```bash
npm install @sentry/react
```

---

## 🧪 Testing Deployment

### Pre-deployment Tests

```bash
# Build
npm run build

# Test build locally
npm run preview

# Open http://localhost:4173
```

### Post-deployment Tests

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit properly
- [ ] Charts display correctly
- [ ] Data persists (LocalStorage)
- [ ] Theme toggle works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] No console errors

---

## 🔄 Continuous Deployment

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🆘 Troubleshooting

### Issue: Blank page after deployment

**Solution:**
- Check base path in vite.config.js
- Verify routing configuration
- Check browser console for errors

### Issue: 404 on refresh

**Solution:**
- Configure server for SPA routing
- Add .htaccess or nginx config
- Use hash router as fallback

### Issue: Assets not loading

**Solution:**
- Check base URL configuration
- Verify asset paths
- Check CORS settings

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Contact platform support
- Open GitHub issue

---

**Last Updated:** November 2025
**Version:** 2.0.0
