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
			await model.deleteMany()
            createdDoc = await model.create(validatedFields);
        }

		return res.status(201).json({message: "با موفقیت اضافه شد", createdDoc})
	} catch (e) {
		next(e)
	}
}