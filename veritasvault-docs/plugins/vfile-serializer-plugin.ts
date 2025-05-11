import type { Plugin } from '@docusaurus/types';
import path from 'path';

// This plugin adds a custom serializer for VFileMessage objects
export default function vfileSerializerPlugin(): Plugin {
  return {
    name: 'vfile-serializer-plugin',
    configureWebpack(config, isServer) {
      // Add a custom serializer for VFileMessage
      if (!config.node) {
        config.node = {};
      }
      
      return {
        // Disable webpack cache to avoid serialization issues
        cache: {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename],
          },
          cacheDirectory: path.resolve(__dirname, '../.webpack-cache'),
          // This is the important part - we need to serialize VFileMessage objects
          serializer: {
            // Custom serializer function
            serialize: (data) => {
              // Convert VFileMessage objects to plain objects
              const replacer = (key, value) => {
                if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'VFileMessage') {
                  return {
                    message: value.message || '',
                    reason: value.reason || '',
                    line: value.line || null,
                    column: value.column || null,
                    source: value.source || null,
                    ruleId: value.ruleId || null,
                    position: value.position || null,
                    // Add any other properties you need
                  };
                }
                return value;
              };
              
              return JSON.stringify(data, replacer);
            },
            // Custom deserializer function
            deserialize: (data) => {
              return JSON.parse(data);
            },
          },
        },
      };
    },
  };
}