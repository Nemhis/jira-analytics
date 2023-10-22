import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import vuetify from 'vite-plugin-vuetify';

const DEFAULT_PORT = 8080;

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    server: {
      host: env.DEV_DOMAIN,
      port: env.DEV_PORT || DEFAULT_PORT,
    },
    plugins: [vue(), vuetify({ autoImport: true, styles: { configFile: 'src/settings.scss' } }), stylelint(), eslint()],
    resolve: {
      alias: [
        {
          find: /^@\/(.+)/,
          replacement: path.resolve(path.resolve(__dirname), 'src') + '/$1',
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    optimizeDeps: {
      include: ['lodash-es/cloneDeep'],
    },
  });
};
