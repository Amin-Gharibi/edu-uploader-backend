const mongoose = require("mongoose")
const {createValidator, deleteAndGetUserUploadsValidator} = require("../validators/upload");

const uploadsSchema = new mongoose.Schema(
	{
		focusedSubject: {
			type: mongoose.Types.ObjectId,
			ref: "FocusedSubject"
		},
		schoolType: {
			type: String,
			enum: ["PUBLIC", "SPECIAL"]
		},
		schoolGender: {
			type: String,
			enum: ["MALE", "FEMALE"]
		},
		examplePages: [
			{
				type: String
			}
		],
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