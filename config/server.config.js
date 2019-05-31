const url = require("url");
const { url: apiUrl } = require("./api.config");

module.exports = {
  dev: process.env.NODE_ENV !== "production",
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPort: parseInt(process.env.API_PORT, 10) || this.port + 1,
  apiRoot: process.env.API_ROOT || url.parse(apiUrl).pathname
};
