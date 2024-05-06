const express = require("express")

const isAuthenticated = require("../middlewares/isAuth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/sidebarMenu")

const router = express.Router();

router
	.route('/')
	.get(controller.getAll)
	.post(isAuthenticated, isAdmin, controller.create)

router
	.route('/:id')
	.get(isAuthenticated, isAdmin, controller.getOne)
	.delete(isAuthenticated, isAdmin, controller.delete)
	.put(isAuthenticated, isAdmin, controller.edit)

module.exports = router;