const yup = require("yup")

const createValidator = yup.object().shape({
	focusedSubject: yup
		.string()
		.required("محور جشنواره الزامی است"),
	schoolType: yup
		.string()
		.oneOf(["PRIVATE", "PUBLIC", "SPECIAL"], "نوع مدرسه باید یکی از PRIVATE, PUBLIC, SPECIAL باشد")
		.required("نوع مدرسه الزامی است"),
	schoolGender: yup
		.string()
		.oneOf(["MALE", "FEMALE"], "جنسیت مدرسه فقط MALE, FEMALE میتواند باشد")
		.required("جنسیت مدرسه الزامی است"),
	file: yup
		.string()
		.required("فایل اپلود شده الزامی است")
})

const deleteAndGetUserUploadsValidator = yup.object().shape({
	id: yup
		.string()
		.required("شناسه فایل آپلود شده الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه فایل آپلود شده معتبر نیست")
})

module.exports = {
	createValidator,
	deleteAndGetUserUploadsValidator
}