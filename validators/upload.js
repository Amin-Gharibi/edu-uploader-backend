const yup = require("yup")

const createParticipantsValidator = yup.object().shape({
	firstName: yup
		.string()
		.required("وارد کردن نام همه کسانی که در پروژه شرکت کرده اند الزامی است"),
	lastName: yup
		.string()
		.required("وارد کردن نام خانوادگی همه کسانی که در پروژه شرکت کرده اند الزامی است")
})

const createValidator = yup.object().shape({
	focusedSubject: yup
		.string()
		.required("شناسه محور پژوهش الزامی است")
		.matches(/^[0-9a-fA-F]{24}$/, "شناسه محور پژوهش معتبر نیست"),
	schoolName: yup
		.string()
		.required("وارد کردن نام آموزشگاه الزامی است"),
	schoolType: yup
		.string()
		.oneOf(["PUBLIC", "SPECIAL"], "نوع مدرسه باید یکی از PUBLIC, SPECIAL باشد")
		.required("نوع مدرسه الزامی است"),
	schoolGender: yup
		.string()
		.oneOf(["MALE", "FEMALE"], "جنسیت مدرسه فقط MALE, FEMALE میتواند باشد")
		.required("جنسیت مدرسه الزامی است"),
	schoolArea: yup
		.string()
		.required("وارد کردن نام منطقه الزامی است"),
	participants: yup.array().of(createParticipantsValidator),
	examplePages: yup.array(),
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