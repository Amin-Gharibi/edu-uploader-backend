const yup = require("yup")

const createValidator = yup.object().shape({
	title: yup
		.string()
		.required("متن منو الزامی است"),
	href: yup.string()
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست"),
	title: yup
		.string(),
	href: yup.string()
})

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست")
})

const getOneValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه منو الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه منو معتبر نیست")
})

module.exports = {
	createValidator,
	editValidator,
	deleteValidator,
	getOneValidator
}