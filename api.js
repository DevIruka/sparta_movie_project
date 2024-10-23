import {
    addCards,
    addBookmarkCards
} from "./ui.js";

async function popularFetchData(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        addCards(data);
    } catch (error) {
        console.log("errrr...");
    }
}

// 유명한 영화 가져오는 함수

async function bookmarkFetchData(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        addBookmarkCards(data); // 여기가 다름
    } catch (error) {
        console.log("errrr...");
    }
}

// 위에거랑 똑같은데 북마크 전용 fetch 함수 

export { popularFetchData, bookmarkFetchData };
