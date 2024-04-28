const yup = require("yup")

const createValidator = yup.object().shape({
	logo: yup
		.string()
		.required("اپلود کردن لوگو الزامی است"),
	href: yup.string()
})

module.exports = {
	createValidator
}