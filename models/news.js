const mongoose = require("mongoose")
const {createValidator, editValidator, deleteValidator} = require("../validators/news");

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

const model = new mongoose.model("News", newsSchema)

module.exports = model