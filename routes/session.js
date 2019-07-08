const express = require("express")
const router = express.Router()
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
    // res.send({ user: req.user })
    res.render("session/profile", { User, user: req.user });
});


// POST REQUEST FOR ADDING INTERESTS
//##########################################
router.post("/profile", (req, res) => {
    const interest = req.body.interest;
    //console.log(interest);
    if (interest.length) {
        User.findByIdAndUpdate(req.user.id, {
            interests: req.user.interests.concat(interest)
        }, { new: true }).then(user => {
            res.redirect("/session/profile");
        }).catch(err => {
            console.log(err)
        })
    }
})
router.get('/profile/deleteInterest/:interestId', (req, res) => {
    console.log(req.params)
    User.findByIdAndUpdate(req.user.id, {
        interests: req.user.interests.filter(x => x !== req.params.interestId)
    }, { new: true }).then(() => {
        res.redirect("/session/profile");
    }).catch(err => {
        console.log(err)
    })
    res.redirect("/session/profile");
})
// let tagInterest = document.querySelectors('.tag-interest');
// tagInterest.onClick = (e) => { console.log(e) }
//##########################################

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