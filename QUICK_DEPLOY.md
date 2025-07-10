# Quick Deployment Guide

## Step 1: Push Code to GitHub

Since we're in WSL, you'll need to authenticate with GitHub. Run these commands in your terminal:

```bash
# Navigate to your project directory
cd "/mnt/c/Users/Hanrong Huang/OneDrive - UNSW/Desktop/py_microgrid_webpage"

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

**Alternative: Use GitHub Desktop or VS Code**
- Open the folder in VS Code
- Use the built-in Git integration to push to GitHub
- Or use GitHub Desktop to sync the repository

## Step 2: Enable GitHub Pages

1. **Go to your repository**: https://github.com/Hanrong-Huang/py_microgrid_webpage
2. **Click on Settings** (tab at the top)
3. **Scroll down to Pages** (in the left sidebar)
4. **Under Source**: 
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch (this will be created automatically by GitHub Actions)
   - Click "Save"

## Step 3: Wait for Deployment

The GitHub Actions workflow will automatically:
1. Build the website
2. Optimize all files (minify CSS/JS)
3. Deploy to the `gh-pages` branch
4. Make it live at: **https://hanrong-huang.github.io/py_microgrid_webpage**

## Step 4: Access Your Website

Your website will be available at:
**🌐 https://hanrong-huang.github.io/py_microgrid_webpage**

## Troubleshooting

If you encounter issues:

1. **Authentication Error**: 
   - Use GitHub Desktop or VS Code Git integration
   - Or set up SSH keys for command line access

2. **GitHub Pages Not Working**:
   - Check the Actions tab for build errors
   - Make sure the `gh-pages` branch is selected in Settings

3. **Files Not Updating**:
   - Clear your browser cache
   - Wait 5-10 minutes for GitHub Pages to update

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file to the root directory with your domain
2. Configure DNS records with your domain provider
3. Update GitHub Pages settings with your custom domain

---

**🚀 Your website is ready for deployment!**

Once you push to GitHub and enable Pages, your professional Py-Microgrid website will be live and accessible to anyone with the link.