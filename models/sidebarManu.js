const mongoose = require("mongoose")
const {createValidator, editValidator, deleteValidator} = require("../validators/sidebarMenu");

const sidebarManuSchema = new mongoose.Schema(
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


sidebarManuSchema.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}
sidebarManuSchema.statics.editValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false })
}
sidebarManuSchema.statics.deleteValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("SidebarMenu", sidebarManuSchema)

module.exports = model