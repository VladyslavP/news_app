export function removeArticleFromStorage(article) {
    const articles = JSON.parse(localStorage.getItem("articles"));
    const newArticles = JSON.stringify(articles.filter((art) => art.id !== article.id));
    localStorage.removeItem('articles');
    localStorage.setItem("articles", newArticles);
}