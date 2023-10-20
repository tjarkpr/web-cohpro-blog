import articles from './articles.json';

export function fetchFeed(author)
{
    let articles = getArticles(author);
    articles.sort((a, b) => 
    {
        var keyA = new Date(a.timestamp),
            keyB = new Date(b.timestamp);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return articles;
}


const JohannaKey = 'johanna';
const TjarkKey = 'tjark';
const AllArticles = articles[JohannaKey].concat(articles[TjarkKey]);

function getArticles(author)
{
    if(!author) { return AllArticles; }
    return articles[author];
}