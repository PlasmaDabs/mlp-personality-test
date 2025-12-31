/** @type {import('next').NextConfig} */
const nextConfig = {
  // <CHANGE> enable static export for GitHub Pages
  output: 'export',
  // <CHANGE> set base path for GitHub Pages (replace 'repo-name' with your repository name)
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
