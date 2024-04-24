const model = require("../models/focusedSubject");

exports.getAll = async (req, res, next) => {
	try {
		const focusedSubjects = await model.find().lean();

		return res.status(200).json({focusedSubjects})
	} catch (e) {
		next(e)
	}
}

exports.getOne = async (req, res, next) => {
	try {
		const enTitle = req.params.id
		if (!enTitle) {
			return res.status(400).json({message: "پاس دادن نام انگلیسی محور الزامی است"})
		}

		const targetDoc = await model.find({enTitle})
		if (!targetDoc.length) {
			return res.status(404).json({message: "همچین محوری یافت نشد"})
		}

		return res.status(200).json(...targetDoc)
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const validatedData = await model.createFocusedSubjectValidation(req.body).catch(err => {
			err.statusCode = 400
			throw err
		})

		const isDuplicate = await model.find({enTitle: validatedData.enTitle})
		if (isDuplicate.length) {
			return res.status(400).json({message: "محوری با این نام انگلیسی از قبل وجود دارد"})
		}

		const createdFocusedSubject = await model.create({...validatedData})

		return res.status(201).json({message: "محور با موفقیت ایجاد شد", item: createdFocusedSubject})
	} catch (e) {
		next(e)
	}
}

exports.edit = async (req, res, next) => {
	try {
		const {id, title, enTitle} = await model.editFocusedSubjectValidation({...req.body, ...req.params}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const targetDoc = await model.findById(id)
		if (!targetDoc) {
			return res.status(404).json({message: "همچین محوری یافت نشد"})
		}
		if (targetDoc?.enTitle !== enTitle) {
			const isDuplicate = await model.find({enTitle})
			if (isDuplicate.length) {
				return res.status(400).json({message: "محوری با این نام انگلیسی از قبل وجود دارد"})
			}
		}

		const updatedFocusedSubject = await model.findByIdAndUpdate(id, {title, enTitle}, {new: true})

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