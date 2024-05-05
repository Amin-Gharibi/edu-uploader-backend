const express = require("express")

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/user")
const isAdminOrSupervisor = require("../middlewares/isAdminOrSupervisor")

const router = express.Router();

router
	.route('/')
	.get(isAuthenticated, isAdmin, controller.getAll) // this is for getting all users
	.put(isAuthenticated, controller.editUser); // this is for editing user

router
	.route('/uploads')
	.get(isAuthenticated, isAdminOrSupervisor, controller.getUserRelatedUploads);

router
	.route('/password')
	.put(isAuthenticated, controller.changePassword);

router
	.route('/:id')
	.get(isAuthenticated, isAdmin, controller.getOneByAdmin)
	.delete(isAuthenticated, isAdmin, controller.delete); // this is for removing user from db


module.exports = router;