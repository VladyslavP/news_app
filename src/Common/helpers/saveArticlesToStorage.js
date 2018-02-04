export default function saveArticlesToStorage(data, id){
    const articles = JSON.parse(localStorage.getItem('articles'));

    if(!articles){
        const dataToSave = JSON.stringify({[id]: {data:data, timeStamp: new Date().getTime()}});
        localStorage.setItem("articles", dataToSave);
    } else {
        articles[id] = {data:data, timeStamp: new Date().getTime()};
        const newData = JSON.stringify(articles);

        localStorage.removeItem("articles");
        localStorage.setItem("articles", newData);
    }

    //
    // const data = {news: JSON.stringify(news), timeStamp: new Date().getTime()};
    // localStorage.setItem(key, JSON.stringify(data));
}