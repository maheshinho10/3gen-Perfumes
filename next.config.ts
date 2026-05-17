import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export (required for GitHub Pages)
  basePath: isProd ? "/3gen-Perfumes" : "",   // Must match your GitHub repo name exactly
  assetPrefix: isProd ? "/3gen-Perfumes/" : "",
  images: {
    unoptimized: true,       // GitHub Pages cannot run Next.js image optimization
  },
};

export default nextConfig;
