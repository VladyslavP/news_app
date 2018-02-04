export function news(state) {
    return state.news;
}
export function articles(state) {
    return state.articles;
}

export function particularNews(state, id) {
    return state.articles.filter((item) => item.source.id === id);
}