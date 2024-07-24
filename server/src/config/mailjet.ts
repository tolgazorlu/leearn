require("dotenv").config(); // IMPORT .env file.
const Mailjet = require("node-mailjet"); // IMPORT Mailjet

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
); // CONNECT Mailjet

export default mailjet; // EXPORT Mailjet
