const express = require("express")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/user")
const uploadControllers = require("../controllers/upload")
const isAdminOrSupervisor = require("../middlewares/isAdminOrSupervisor")

const router = express.Router();

router
	.route('/')
	.get(isAuthenticated, isAdmin, controller.getAll) // this is for getting all users

router
	.route('/:id')
	.put(isAuthenticated, isAdmin, controller.adminEditingUsers) // this is for editing user
	.delete(isAuthenticated, isAdmin, controller.delete) // this is for removing user from db

router
	.route('/uploads')
	.get(isAuthenticated, isAdminOrSupervisor, controller.getUserRelatedUploads)


module.exports = router;