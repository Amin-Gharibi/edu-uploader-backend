const model = require("../models/news");
const path = require("path")
const fs = require("fs")

exports.getAll = async (req, res, next) => {
	try {
		const news = await model.find().populate('writer').lean();

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

exports.get15 = async (req, res, next) => {
	try {
		const { startingIndex } = await model.get15Validation(req.params).catch(err => {
			err.statusCode = 400
			throw err
		})

		const targetDocs = await model.find().sort('-updatedAt').skip(startingIndex).limit(15);

		return res.status(200).json([...targetDocs])
	} catch (e) {
		next(e)
	}
}

exports.getOne = async (req, res, next) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: "ایدی خبر پاس داده نشده" })
		}

		const targetNews = await model.findById(id).populate('writer', '-password')
		if (!targetNews) {
			return res.status(404).json({ message: "همچین خبری یافت نشد" })
		}

		return res.status(200).json(targetNews)
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const cover = Boolean(req.file?.filename) ? req.file.filename : undefined;
		const validatedFields = await model.createValidation({ ...req.body, cover }).catch(err => {
			err.statusCode = 400
			throw err
		})

		let createdDoc = await model.create({ ...validatedFields, writer: req.user._id });
		createdDoc = await createdDoc.populate('writer');

		return res.status(201).json({ message: "با موفقیت اضافه شد", news: createdDoc })
	} catch (e) {
		next(e)
	}
}

exports.edit = async (req, res, next) => {
	try {
		const cover = Boolean(req.file?.filename) ? req.file.filename : undefined;
		const validatedFields = await model.createValidation({ ...req.body, ...req.params, cover }).catch(err => {
			err.statusCode = 400
			throw err
		})

		const { id, ...body } = validatedFields

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({ message: "document not found" })
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

		const updatedDoc = await model.findByIdAndUpdate(id, { ...body, writer: req.user._id }, { new: true });

		return res.status(201).json({ message: "با موفقیت آپدیت شد", updatedDoc })
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const { id } = await model.deleteValidation({ ...req.params });

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({ message: "همچین فایلی یافت نشد" })
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

		return res.status(201).json({ message: "با موفقیت حذف شد" })
	} catch (e) {
		next(e)
	}
}