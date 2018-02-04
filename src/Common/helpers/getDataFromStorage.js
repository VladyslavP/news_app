export default function getDataFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
}