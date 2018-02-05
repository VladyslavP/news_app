export default function removeArticleFromStorage(id) {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const { [id]: elementToDelete, ...rest } = articles;
    localStorage.setItem('articles', JSON.stringify(rest));
}
