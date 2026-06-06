const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite web uses WebAssembly — tell Metro to treat .wasm as an asset
config.resolver.assetExts.push('wasm');

// Inject SharedArrayBuffer-enabling headers in the Metro dev server
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      middleware(req, res, next);
    };
  },
};

module.exports = config;
