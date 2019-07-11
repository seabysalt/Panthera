const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('63a43c5845cd443599625634e9c40818');


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