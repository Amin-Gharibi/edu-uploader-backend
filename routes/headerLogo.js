const express = require("express")
const multer = require("multer")

const isAuthenticated = require("../middlewares/isAuth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/headerLogo")
const multerStorage = require("../util/multerStorage")

const router = express.Router();

router
	.route('/')
	.get(controller.get)
	.post(isAuthenticated, isAdmin, multer({ storage: multerStorage.logoStorage, limits: { fileSize: 1000000000 } }).single("logo"), controller.create);

module.exports = router;