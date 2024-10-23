import { modalAdd, bookmarkmodalAdd } from "./ui.js";
import { popularFetchData, bookmarkFetchData } from "./api.js";

const urlPopularPage =
    "https://api.themoviedb.org/3/movie/popular?language=ko-KO&page=1";
const cardWrapper = document.querySelector(".cardWrapper");
const searchBox = document.getElementById("searchBox");
const searchInput = document.querySelector(".searchInput");
const fixBtn = document.getElementById("fixBtn");
const modalcloseBtn = document.querySelector(".modalcloseBtn");
const title = document.getElementById("title");
const checkBookmarkBtn = document.getElementById("checkBookmarkBtn");
const bookmarkModalContainer = document.querySelector(
    ".bookmarkModalContainer"
);
const bookmarkModalContainerInner = document.getElementById(
    "bookmarkModalContainerInner"
);

// 아이디 클래스 지정

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTNkZjlkMmFlMjRiZGQ5Y2E1Y2YxZWE0YjBlZGZlZSIsIm5iZiI6MTcyODk2NDkzNy4yNDIyMjgsInN1YiI6IjY3MGRlNTdhOWYzNTMxZTZiMjZjNDU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.npK2DJ6_sFT87OLxSowunNArjpxCtQ-dPQrI9ppT1yE",
    },
};

// api 키

title.addEventListener("click", function () {
    window.location.reload();
});

// 밍플릭스 로고 클릭 시 새로 고침

popularFetchData(urlPopularPage, options);

// 화면에 카드 띄우기.

searchBox.addEventListener("submit", function (e) {
    // 검색창 submit와 관련된 코드입니다.
    e.preventDefault();
    const userInput = searchInput.value;
    if (userInput === "") {
        alert("검색어를 입력해주세요");
    } else {
        const encodedQuery = encodeURIComponent(userInput); // 유저가 쓴 데이터를 인코딩해줘요!
        // 이렇게 안 바꿔주면 아래 searchPage를 통한 검색이 불가능!
        cardWrapper.innerHTML = ""; // cardWrapper 안의 데이터를 초기화시켜줘요!
        const searchPage = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=false&language=ko-KO&page=1`;
        popularFetchData(searchPage, options);
    }
});

//검색 메커니즘

cardWrapper.addEventListener("click", modalAdd);
bookmarkModalContainer.addEventListener("click", bookmarkmodalAdd);

// 모달/북마크된 영화 모달 추가 

fixBtn.addEventListener("click", function () {
    window.location.reload();
});

// 검색의 초기화

modalcloseBtn.addEventListener("click", function () {
    bookmarkModalContainer.style.display = "none";
});

// 닫기 버튼

checkBookmarkBtn.addEventListener("click", () => {
    bookmarkModalContainerInner.innerHTML = "";
    // 아이디를 통해 조회.

    if (localStorage.length === 0) { 
        // 밍플릭스 북마크에 아무것도 없으면 출력될 메시지
        alert("밍플릭스 북마크에 아무것도 없어요. 추가해주세요.");
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        let bookmarkedMovieId = Object.values(localStorage);
        const searchPage = `https://api.themoviedb.org/3/movie/${bookmarkedMovieId[i]}?language=ko-KO`;
        bookmarkFetchData(searchPage, options);
    }
    bookmarkModalContainer.style.display = "flex";
});

// 북마크 확인 버튼 눌렀을 때의 로직
