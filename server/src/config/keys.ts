/**
 * @desc This file is used to define the config keys.
 */

require("dotenv").config(); // IMPORT .env file.

module.exports = {
    app: {
        name: "DACOSPACE API",
    },
    port: process.env.PORT || 8080, // If .env file has PORT number use it, otherwise use 8080.
    database: {
        url: process.env.MONGO_URI, // GET mongo uri from .env file.
    },
};
