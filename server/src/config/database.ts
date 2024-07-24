/**
 * @desc This file is used to define the database connection.
 */

import mongoose from "mongoose"; // IMPORT Mongoose

const keys = require("../config/keys"); // Get keys from config
const { database } = keys; // GET database uri in config/keys

const connectToDatabase = async () => {
    try {
        await mongoose
            .connect(database.url) // Trying connect to database
            .then(() => {
                console.log("MongoDB Database connected!"); // If database is connected show success log in the terminal.
            })
            .catch((error) => {
                console.log(error); // If database is not connected show error log in the terminal.
            });
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = connectToDatabase; // Export connectToDatabase function
