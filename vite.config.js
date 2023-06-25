import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

function removeDataTestid (node) {
  if (node.type === 1 /* NodeTypes.ELEMENT */) {
    node.props = node.props.filter(prop => prop.type === 6 ? prop.name !== 'data-testid' : true)
  }
}

const prod = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls,
        compilerOptions: {
          nodeTransforms: prod ? [removeDataTestid] : [],
        }
      }
    }),
    quasar(),
    VueI18nPlugin()
  ],
  build: {
    sourcemap: true
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
