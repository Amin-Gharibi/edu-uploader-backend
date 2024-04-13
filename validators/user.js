const yup = require("yup")

const deleteAndChangeRoleValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاربر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست")
})

const editValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاربر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
	username: yup.string(),
	password: yup.string(),
	firstName: yup.string(),
	lastName: yup.string(),
	areaName: yup.string(),
	provinceName: yup.string()
})

module.exports = {
	deleteAndChangeRoleValidator,
	editValidator
}