import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetIcons } from "unocss";
import presetWind from "@unocss/preset-wind";
import transformerDirective from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [transformerDirective()],
      presets: [presetWind(), presetIcons()],
    }),
  ],
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
    },
  },
});
