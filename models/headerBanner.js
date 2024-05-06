const mongoose = require("mongoose")
const { createValidator, editValidator, deleteValidator } = require("../validators/headerBanner");
const { getOneValidator } = require("../validators/headerMenu");

const headerBannerSchema = new mongoose.Schema(
	{
		title: {
			type: String
		},
		cover: {
			type: String
		},
		href: {
			type: String
		}
	},
	{ timestamps: true }
)


headerBannerSchema.statics.getOneValidation = function (body) {
	return getOneValidator.validate(body, { abortEarly: false })
}
headerBannerSchema.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}
headerBannerSchema.statics.editValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false })
}
headerBannerSchema.statics.deleteValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("HeaderBanner", headerBannerSchema)

module.exports = model