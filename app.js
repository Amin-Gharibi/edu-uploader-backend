const path = require("path");
const fs = require("fs")
const express = require("express");
const bcrypt = require('bcrypt')
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");
const staticPaths = require("./util/static");
const usersModel = require("./models/user")

// create default admin user
const createDefaultUser = async () => {
	const users = await usersModel.find()
	if (!users.length) {
		const hashedPassword = await bcrypt.hash('Admin', 12)

		const user = {
			username: 'Admin',
			password: hashedPassword,
			firstName: 'ادمین',
			lastName: 'ادمین',
			areaName: 'میناب',
			provinceName: 'هرمزگان',
			role: 'ADMIN'
		}
		await usersModel.create({...user})
	}
}

createDefaultUser()


//*routes import
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const uploadRoutes = require("./routes/upload")
const headerBannerRoutes = require("./routes/headerBanner")
const headerMenuRoutes = require("./routes/headerMenu")
const headerSubMenuRoutes = require("./routes/headerSubMenu")
const newsRoutes = require("./routes/news")
const sidebarMenuRoutes = require("./routes/sidebarMenu")
const focusedSubjectRoutes = require("./routes/focusedSubject")
const headerLogoRoutes = require("./routes/headerLogo")
const pagesRoutes = require("./routes/pagesRoutes")

const app = express();

//* BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create dynamic-content container folder
const uploadDirectories = [path.join("public", 'uploadedFiles'), path.join("public", "headerBanners"), path.join("public", "news"), path.join("public", "logo")]
uploadDirectories.forEach(dir => {
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir, { recursive: true });
	}
})

//* CORS Policy Definitions
app.use(setHeaders);

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));


app.use("/", express.static(staticPaths.staticContent), pagesRoutes)
//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/headerBanner", headerBannerRoutes);
app.use("/api/headerMenu", headerMenuRoutes);
app.use("/api/headerSubMenu", headerSubMenuRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/sidebarMenu", sidebarMenuRoutes);
app.use("/api/focusedSubject", focusedSubjectRoutes);
app.use("/api/headerLogo", headerLogoRoutes);

//* Error Controller
app.use((req, res) => {
	console.log("this path is not available:", req.path);
	res.status(404).sendFile(staticPaths[404])
});
app.use(errorHandler);

module.exports = app;
