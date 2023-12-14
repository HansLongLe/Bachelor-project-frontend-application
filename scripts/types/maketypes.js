const federatedConfig = require("../../modulefederation.config.js");
const { makeTypes } = require("@kamstrup/federated-framework");

makeTypes(federatedConfig.name, federatedConfig.exposes);
