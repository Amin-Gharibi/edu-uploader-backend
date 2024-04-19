const yup = require("yup")

const createValidator = yup.object().shape({
	logo: yup
		.string()
		.required("اپلود کردن لوگو الزامی است"),
	href: yup.string()
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست"),
    logo: yup.string(),
	href: yup.string()
})

module.exports = {
	createValidator,
	editValidator
}