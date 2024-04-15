const yup = require("yup")

const createValidator = yup.object().shape({
	title: yup
		.string()
		.required("متن منو الزامی است"),
	href: yup
		.string()
		.required("وارد کردن لینک الزامی است"),
	parent: yup
		.string()
		.required("شناسه منو والد الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو والد معتبر نیست")
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست"),
	title: yup.string(),
	href: yup.string(),
	parent: yup
		.string()
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو والد معتبر نیست")
})

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست")
})

module.exports = {
	createValidator,
	editValidator,
	deleteValidator
}