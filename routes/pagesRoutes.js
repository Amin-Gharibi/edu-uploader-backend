const express = require('express');
const paths = require("../util/static");
const newsModel = require("../models/news");
const focusedSubjectModel = require("../models/focusedSubject");

const router = express.Router()

router
	.route('/')
	.get((req, res) => {
		return res.sendFile(paths.index);
	})

router
	.route('/login')
	.get((req, res) => {
		return res.sendFile(paths.login);
	})

router
	.route('/news')
	.get((req, res) => {
		return res.sendFile(paths.news)
	})

router
	.route('/news/:id')
	.get(async (req, res) => {
		const isAvailable = await newsModel.findById(req.params._id)

		if (!isAvailable) {
			return res.status(404).sendFile(paths[404])
		}

		return res.sendFile(paths.oneNews);
	})

router
	.route('/upload/:focusedSubject')
	.get(async (req, res) => {
		const isAvailable = await focusedSubjectModel.findOne({enTitle: req.params.focusedSubject})
		
		if (!isAvailable) {
			return res.status(404).sendFile(paths[404])
		}

		return res.sendFile(paths.upload);
	})

router
	.route('/panel')
	.get((req, res) => {
		return res.sendFile(paths.panel);
	})

module.exports = router;