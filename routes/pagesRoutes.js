const express = require('express');
const paths = require("../util/static");

const router = express.Router()

router
	.route('/')
	.get((req, res) => {
		res.sendFile(paths.index);
	})

router
	.route('/login')
	.get((req, res) => {
		res.sendFile(paths.login);
	})

router
	.route('/news')
	.get((req, res) => {
		res.sendFile(paths.news)
	})

router
	.route('/news/:id')
	.get((req, res) => {
		res.sendFile(paths.oneNews);
	})

router
	.route('/upload')
	.get((req, res) => {
		res.sendFile(paths.upload);
	})

router
	.route('/panel')
	.get((req, res) => {
		res.sendFile(paths.panel);
	})

module.exports = router;