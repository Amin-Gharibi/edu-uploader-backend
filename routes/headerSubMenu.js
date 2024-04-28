const express = require("express")

const isAuthenticated = require("../middlewares/isAuth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/headerSubMenu")

const router = express.Router();

router
	.route('/')
	.get(isAuthenticated, isAdmin, controller.getAll)
	.post(isAuthenticated, isAdmin, controller.create)

router
	.route('/:id')
	.delete(isAuthenticated, isAdmin, controller.delete)
	.put(isAuthenticated, isAdmin, controller.edit)

module.exports = router;