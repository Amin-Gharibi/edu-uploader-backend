const model = require("../models/user");
const uploadsModel = require("../models/upload")
const bcrypt = require("bcrypt");

exports.getAll = async (req, res, next) => {
	try {
		const users = await model.find({}, '-password').populate('focusedSubject').lean();

		return res.status(200).json([...users])
	} catch (e) {
		next(e)
	}
}

exports.adminEditingUsers = async (req, res, next) => {
	try {
		const validatedFields = await model.editUserValidation({...req.body, ...req.params})
		let {id, ...updatingFields} = validatedFields

		updatingFields.password = updatingFields.password ? await bcrypt.hash(updatingFields.password, 12) : undefined;

		await model.findByIdAndUpdate(id, {...updatingFields}).catch(err => {
			err.statusCode = 500
			throw err
		})

		return res.status(201).json({message: "کاربر با موفقیت ادیت شد"})
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const { id } = await model.deleteUserValidation({...req.params});

		await model.findByIdAndDelete(id).catch(err => {
			err.statusCode = 500
			throw err
		})

		return res.status(201).json({message: "کاربر با موفقیت حذف شد"})
	} catch (e) {
		next(e)
	}
}

exports.getUserRelatedUploads = async (req, res, next) => {
	try {
		let uploads = undefined
		if (req.user.role === 'ADMIN') {
			uploads = await uploadsModel.find().populate('focusedSubject')
		} else if (req.user.role === 'SUPERVISOR') {
			uploads = await uploadsModel.find({focusedSubject: req.user.focusedSubject}).populate('focusedSubject')
		}

		return res.status(200).json([...uploads])
	} catch (e) {
		next(e)
	}
}