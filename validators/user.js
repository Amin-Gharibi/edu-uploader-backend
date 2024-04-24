const yup = require("yup")

const deleteValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاربر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست")
})

const changeRoleValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه کاربر الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه کاربر معتبر نیست"),
	role: yup
		.string()
		.oneOf(['ADMIN', 'SUPERVISOR'], "نقش کاربر فقط میتواند ادمین یا ناظر باشد")
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
	provinceName: yup.string(),
	focusedSubject: yup.string()
})

module.exports = {
	deleteValidator,
	editValidator,
	changeRoleValidator
}