/*
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-08 20:58:42
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-10 23:21:04
 * @FilePath: \map\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [vue()],
		root: process.cwd(),
		resolve: { alias },
		base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		hmr: true,
		optimizeDeps: {
			include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
		},
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: env.VITE_OPEN,
			proxy: {
				'/gitee': {
					target: 'https://gitee.com',
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/gitee/, ''),
				},
				'/api': {
					target: 'http://101.201.244.31:8808/',
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path,
				},
				'/geoserver': {
					target: 'http://101.201.244.31:8081', // GeoServer 地址
					changeOrigin: true,
					secure: false,
				},
				'/webgl-huodian': {
					target: 'http://127.0.0.1:8081', // GeoServer 地址
					changeOrigin: true,
					secure: false,
				},
				'/webgl-biandian': {
					target: 'http://127.0.0.1:8081', // GeoServer 地址
					changeOrigin: true,
					secure: false,
				},
				'/webgl-fengdian': {
					target: 'http://127.0.0.1:8081', // GeoServer 地址
					changeOrigin: true,
					secure: false,
				},
			},
		},
		build: {
			outDir: 'dist',
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					},
				},
			},
		},
		css: {
			preprocessorOptions: { css: { charset: false } },
		},
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
		},
	};
});

export default viteConfig;
