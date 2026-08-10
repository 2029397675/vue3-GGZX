import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// mock插件
import { viteMockServe } from 'vite-plugin-mock'

// svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),

      command === 'serve' &&
        viteMockServe({
          mockPath: 'mock',
          watchFiles: true
        })
    ],

    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址
          target: env.VITE_SERVE,
          //是否跨域
          changeOrigin: true,
          //重写路径
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
