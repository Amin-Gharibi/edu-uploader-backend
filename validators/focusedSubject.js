const yup = require("yup")

const createValidator = yup.object().shape({
	title: yup
		.string()
		.required("نام محور پژوهش الزامی است"),
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاور الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاور معتبر نیست"),
	title: yup
		.string()
})

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه محور پژوهش الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه محور پژوهش معتبر نیست")
})

module.exports = {
	createValidator,
	editValidator,
	deleteValidator
}