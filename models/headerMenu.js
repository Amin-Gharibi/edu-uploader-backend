const mongoose = require("mongoose")
const { createValidator, editValidator, deleteValidator, getOneValidator } = require("../validators/headerMenu");

const headerMenu = new mongoose.Schema(
	{
		title: {
			type: String
		},
		href: {
			type: String
		}
	},
	{ timestamps: true }
)


headerMenu.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}
headerMenu.statics.getOneValidation = function (body) {
	return getOneValidator.validate(body, { abortEarly: false })
}
headerMenu.statics.editValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false })
}
headerMenu.statics.deleteValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("HeaderMenu", headerMenu)

module.exports = model