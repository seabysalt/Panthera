const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c152890d9bb245729e2f2b432ebb1794');


const getArticlesForInterest = (interest, language) => {
    return newsapi.v2.everything({
        q: interest,
        language: language,
        sortBy: 'relevancy',
        page: 1
    }).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    });
};

module.exports = getArticlesForInterest;