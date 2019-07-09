const express = require("express")
const router = express.Router()
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
// const getRSS = require("../public/javascripts/getRSS");
const getArticlesForInterest = require("../public/javascripts/newApi");

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("session/profile", { User, user: req.user });
});

router.post("/profile", (req, res) => {
    const interest = req.body.interest;
    if (interest.length) {
        User.findByIdAndUpdate(req.user.id, {
            interests: req.user.interests.concat(interest)
        }, { new: true }).then(() => {
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


router.get("/home", ensureLogin.ensureLoggedIn(), (req, res) => {
    let interestsFeed = [...req.user.interests].map(el => getArticlesForInterest(el, 'en'))

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    Promise.all(interestsFeed).then(feed => {
        const feedArticles = (feed.reduce((acc, val) => {
            return acc.concat(val.articles)
        }, []))
        res.render("session/home", { user: req.user, feedArticles: shuffle(feedArticles).splice(0, 10) });
    }).catch(err => {
        console.log(err)
    })
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

module.exports = router;