# Deployment Instructions

## GitHub Pages Deployment

### Quick Setup

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub called 'py-microgrid-website'
   # Then push your local code:
   git remote add origin https://github.com/YOUR_USERNAME/py-microgrid-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Choose **gh-pages** branch
   - Click **Save**

3. **Automatic Deployment**
   - The GitHub Actions workflow will automatically build and deploy your site
   - Every push to the `main` branch will trigger a new deployment
   - Your site will be available at: `https://YOUR_USERNAME.github.io/py-microgrid-website`

### Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the site
npm install
npm run build

# Deploy to gh-pages branch
git checkout -b gh-pages
git add dist/
git commit -m "Deploy website"
git subtree push --prefix dist origin gh-pages
```

## Custom Domain Setup (Optional)

1. **Purchase a Domain**
   - Buy a domain from any registrar (e.g., Namecheap, GoDaddy)

2. **Configure DNS**
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     
     Type: A
     Name: @
     Value: 185.199.109.153
     
     Type: A
     Name: @
     Value: 185.199.110.153
     
     Type: A
     Name: @
     Value: 185.199.111.153
     
     Type: CNAME
     Name: www
     Value: YOUR_USERNAME.github.io
     ```

3. **Configure GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Enter your custom domain in the **Custom domain** field
   - Check **Enforce HTTPS**

## Alternative Hosting Platforms

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click **New site from Git**
   - Choose your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Custom Domain**
   - Go to **Domain management**
   - Add your custom domain
   - Follow DNS configuration instructions

### Vercel

1. **Deploy from GitHub**
   - Go to [Vercel](https://vercel.com)
   - Click **New Project**
   - Import your repository

2. **Build Configuration**
   - Framework: **Other**
   - Build command: `npm run build`
   - Output directory: `dist`

## Environment Variables

For production deployment, you may want to set these environment variables:

```bash
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# API Keys (if needed)
NREL_API_KEY=your_nrel_api_key
```

## SSL Certificate

All modern hosting platforms provide free SSL certificates:
- **GitHub Pages**: Automatic with custom domains
- **Netlify**: Automatic with Let's Encrypt
- **Vercel**: Automatic with custom domains

## Performance Optimization

The website is already optimized for production:
- ✅ Minified CSS and JavaScript
- ✅ Optimized images
- ✅ Gzip compression
- ✅ CDN delivery
- ✅ Mobile responsive
- ✅ SEO optimized

## Monitoring

### Google Analytics

Add your Google Analytics ID to the HTML head:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring

Consider using services like:
- **Uptime Robot** (free)
- **Pingdom** (paid)
- **StatusCake** (freemium)

## Troubleshooting

### Common Issues

1. **404 Error on GitHub Pages**
   - Check if the `gh-pages` branch exists
   - Verify the branch is set as the source in Settings

2. **CSS/JS Not Loading**
   - Ensure file paths are relative (not absolute)
   - Check for case sensitivity issues

3. **Build Failing**
   - Check the Actions tab for error logs
   - Verify all dependencies are listed in package.json

### Support

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the build logs in the Actions tab
3. Open an issue in the repository

## Security

- ✅ HTTPS enforced
- ✅ No sensitive data in client-side code
- ✅ Content Security Policy headers
- ✅ Regular dependency updates

Your website is now ready for production deployment! 🚀