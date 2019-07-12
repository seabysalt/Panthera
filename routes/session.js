const express = require("express")
const router = express.Router()
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Content = require("../models/Content");
const Bookmark = require("../models/Bookmark");
const Blog = require("../models/Blog")
const getArticlesForInterest = require("../public/javascripts/newApi");
const hbs = require("hbs")

hbs.registerHelper("stringify", (data) => JSON.stringify(data))

const { google } = require("googleapis");

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_KEY
});

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("session/profile", { user: req.user });
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

    // Beginning of activation for video

    let youtubeFeed = [...req.user.interests].map(el => youtube.search.list({
        part: "snippet",
        maxResults: 1,
        q: 'tedx+' + el.split('').join('+'),
        //    videoDefinition: "standard",
    }).then(response => {
        console.log(response.data.items)
        return response.data.items.map(el => ({ videoId: el.id.videoId, title: el.snippet.title }))
    }).catch(err => {
        console.log(err);
    })
    )

    Promise.all(youtubeFeed).then((videoObj) => {

        let newObj = videoObj.reduce((acc, val) => acc.concat(val), []).filter(el => el.videoId != undefined)

        let interestsFeed = [...req.user.interests].map(el => getArticlesForInterest(el, 'en'))
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        Promise.all(interestsFeed)
            .then(feed => {
                const feedArticles = (feed.reduce((acc, val) => {
                    return acc.concat(val.articles)
                }, []))
                res.render("session/home", { user: req.user, videoObj: newObj, feedArticles: shuffle(feedArticles).splice(0, 10) });
            }).catch(err => {
                console.log(err)
            })
    })
});

// End of thing to activation for video


//  Activate this if you want to de-activate loading videos:


//     let interestsFeed = [...req.user.interests].map(el => getArticlesForInterest(el, 'en'))
//     function shuffle(a) {
//         for (let i = a.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [a[i], a[j]] = [a[j], a[i]];
//         }
//         return a;
//     }

//     Promise.all(interestsFeed)
//         .then(feed => {
//             const feedArticles = (feed.reduce((acc, val) => {
//                 return acc.concat(val.articles)
//             }, []))
//             res.render("session/home", { user: req.user, feedArticles: shuffle(feedArticles).splice(0, 10) });
//         }).catch(err => {
//             console.log(err)
//         })

// });

// Active until here for only articles

// });


//######### LIKE BUTTON, | CREATE POST IN DB or IF ALREADY IN DB PUSH USER ID IN 'likedBy' #########
router.post("/content/like", (req, res) => {
    const content = req.body.article;
    const userId = req.user.id;

    Content.findOne({ article: content }).then(match => {
        if (match && !match.likedBy.includes(userId)) {
            const updatedLikedBy = match.likedBy.concat(userId);
            match.update({ likedBy: updatedLikedBy }).then(() => { console.log("Updated") }).catch(err => { console.log(err) })
        }
        else {
            Content.create({ article: JSON.parse(content), likedBy: [userId], likingUserPic: [req.user.profilePicture] }).then(newArticle => {
                console.log(newArticle)
            }).catch(err => { console.log(err) })
        }
    }).catch(err => { console.log(err) })
})

//######### NEW LIKE BUTTON, | CREATE POST IN DB or IF ALREADY IN DB PUSH USER ID IN 'likedBy' #########

// router.post("/content/bookmark", (req, res) => {
//     const content = req.body.article;
//     const userId = req.user.id;

//     Bookmark.findOne({ article: content }).then(match => {
//         if (match) {
//             const updatedBookmarkedBy = match.bookmarkedBy.concat(userId);
//             match.update({ bookmarkedBy: updatedBookmarkedBy }).then(() => { console.log("Updated") }).catch(err => { console.log(err) })
//         }
//         else {
//             Bookmark.create({ article: content, bookmarkedBy: [userId] }).then(newArticle => {
//                 console.log(newArticle)
//             }).catch(err => { console.log(err) })
//         }
//     }).catch(err => { console.log(err) })
// })

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//########### PEERS
router.get("/peers", (req, res) => {
    const myInterests = req.user.interests;
    User.find({ 'interests': { $in: myInterests } }).then(users => {
        const sameInterestUsers = users.filter(obj => obj.id !== req.user.id)
        const sameInterestUsersId = sameInterestUsers.map(x => x.id)
        //---
        Content.find({ 'likedBy': { '$in': sameInterestUsersId } }).then(likedArticlesRaw => {
            likedArticlesRaw = shuffle(likedArticlesRaw).splice(0, 20)
            res.render("session/peers", { user: req.user, sameInterestUsers, articlesLikedByUsers: likedArticlesRaw });
        }).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
})

router.get("/featured", (req, res) => {
    let featuredFeed = ['learning', 'tech', 'future', 'art'].map(el => getArticlesForInterest(el, 'en'))
    Promise.all(featuredFeed)
        .then(feed => {
            const feedArticles = (feed.reduce((acc, val) => {
                return acc.concat(val.articles)
            }, []))
            res.render("session/featured", { user: req.user, news: shuffle(feedArticles).splice(0, 40) });
        }).catch(err => {
            console.log(err)
        })
})

router.get("/blog", (req, res) => {
    Blog.find().then(posts => {
        res.render("session/blog", { user: req.user, posts });
    })
})

router.get("/search", (req, res) => {
    res.render("session/search", { user: req.user });
})








// router.get("/postB", (req, res) => {
//     Blog.create({ title: 'title' }).then(data => {
//         // console.log(data)
//         res.send(data)
//         //res.render("session/blog", { user: req.user, posts })
//     }).catch(err => console.log(err))

// })


router.get('/copydb', (req, res) => {
    User.find().then(users => {
        Content.find().then(content => {
            Blog.find().then(data => {
                res.send(data)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
})



module.exports = router;









            // console.log(likedArticlesRaw[2].article)
            // const likedArticles = likedArticlesRaw.splice(3, 1).map(x => x.article)
            // function escapeSpecialChars(jsonString) {
            //     return jsonString.replace(/\n/g, "\\n")
            //         .replace(/\r/g, "\\r")
            //         .replace(/\t/g, "\\t")
            //         .replace(/\f/g, "\\f")
            // }
            // const preParsed = likedArticles.map(x => JSON.parse(escapeSpecialChars(x)))