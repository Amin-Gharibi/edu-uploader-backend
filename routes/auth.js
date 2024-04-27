const express = require("express")

const isAuthenticated = require("../middlewares/isAuth")
const controller = require("../controllers/auth");
const isAdminOrSupervisor = require("../middlewares/isAdminOrSupervisor");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/register", isAuthenticated, isAdmin, controller.register) // this is for signing up
router.post("/login", controller.login) // this is for logging in
router.get("/me", isAuthenticated, controller.getMe) // this is for getting users infos
router.get("/panel", isAuthenticated, isAdminOrSupervisor, controller.getPanelInfo)

module.exports = router;