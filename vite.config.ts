// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import inject from '@rollup/plugin-inject';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  preview: {
    port: 3001,
  },
  plugins: [
    react(),
    tsconfigPaths({
      root: './',
    }),
    url(),
    svgr(),
  ],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     // define: {
  //     //   global: 'globalThis',
  //     // },
  //     plugins: [
  //       // NodeGlobalsPolyfillPlugin({
  //       //   process: true,
  //       //   buffer: true,
  //       // }),
  //       // NodeModulesPolyfillPlugin(),
  //     ],
  //   },
  // },
  resolve: {
    alias: {
      // process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      // Events: 'rollup-plugin-node-polyfills/polyfills/events',
      // Buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
  },
});
