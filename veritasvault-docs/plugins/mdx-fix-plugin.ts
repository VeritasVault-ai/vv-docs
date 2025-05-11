import path from 'path';
import type { Plugin } from '@docusaurus/types';

export default function mdxFixPlugin(): Plugin {
  return {
    name: 'mdx-fix-plugin',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.mdx?$/,
              include: [path.resolve(__dirname, '../docs'), path.resolve(__dirname, '../blog')],
              use: [
                {
                  loader: require.resolve('@docusaurus/mdx-loader'),
                  options: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                    beforeDefaultRemarkPlugins: [],
                    beforeDefaultRehypePlugins: [],
                  },
                },
              ],
            },
          ],
        },
        resolve: {
          fallback: {
            fs: false,
            path: false,
          },
        },
      };
    },
  };
}