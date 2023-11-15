module.exports = {
  babel: {
    plugins: [ 'macros' ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      /* ... */
      return babelLoaderOptions;
    },
  },
  'fontawesome-svg-core': {
    'license': 'free'
  }
};