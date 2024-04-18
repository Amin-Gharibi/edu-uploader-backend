const mongoose = require("mongoose")

const {deleteValidator, editValidator, createValidator} = require("../validators/focusedSubject")

const userSchema = new mongoose.Schema(
	{
		title: {
			type: String
		}
	},
	{ timestamps: true }
)


//* panel
userSchema.statics.createFocusedSubjectValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false });
};
userSchema.statics.editFocusedSubjectValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false });
};
userSchema.statics.deleteFocusedSubjectValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false });
};

const model = new mongoose.model("FocusedSubject", userSchema)

module.exports = model