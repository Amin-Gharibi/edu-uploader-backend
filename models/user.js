const mongoose = require("mongoose")

const {deleteValidator, editValidator} = require("validators/user")
const {changeRoleValidator} = require("../validators/user");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true
		},
		password: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		areaName: {
			type: String
		},
		provinceName: {
			type: String
		},
		role: {
			type: String,
			enum: ['ADMIN', 'SUPERVISOR']
		}
	},
	{ timestamps: true }
)

//* auth
userSchema.statics.registerValidation = function (body) {

};
userSchema.statics.loginValidation = function (body) {

};

//* panel
userSchema.statics.deleteUserValidation = function (body) {
	return deleteValidator.validate(body, { abortEarly: false });
};
userSchema.statics.changeUserRoleValidation = function (body) {
	return changeRoleValidator.validate(body, { abortEarly: false });
};
userSchema.statics.editUserValidation = function (body) {
	return editValidator.validate(body, { abortEarly: false });
};

const model = new mongoose.model("User", userSchema)

module.exports = model