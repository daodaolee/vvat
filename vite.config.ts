import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');

export default defineConfig({
  plugins: [vue()],
  alias: {
    '/@': path.resolve(__dirname, 'src')
  },
  css:{
    // vite 有关css的配置
    preprocessorOptions:{
      scss:{
        additionalData: `@import "./src/assets/css/common.scss";`
      },
      // antdv 配置
      less:{
        modifyVars: {
          // 'primary-color': '#FE5F23',
          // 'link-color': '#1890FFFF',
          // 'info-color': '#1890FFFF'
          hack: `true; @import "./src/assets/css/antdv.modify.less";`,
        },
        javascriptEnabled: true
      }
    }
  }
})
