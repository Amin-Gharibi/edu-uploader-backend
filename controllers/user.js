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

exports.getOneByAdmin = async (req, res, next) => {
	try {
		const userId = req.params.id
		if (!userId) {
			return res.status(401).json({message: "ایدی کاربر باید پاس داده شود"})
		}

		const targetUser = await model.findById(userId, '-password').populate('focusedSubject')

		return res.status(200).json({message: "واکشی کاربر موفقیت آمیز بود", user: targetUser})
	} catch (e) {
		next(e)
	}
}

exports.editUser = async (req, res, next) => {
	try {
		const validatedFields = await model.editUserValidation({...req.body, ...req.params})
		let {id, ...updatingFields} = validatedFields

		if (id && req.user.role !== 'ADMIN') {
			return res.status(401).json({message: "این عمل فقط برای ادمین ها در دسترس است"})
		}

		id = id || req.user._id;

		updatingFields.password = updatingFields.password ? await bcrypt.hash(updatingFields.password, 12) : undefined;

		const updatedUser = await model.findByIdAndUpdate(id, {...updatingFields}).catch(err => {
			err.statusCode = 500
			throw err
		})

		return res.status(201).json({message: "کاربر با موفقیت ویرایش شد", user: updatedUser })
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

exports.changePassword = async (req, res, next) => {
	try {
		const {currentPassword, newPassword} = await model.changePasswordValidation({...req.params, ...req.body})

		const id = req.user._id

		const targetUser = await model.findById(id);

		if (!targetUser) {
			return res.status(404).json({message: "کاربر یافت نشد"})
		}

		const isValid = await bcrypt.compare(currentPassword, targetUser.password)

		if (!isValid) {
			return res.status(400).json({message: "رمز عبور صحیح نیست"})
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 12)

		await model.findByIdAndUpdate(id, {
			password: hashedNewPassword
		})

		return res.status(200).json({message: "رمز عبور با موفقیت تغییر کرد"})
	} catch (e) {
		next(e)
	}
}