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
//##########################################

router.get("/home", ensureLogin.ensureLoggedIn(), (req, res) => {
    // User.find(/* NEED TO FILTER/SORT BY INTERESTS IN COMMUN */).then(sameInterestUsers => {
    //     // return users
    //     res.render("session/home", { user: req.user, sameInterestUsers });
    // }).catch(err => {
    //     console.log(err)
    // })
    res.render("session/home", { user: req.user });
});

router.get("/peers", (req, res) => {
    const myInterests = req.user.interests;
    User.find({ 'interests': { $in: myInterests } } /* NEED TO FILTER/SORT BY INTERESTS IN COMMUN */).then(users => {
        const sameInterestUsers = users.filter(obj => obj.id !== req.user.id)
        res.render("session/peers", { user: req.user, sameInterestUsers });
    }).catch(err => {
        console.log(err)
    })
})

router.get("/featured", (req, res) => {
    res.render("session/featured", { user: req.user });
})

router.get("/blog", (req, res) => {
    res.render("session/blog", { user: req.user });
})

router.get("/search", (req, res) => {
    res.render("session/search", { user: req.user });
})
// router.get('/profile', loginCheck())

module.exports = router;