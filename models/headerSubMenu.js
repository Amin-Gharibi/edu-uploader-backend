const mongoose = require("mongoose")
const {createValidator, editValidator, deleteValidator} = require("../validators/headerSubMenu");

const headerSubMenu = new mongoose.Schema(
	{
		title: {
			type: String
		},
		href: {
			type: String
		},
		parent: {
			type: mongoose.Types.ObjectId,
			ref: "HeaderMenu"
		}
	},
	{ timestamps: true }
)


headerSubMenu.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}
headerSubMenu.statics.editValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false })
}
headerSubMenu.statics.deleteValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("HeaderSubMenu", headerSubMenu)

module.exports = model