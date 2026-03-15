# 🚀 Deploying FarmPal Demo to GitHub Pages

This project is built with zero dependencies (pure HTML/JS/CSS), making it perfect for free hosting on GitHub Pages.

## Step 1: Push your code to GitHub
If you haven't already, create a new repository on GitHub and push your local code:

```bash
git init
git add .
git commit -m "Prepare demo for hosting"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/farmpal.git
git push -u origin main
```

## Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.com.
2. Click on **Settings** (top tab).
3. Click on **Pages** (left sidebar).
4. Under **Build and deployment > Branch**, select `main` and `/ (root)`.
5. Click **Save**.

## Step 3: View your Demo!
GitHub will provide a URL (usually `https://YOUR_USERNAME.github.io/farmpal/`). It may take 1-2 minutes for the site to go live.

---

### 💡 Why this works for a Demo:
- **Relative Paths**: All assets (CSS/JS) use relative paths, so they work whether hosted at the root or in a subfolder.
- **Auto-Seeding**: The app automatically seeds demo data (Green Valley Farm) into LocalStorage on first load, so investors see a populated dashboard immediately.
- **Free Weather API**: Uses Open-Meteo, which requires no API keys or server-side proxy, allowing for a fully static deployment.
- **Offline Ready**: The app is designed to work offline once loaded, showcasing resilience for rural agricultural use.
