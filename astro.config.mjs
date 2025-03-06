import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // customize default plugin options
                inlineStyles: {
                  onlyMatchedOnce: false
                },
                // or disable plugins
                removeDoctype: false
              }
            }
          }
        ]
      }
    }),
    tailwind({
      applyBaseStyles: false
    }),
    vue({
      include: ['src/**/*.vue'],
      script: {
        refSugar: true
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('x-')
        }
      }
    })
  ],
  compressHTML: false,
  build: {
    assets: 'assets'
  },
  server: {
    open: '/sitemap'
  },
  vite: {
    build: {
      minify: true,
      emptyOutDir: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/scripts.js',
          assetFileNames: (assetInfo) => {
            return assetInfo.name === 'index.css'
              ? 'assets/style.css'
              : `assets/${assetInfo.name}`
          },
          manualChunks: (id) => {
            if (id.includes('node_modules/swiper')) {
              return 'swiper'
            }

            if (id.includes('node_modules')) {
              return 'vendor'
            }

            return null
          }
        }
      }
    },
    plugins: [sassGlobImports()],
    css: {
      devSourcemap: true,
      transformer: 'postcss'
    }
  }
})
