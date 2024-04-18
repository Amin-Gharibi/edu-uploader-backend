const express = require("express")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/focusedSubject")

const router = express.Router();

router
	.route('/')
	.get(controller.getAll) // this is for getting all news
	.post(isAuthenticated, isAdmin, controller.create)

router
	.route('/:id')
	.put(isAuthenticated, isAdmin, controller.edit) // this is for admin editing news
	.delete(isAuthenticated, isAdmin, controller.delete) // this is for admin deleting news

module.exports = router;