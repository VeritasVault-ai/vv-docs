import type { Plugin } from '@docusaurus/types';
import path from 'path';

export default function esbuildPlugin(): Plugin {
  return {
    name: 'esbuild-plugin',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('esbuild-loader'),
                  options: {
                    loader: 'tsx', // Handle both JSX and TSX
                    target: isServer ? 'node12' : 'es2017',
                    jsx: 'automatic', // Enable automatic JSX runtime
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
}