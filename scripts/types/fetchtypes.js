process.env.NODE_ENV = process.env.NODE_ENV || "development";
const federatedConfig = require("../../modulefederation.config.js");
const { fetchTypes } = require("@kamstrup/federated-framework");

fetchTypes(federatedConfig.remotes, process.env.FETCH_TYPES_DOMAIN);
