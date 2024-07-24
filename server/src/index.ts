const express = require("express"); // IMPORT EXPRESS - Express is a super easy backend framework for NodeJS
const authRoute = require("./routes/auth.route"); // IMPORT USER AUTH ROUTE

const app = express();
const cors = require("cors");

// * SETUP DB
const connectToDatabase = require("./config/database");
connectToDatabase();

// * MIDDLEWARES
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
); // ? This lines for CORS error.

// ? App need the below lines for POST and PUT proccess. We don't need body-parser anymore with this 2 lines.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * AUTHENTICATION ROUTE
app.use("/v1/auth/", authRoute);

// * ROUTES

// GET PORT number from config/keys.ts
const keys = require("./config/keys");
const { port } = keys;

// * LISTENING PORT
app.listen(port, () => {
    console.log(`Port is running on ${port}`); // PORT IS RUNNING ON 8000 OR 8080 IN LOCAL
});
