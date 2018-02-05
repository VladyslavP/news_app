export default function saveDataToStorage(key, news) {
    const data = {news: JSON.stringify(news), timeStamp: new Date().getTime()};
    localStorage.setItem(key, JSON.stringify(data));
}
