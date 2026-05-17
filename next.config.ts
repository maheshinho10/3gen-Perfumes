import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/3gen-Perfumes" : "";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export (required for GitHub Pages)
  basePath,                  // Must match your GitHub repo name exactly
  assetPrefix: isProd ? "/3gen-Perfumes/" : "",
  images: {
    unoptimized: true,       // GitHub Pages cannot run Next.js image optimization
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,  // Expose to client so assetPath() works
  },
};

export default nextConfig;
