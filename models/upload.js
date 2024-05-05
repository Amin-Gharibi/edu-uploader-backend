const mongoose = require("mongoose")
const {createValidator, deleteAndGetUserUploadsValidator} = require("../validators/upload");

const participantsSchema = new mongoose.Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	}
})

const uploadsSchema = new mongoose.Schema(
	{
		focusedSubject: {
			type: mongoose.Types.ObjectId,
			ref: "FocusedSubject"
		},
		schoolName: {
			type: String
		},
		schoolType: {
			type: String,
			enum: ["PUBLIC", "SPECIAL"]
		},
		schoolGender: {
			type: String,
			enum: ["MALE", "FEMALE"]
		},
		schoolArea: {
			type: String
		},
		participants: [
			participantsSchema
		],
		examplePages: [
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