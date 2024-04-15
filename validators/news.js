const yup = require("yup")

const createValidator = yup.object().shape({
	title: yup
		.string()
		.required("عنوان خبر الزامی است"),
	body: yup
		.string()
		.required("بدنه خبر الزامی است"),
	cover: yup
		.string()
		.required("عکس کاور خبر الزامی است")
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه خبر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه خبر معتبر نیست"),
	title: yup
		.string(),
	body: yup
		.string(),
	cover: yup
		.string()
})

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه خبر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه خبر معتبر نیست")
})

module.exports = {
	createValidator,
	editValidator,
	deleteValidator
}