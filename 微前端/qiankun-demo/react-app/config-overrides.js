module.exports = {
    webpack: (config) => {
      config.output.libraryTarget = 'umd';
      return config;
    },
  };