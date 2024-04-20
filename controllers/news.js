const model = require("../models/news");
const path = require("path")
const fs = require("fs")

exports.getAll = async (req, res, next) => {
	try {
		const news = await model.find().lean();

		return res.status(200).json([...news])
	} catch (e) {
		next(e)
	}
}

exports.getLatest = async (req, res, next) => {
	try {
		const latestNews = await model.find().lean().sort('-updatedAt').limit(5);

		return res.status(200).json([...latestNews])
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const cover = Boolean(req.file?.filename) ? req.file.filename : undefined;
		const validatedFields = await model.createValidation({...req.body, cover}).catch(err => {
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
		const cover = Boolean(req.file?.filename) ? req.file.filename : undefined;
		const validatedFields = await model.createValidation({...req.body, ...req.params, cover}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const {id, ...body} = validatedFields

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({message: "document not found"})
		}

		if (targetDoc.cover !== cover) {
			const filePath = path.join(
				__dirname,
				"..",
				"public",
				"news",
				targetDoc.cover
			);

			fs.unlink(filePath, async (err) => {
				if (err) {
					console.log(err);
				}
			});
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

		const filePath = path.join(
			__dirname,
			"..",
			"public",
			"news",
			targetDoc.cover
		);

		fs.unlink(filePath, async (err) => {
			if (err) {
				console.log(err);
			}
		});

		await model.findByIdAndDelete(id)

		return res.status(201).json({message: "با موفقیت حذف شد"})
	} catch (e) {
		next(e)
	}
}