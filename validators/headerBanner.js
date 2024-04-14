const yup = require("yup")

const createValidator = yup.object().shape({
	title: yup
		.string()
		.required("متن روی عکس الزامی است"),
	cover: yup
		.string()
		.required("عکس کاور الزامی است"),
	href: yup.string()
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاور الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاور معتبر نیست"),
	title: yup
		.string(),
	cover: yup
		.string(),
	href: yup.string()
})

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاور الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاور معتبر نیست")
})

module.exports = {
	createValidator,
	editValidator,
	deleteValidator
}