import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Crazy Word",
        short_name: "CrazyWord",
        description: "Crazy Word - a game made in Vue",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Assuming you might want a larger PWA icon
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "ms-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
