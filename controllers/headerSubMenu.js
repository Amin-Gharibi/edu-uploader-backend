const model = require("../models/headerSubMenu");

exports.getAll = async (req, res, next) => {
	try {
		const headerSubMenus = await model.find().lean()

		return res.status(200).json([...headerSubMenus])
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const validatedFields = await model.createValidation(req.body).catch(err => {
			err.statusCode = 400
			throw err
		})

		const createdDoc = await model.create(validatedFields);

		return res.status(201).json({message: "با موفقیت اضافه شد", createdDoc})
	} catch (e) {
		next(e)
	}
}

exports.edit = async (req, res, next) => {
	try {
		const validatedFields = await model.editValidation({...req.body, ...req.params}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const {id, ...body} = validatedFields

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({message: "document not found"})
		}

		const updatedDoc = await model.findByIdAndUpdate(id, {...body}, {new: true});

		return res.status(201).json({message: "با موفقیت آپدیت شد", updatedDoc})
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const {id} = await model.deleteValidation({...req.params});

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({message: "همچین زیر منویی یافت نشد"})
		}

		await model.findByIdAndDelete(id)

		return res.status(201).json({message: "با موفقیت حذف شد"})
	} catch (e) {
		next(e)
	}
}