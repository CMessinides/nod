module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(["API_URL"]));
    return config;
  }
};
