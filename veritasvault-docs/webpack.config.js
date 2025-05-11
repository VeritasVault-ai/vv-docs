module.exports = function(context, options) {
  return {
    name: 'disable-webpack-cache',
    configureWebpack(config, isServer) {
      // Disable webpack cache completely
      return {
        cache: false
      };
    }
  };
};