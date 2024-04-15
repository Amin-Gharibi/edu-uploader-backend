const express = require("express")

const isAuthenticated = require("../middlewares/isAuth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/headerMenu")

const router = express.Router();

router
	.route('/')
	.get(controller.getAll)
	.post(isAuthenticated, isAdmin, controller.create)

router
	.route('/:id')
	.delete(isAuthenticated, isAdmin, controller.delete)
	.put(isAuthenticated, isAdmin, controller.edit)

module.exports = router;