const mongoose = require("mongoose")
const {createValidator, editValidator} = require("../validators/headerLogo");

const headerLogo = new mongoose.Schema(
	{
		logo: {
            type: String
        },
        href: {
            type: String
        }
	},
	{ timestamps: true }
)


headerLogo.statics.createValidation = function (body) {
	return createValidator.validate(body, { abortEarly: false })
}

const model = new mongoose.model("HeaderLogo", headerLogo)

module.exports = model