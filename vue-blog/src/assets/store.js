import articles from './articles.json';

const allArticles = articles['johanna'].concat(articles['tjark']);

export function fetchFeed(author)
{
    if(!author) { return allArticles; }
    return articles[author];
}