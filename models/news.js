const mongoose = require("mongoose")
const {createValidator, editValidator, deleteValidator, get15Validator} = require("../validators/news");

const newsSchema = new mongoose.Schema(
	{
		title: {
			type: String
		},
		body: {
			type: String
		},
		cover: {
			type: String
		},
		writer: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
)


newsSchema.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}
newsSchema.statics.editValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false })
}
newsSchema.statics.deleteValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false })
}
newsSchema.statics.get15Validation = function (body) {
	return get15Validator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("News", newsSchema)

module.exports = model