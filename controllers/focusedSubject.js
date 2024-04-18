const model = require("../models/focusedSubject");

exports.getAll = async (req, res, next) => {
	try {
		const focusedSubjects = await model.find().lean();

		return res.status(200).json({focusedSubjects})
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const validatedDate = await model.createFocusedSubjectValidation(req.body).catch(err => {
			err.statusCode = 400
			throw err
		})

		const createdFocusedSubject = await model.create({...validatedDate})

		return res.status(201).json({message: "محور با موفقیت ایجاد شد", item: createdFocusedSubject})
	} catch (e) {
		next(e)
	}
}

exports.edit = async (req, res, next) => {
	try {
		const {id, title} = await model.editFocusedSubjectValidation({...req.body, ...req.params}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const updatedFocusedSubject = await model.findByIdAndUpdate(id, {title}, {new: true})

		return res.status(201).json({message: "محور با موفقیت ویرایش شد", item: updatedFocusedSubject})
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const {id} = await model.deleteFocusedSubjectValidation({...req.body, ...req.params}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const deletedFocusedSubject = await model.findByIdAndDelete(id)

		return res.status(201).json({message: "محور با موفقیت حذف شد", item: deletedFocusedSubject})
	} catch (e) {
		next(e)
	}
}