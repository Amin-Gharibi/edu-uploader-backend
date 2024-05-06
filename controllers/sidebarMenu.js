const model = require("../models/sidebarManu");

exports.getAll = async (req, res, next) => {
	try {
		const sidebarMenus = await model.find().lean();


		return res.status(200).json([...sidebarMenus])
	} catch (e) {
		next(e)
	}
}

exports.getOne = async (req, res, next) => {
	try {
		const {id} = await model.getOneValidation({...req.params}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const targetDoc = await model.findById(id)
		if (!targetDoc) {
			return res.status(404).json({message: "لینک سریع مورد نظر یافت نشد"})
		}

		return res.status(200).json({message: "واکشی موفقیت آمیز", sidebarMenu: targetDoc})
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

		return res.status(201).json({message: "با موفقیت اضافه شد", sidebarLink: createdDoc})
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
			return res.status(404).json({message: "همچین فایلی یافت نشد"})
		}

		await model.findByIdAndDelete(id)

		return res.status(201).json({message: "با موفقیت حذف شد"})
	} catch (e) {
		next(e)
	}
}