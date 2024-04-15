const express = require("express")
const multer = require("multer")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/news")
const multerStorage = require("../util/multerStorage")

const router = express.Router();

router
	.route('/')
	.get(controller.getAll) // this is for getting all news
	.post(isAuthenticated, isAdmin, multer({ storage: multerStorage.newsStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.create)

router
	.route('/latest')
	.get(controller.getLatest);

router
	.route('/:id')
	.put(isAuthenticated, isAdmin, multer({ storage: multerStorage.newsStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.edit) // this is for admin editing news
	.delete(isAuthenticated, isAdmin, controller.delete) // this is for admin deleting news

module.exports = router;