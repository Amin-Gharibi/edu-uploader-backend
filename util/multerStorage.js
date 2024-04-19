const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

module.exports.uploadedFileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'uploadedFiles'));
	},
	filename: (req, file, cb) => {
		const sha256 = crypto.createHash('SHA256');
		const hashedFileName = sha256.update(file.originalname).digest('hex');
		cb(null, hashedFileName + path.extname(file.originalname));
	},
})

module.exports.headerBannersStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'headerBanners'));
	},
	filename: (req, file, cb) => {
		const sha256 = crypto.createHash('SHA256');
		const hashedFileName = sha256.update(file.originalname).digest('hex');
		cb(null, hashedFileName + path.extname(file.originalname));
	},
})

module.exports.newsStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'news'));
	},
	filename: (req, file, cb) => {
		const sha256 = crypto.createHash('SHA256');
		const hashedFileName = sha256.update(file.originalname).digest('hex');
		cb(null, hashedFileName + path.extname(file.originalname));
	},
})

module.exports.logoStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'logo'));
	},
	filename: (req, file, cb) => {
		const sha256 = crypto.createHash('SHA256');
		const hashedFileName = sha256.update(file.originalname).digest('hex');
		cb(null, hashedFileName + path.extname(file.originalname));
	},
})