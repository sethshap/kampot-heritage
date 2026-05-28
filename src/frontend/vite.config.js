import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { VitePWA } from "vite-plugin-pwa";

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "icons/icon-192.svg", "icons/icon-512.svg"],
      manifest: {
        name: "Kampot Heritage Impact Network",
        short_name: "KH Soap",
        description:
          "Cambodian social enterprise selling artisanal liquid soap. Every bottle supports champions rebuilding their lives.",
        theme_color: "#2d5a27",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        lang: "en",
        icons: [
          {
            src: "/icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "/favicon.ico",
            sizes: "64x64",
            type: "image/x-icon",
          },
        ],
        categories: ["shopping", "lifestyle", "business"],
        orientation: "portrait-primary",
      },
      workbox: {
        // Precache all critical static assets on SW install
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,ico,woff,woff2,ttf,eot}"],
        // Ensure stale caches are cleaned up and new SW takes control immediately
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // Network-first for ICP canister API calls (order/app data)
          {
            urlPattern: /\/api\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
              networkTimeoutSeconds: 10,
            },
          },
          // Network-first for canister calls (ICP-specific pattern)
          {
            urlPattern: /canister/,
            handler: "NetworkFirst",
            options: {
              cacheName: "canister-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
              networkTimeoutSeconds: 10,
            },
          },
          // Cache-first for fonts from any origin (1 year)
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
              expiration: { maxEntries: 30, maxAgeSeconds: 31536000 },
            },
          },
          // Cache-first for JS/CSS assets (30 days) — supplements precaching
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 2592000 },
            },
          },
          // Cache-first for all image types (30 days)
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 30 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
    // Custom plugin: compress PNG/JPG/JPEG/WebP images at build time using sharp
    {
      name: "vite-plugin-sharp-compress",
      enforce: "post",
      apply: "build",
      async generateBundle(_options, bundle) {
        let sharp;
        try {
          sharp = (await import("sharp")).default;
        } catch {
          // sharp not available — skip compression
          return;
        }
        const imageRe = /\.(png|jpe?g|webp)$/i;
        for (const [fileName, asset] of Object.entries(bundle)) {
          if (asset.type !== "asset" || !imageRe.test(fileName)) continue;
          const src = asset.source instanceof Uint8Array
            ? Buffer.from(asset.source)
            : Buffer.from(asset.source);
          let compressed;
          if (/\.png$/i.test(fileName)) {
            compressed = await sharp(src).png({ quality: 80, compressionLevel: 9 }).toBuffer();
          } else if (/\.webp$/i.test(fileName)) {
            compressed = await sharp(src).webp({ quality: 80 }).toBuffer();
          } else {
            compressed = await sharp(src).jpeg({ quality: 80, progressive: true }).toBuffer();
          }
          asset.source = new Uint8Array(compressed);
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"]
  },
});
