const express = require("express")
const multer = require("multer")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/upload")
const multerStorage = require("../util/multerStorage")

const router = express.Router();

router
	.route('/')
	.get(isAuthenticated, isAdmin, controller.getAll) // this is for getting all uploads
	.post(isAuthenticated, multer({ storage: multerStorage.uploadedFileStorage, limits: { fileSize: 1000000000 } }).single("file"), controller.create)

router
	.route('/:id')
	.delete(isAuthenticated, controller.delete) // this is for user deleting his uploaded docs and admin deleting everyone's uploads

module.exports = router;