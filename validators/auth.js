const yup = require("yup");

//* Register Schema
const registerValidator = yup.object().shape({
	username: yup.string().required("نام کاربری الزامی می‌باشد"),
	password: yup
		.string()
		.min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
		.required("رمز عبور الزامی می‌باشد"),
	firstName: yup.string().required("نام الزامی می‌باشد"),
	lastName: yup.string().required("نام خانوادگی الزامی می‌باشد"),
	areaName: yup.string().required("نام منطقه الزامی می‌باشد"),
	provinceName: yup.string().required("نام استان الزامی می‌باشد"),
	focusedSubject: yup.string()
});

//* Login Schema
const loginValidator = yup.object().shape({
	username: yup.string().required(" شناسه کاربری الزامی است"),
	password: yup.string().required(" کلمه عبور الزامی است"),
});

module.exports = {
	registerValidator,
	loginValidator,
};
