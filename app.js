const path = require("path");
const express = require("express");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

//*routes import
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const app = express();

//* BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* CORS Policy Definitions
app.use(setHeaders);

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));



//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//* Error Controller
app.use((req, res) => {
	console.log("this path is not available:", req.path);
	res.status(404).json({ message: "404 OOPS! PATH NOT FOUND" });
});
app.use(errorHandler);

module.exports = app;
