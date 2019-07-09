const express = require("express")
const router = express.Router()
const Parser = require('rss-parser');
const parser = new Parser();

// let mediumBaseRssUrl = "https://medium.com/feed/tag/"
// let tag = 'psychology'


const getRSS = (mediumBaseRssUrl, tag) => {
    return parser.parseURL(mediumBaseRssUrl + tag).then(feed => {
        return feed
    }).catch(err => {
        console.log(err)
    })
}

module.exports = getRSS;