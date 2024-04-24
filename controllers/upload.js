const model = require("../models/upload");
const path = require("path")
const fs = require("fs")

exports.getAll = async (req, res, next) => {
	try {
		const uploads = await model.find().populate("uploaderUser", '-password').lean();

		return res.status(200).json([...uploads])
	} catch (e) {
		next(e)
	}
}

exports.getUserUploads = async (req, res, next) => {
	try {
		const userId = req.params.id || req.user._id
		const { id } = await model.getUserUploadsValidation({...req.params, id: userId}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const userUploads = await model.find({uploaderUser: id});

		return res.status(200).json([...userUploads])
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		// const finalFile = req.files.file
		// const examplePages = req.files.examplePages
		// console.log({finalFile, examplePages});
		// const file = Boolean(req.file?.filename) ? req.file.filename : undefined;
		// console.log(req.body, file);
		// const validatedFields = await model.createValidation({...req.body, file}).catch(err => {
		// 	err.statusCode = 400
		// 	throw err
		// })

		// const createdDoc = await model.create({...validatedFields})

		return res.status(201).json({message: "با موفقیت اضافه شد"})
	} catch (e) {
		next(e)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const { id } = await model.deleteValidation({...req.params});

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({message: "همچین فایلی یافت نشد"})
		}

		if (targetDoc.uploaderUser.equals(req.user._id) || req.user.role === 'ADMIN') {
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
		} else {
			return res.status(401).json({message: "you are not authorized to delete this item"})
		}

		return res.status(201).json({message: "با موفقیت حذف شد"})
	} catch (e) {
		next(e)
	}
}