const express = require("express")
const multer = require("multer")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/headerBanner")
const multerStorage = require("../util/multerStorage")

const router = express.Router();

router
	.route('/')
	.get(controller.getAll) // this is for getting all headerBanners
	.post(isAuthenticated, isAdmin, multer({ storage: multerStorage.headerBannersStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.create)

router
	.route('/:id')
	.get(isAuthenticated, isAdmin, controller.getOne)
	.put(isAuthenticated, isAdmin, multer({ storage: multerStorage.headerBannersStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.edit) // this is for admin editing header banners
	.delete(isAuthenticated, isAdmin, controller.delete) // this is for admin deleting headerBanners

module.exports = router;