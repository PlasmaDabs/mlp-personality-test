# Deploying to GitHub Pages

## Setup Instructions

1. **Push your code to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   \`\`\`

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - The workflow will automatically deploy on every push to main

3. **Update basePath (if using custom repository name)**
   - If your repo is at `https://github.com/username/mlp-quiz`
   - And will be served at `https://username.github.io/mlp-quiz/`
   - Update `next.config.mjs`:
     \`\`\`js
     basePath: process.env.NODE_ENV === 'production' ? '/mlp-quiz' : '',
     \`\`\`

4. **Your site will be live at:**
   - User site: `https://YOUR-USERNAME.github.io/`
   - Project site: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Local Development

Run locally with:
\`\`\`bash
npm install
npm run dev
\`\`\`

## Build and Test Locally

Test the production build:
\`\`\`bash
npm run build
npx serve@latest out
