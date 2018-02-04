export default function saveArticlesToStorage(art, id, type){
    const articles = JSON.parse(localStorage.getItem('articles'));

    if(!articles){
        const dataToSave = JSON.stringify({[id]: {data: {[type]: art}, timeStamp: new Date().getTime()}});
        localStorage.setItem("articles", dataToSave);
    } else {
        const elem = articles[id];
        if(!elem){
            const dataToSave = {[id]: {data: {[type]: art}, timeStamp: new Date().getTime()}};
            const newArticles = JSON.stringify({...articles, ...dataToSave});
            localStorage.removeItem("articles");
            localStorage.setItem("articles", newArticles);
        } else {
            const { [id]: elementToChange } = articles;
            elementToChange.data[type] = art;
            const newElement = JSON.stringify({...articles, ...{ [id]: elementToChange}});
            localStorage.removeItem("articles");
            localStorage.setItem("articles", newElement);
        }
    }

}