const model = require("../models/headerLogo");
const path = require('path')
const fs = require('fs')

exports.get = async (req, res, next) => {
	try {
		const headerLogo = await model.find().lean();

		return res.status(200).json([...headerLogo])
	} catch (e) {
		next(e)
	}
}

exports.create = async (req, res, next) => {
	try {
		const logo = Boolean(req.file?.filename) ? req.file.filename : undefined;

		const validatedFields = await model.createValidation({...req.body, logo}).catch(err => {
			err.statusCode = 400
			throw err
		})

        let createdDoc = undefined;

        if ((await model.countDocuments()) < 1) {
            createdDoc = await model.create(validatedFields);
        } else {
            return res.status(400).json({message: "لوگو قبلا اضافه شده"})
        }

		return res.status(201).json({message: "با موفقیت اضافه شد", createdDoc})
	} catch (e) {
		next(e)
	}
}

exports.edit = async (req, res, next) => {
	try {
		const logo = Boolean(req.file?.filename) ? req.file.filename : undefined;
		const validatedFields = await model.editValidation({...req.body, ...req.params, logo}).catch(err => {
			err.statusCode = 400
			throw err
		})

		const {id, ...body} = validatedFields

		const targetDoc = await model.findById(id)

		if (!targetDoc) {
			return res.status(404).json({message: "document not found"})
		}

        if (targetDoc.logo !== logo && logo !== undefined) {
			const filePath = path.join(
				__dirname,
				"..",
				"public",
				"logo",
				targetDoc.logo
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