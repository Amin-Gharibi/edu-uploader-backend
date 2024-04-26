module.exports = async (req, res, next) => {
	const isAdminOrSupervisor = req.user.role === "SUPERVISOR" || req.user.role === 'ADMIN';

	if (isAdminOrSupervisor) return next();

	return res
		.status(403)
		.json({ message: "this route is accessible only for admins and supervisors." });
};