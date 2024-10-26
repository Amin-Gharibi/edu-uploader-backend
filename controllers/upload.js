const model = require("../models/upload");
const path = require("path")
const fs = require("fs")

exports.getAll = async (req, res, next) => {
	try {
		const uploads = await model.find().populate('focusedSubject').lean();

		return res.status(200).json([...uploads])
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const file = req.files.file[0].filename
		const examplePages = []
		req.files?.examplePages?.forEach(page => {
			examplePages.push(page.filename)
		});

		const validatedFields = await model.createValidation({ ...req.body, file, examplePages }).catch(err => {
			err.statusCode = 400
			throw err
		})

		const createdDoc = await model.create({ ...validatedFields })

		return res.status(201).json({ message: "با موفقیت اضافه شد", createdDoc })
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const { id } = await model.deleteValidation({ ...req.params });

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({ message: "همچین پروژه ای یافت نشد" })
		}


		const filePath = path.join(
			__dirname,
			"..",
			"public",
			"uploadedFiles",
			targetDoc.file
		);

		fs.unlink(filePath, async (err) => {
			if (err) {
				console.log(err);
			}
		});

		await model.findByIdAndDelete(id)


		return res.status(201).json({ message: "با موفقیت حذف شد" })
	} catch (e) {
		next(e)
	}
}