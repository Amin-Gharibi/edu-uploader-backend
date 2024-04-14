const mongoose = require("mongoose")
const {createValidator, deleteAndGetUserUploadsValidator} = require("../validators/upload");

const uploadsSchema = new mongoose.Schema(
	{
		uploaderUser: {
			type: mongoose.Types.ObjectId,
			ref: "User"
		},
		focusedSubject: {
			type: String
		},
		schoolType: {
			type: String,
			enum: ["PRIVATE", "PUBLIC", "SPECIAL"]
		},
		schoolGender: {
			type: String,
			enum: ["MALE", "FEMALE"]
		},
		file: {
			type: String
		}
	},
	{ timestamps: true }
)

uploadsSchema.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}

uploadsSchema.statics.deleteValidation = function (body) {
	return deleteAndGetUserUploadsValidator.validate(body, { abortEarly: false })
}

uploadsSchema.statics.getUserUploadsValidation = function (body) {
	return deleteAndGetUserUploadsValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("Upload", uploadsSchema)

module.exports = model