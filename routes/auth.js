const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const passport = require("passport");
// const passportSetings = require("../config/passport-setup")

router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/session/home",
        failureRedirect: "/auth/login"
    })
);

router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/session/home",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", { message: "The username already exists" });
            return;
        }

        //const salt = bcrypt.genSaltSync(bcryptSalt);
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            firstName: username,
            fullName: username,
            username: username,
            password: hashPass
        });

        newUser.save()
            .then(() => {
                res.redirect("/auth/login");
            })
            .catch(err => {
                res.render("/auth/signup", { message: "Something went wrong" });
            })
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

router.get("/delete", (req, res) => {
    User.deleteOne({ id: req.user.id }).then(() => {
        console.log('User has been deleted');
        res.redirect("/auth/signup")
    })
})

module.exports = router;