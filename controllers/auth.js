const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/user");

exports.register = async (req, res, next) => {
	try {
		let body = await model.registerValidation(req.body).catch(err => {
			err.statusCode = 400
			throw err
		});

		const isUserExists = await model.findOne({username: body.username})

		if (isUserExists) {
			return res.status(409).json({
				message: "کاربری با این نام کاربری وجود دارد",
			});
		}

		const countOfRegisteredUser = await model.find().count();

		body.password = await bcrypt.hash(body.password, 12);

		const user = await model.create({
			...body,
			role: countOfRegisteredUser > 0 ? "SUPERVISOR" : "ADMIN",
		});

		const userObject = user.toObject();

		Reflect.deleteProperty(userObject, "password");

		const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "3 day",
		});

		return res.status(201).json({ user: userObject, accessToken });
	} catch (e) {
		next(e)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { username, password } = await model.loginValidation(req.body).catch((err) => {
			err.statusCode = 400;
			throw err;
		});

		const user = await model.findOne({
			username
		});

		if (!user) {
			return res
				.status(404)
				.json({message: "کاربری با همچین اطلاعاتی وجود ندارد"});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "رمز عبور وارد شده صحیح نیست" });
		}

		const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "3 day",
		});

		return res.json({ accessToken });
	} catch (error) {
		next(error);
	}
};

exports.getMe = async (req, res, next) => {
	try {

	} catch (e) {
		next(e)
	}
}