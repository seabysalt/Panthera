const express = require("express")
const router = express.Router()
const ensureLogin = require("connect-ensure-login");

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
    // res.send({ user: req.user })
    res.render("session/profile", { user: req.user });
});

router.get("/home", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("session/home", { user: req.user });
});

router.get("/peers", (req, res) => {
    res.render("session/peers", { user: req.user });
})

router.get("/featured", (req, res) => {
    res.render("session/featured", { user: req.user });
})

router.get("/blog", (req, res) => {
    res.render("session/blog", { user: req.user });
})
// router.get('/profile', loginCheck())

module.exports = router;