const express = require("express")

const isAdmin = require("middlewares/isAdmin")
const isAuthenticated = require("middlewares/isAuth")
const controller = require("controllers/user")

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
	.get(isAuthenticated) // will add the controller... this is for user viewing his uploads

router
	.route('/uploads/:id')
	.get(isAuthenticated, isAdmin) // will add the controller... this is for admin viewing who has uploaded what

router
	.route('/role')
	.put(isAuthenticated, isAdmin, controller.changeRole) // this is for admin changing users role


module.exports = router;