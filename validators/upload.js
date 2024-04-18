const yup = require("yup")

const createValidator = yup.object().shape({
	focusedSubject: yup
		.string()
		.required("شناسه محور پژوهش الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه محور پژوهش معتبر نیست"),
	schoolType: yup
		.string()
		.oneOf(["PUBLIC", "SPECIAL"], "نوع مدرسه باید یکی از PUBLIC, SPECIAL باشد")
		.required("نوع مدرسه الزامی است"),
	schoolGender: yup
		.string()
		.oneOf(["MALE", "FEMALE"], "جنسیت مدرسه فقط MALE, FEMALE میتواند باشد")
		.required("جنسیت مدرسه الزامی است"),
	examplePages: yup
		.array().of(
			yup.object().shape({
				pageFile: yup
					.string()
					.required('اپلود کردن نمونه برگ الزامی است')
			})
		),
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