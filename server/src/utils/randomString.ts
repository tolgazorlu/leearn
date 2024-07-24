/**
 * @desc This file is used to generate a random string.
 */

const randomString = (length: number) => {
    return require("crypto").randomBytes(length).toString("hex");
};

module.exports = { randomString };
