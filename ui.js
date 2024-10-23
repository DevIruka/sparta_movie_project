const cardWrapper = document.querySelector(".cardWrapper");
const bookmarkModalContainerInner = document.getElementById(
    "bookmarkModalContainerInner"
);

const addCards = function (popularData) {
    for (let i = 0; i < popularData.results.length; i++) {
        const popularCards = `<div class="tempcard">
        <img
            src="https://image.tmdb.org/t/p/w500/${
                popularData.results[i].poster_path
            }"
            alt="영화 이미지를 가지고 올 수 없습니다."
            style="width: 200px; height: 300px;" class ="posterOfMovie"
        />
        <ul class="contentWrapper">
            <li class="movieTitle">${popularData.results[i].title}</li>
            <li class="movieScore">평점 : ${
                Math.floor(popularData.results[i].vote_average * 10) / 10
            }</li>
            <li class="movieId">${popularData.results[i].id}</li>
            <li class="movieDetails">${popularData.results[i].overview}</li>
        </ul>
    </div>`;
        cardWrapper.innerHTML += popularCards;
    }
}; // 카드를 추가하는 함수. html을 추가. 

const addBookmarkCards = function (bookmarkedData) {
    const bookmarkCards = `<div class="modalcard">
        <img
            src="https://image.tmdb.org/t/p/w500/${bookmarkedData.poster_path}"
            alt="영화 이미지를 가지고 올 수 없습니다."
            style="width: 200px; height: 300px;" class ="posterOfMovie"
        />
        <ul class="contentWrapper">
            <li class="movieTitle">${bookmarkedData.title}</li>
            <li class="movieScore">평점 : ${
                Math.floor(bookmarkedData.vote_average * 10) / 10
            }</li>
            <li class="movieId">${bookmarkedData.id}</li>
            <li class="movieDetails">${bookmarkedData.overview}</li>
        </ul>
        <button class="deleteBtn">삭제</button>
    </div>`;
    bookmarkModalContainerInner.innerHTML += bookmarkCards;
}; // 북마크 안에 카드를 추가하는 함수. html을 추가. 

const modalAdd = function (e) { // 모달에다가 데이터를 추가해주는 함수.
    // cardWrapper의 자식 요소 중에서 가장 가까운 tempcard를 선택.
    if (e.target.closest(".tempcard")) {
        modalContainer.style.display = "flex";
        modalContainerInner.innerHTML = "";

        // 이렇게 안의 html을 초기화하지 않으면 closeBtn이 작동하지 않아요!!

        const targetedCard = e.target.closest(".tempcard");

        const targetCardImg = targetedCard.querySelector(".posterOfMovie").src;

        const targetedCardTitle =
            targetedCard.querySelector(".movieTitle").innerText;

        const targetOverview =
            targetedCard.querySelector(".movieDetails").innerText;

        const targetScore = targetedCard.querySelector(".movieScore").innerText;
        const targetId = targetedCard.querySelector(".movieId").innerText;

        // 선택된 카드의 값들을 받아오는 변수 지정이에요.
        if (targetOverview === "") {
            const modalCardHtml = `<button class="closeBtn">
                    <img
                        src="img/x icon.png"
                        alt="닫기 버튼입니다."
                        style="width: 20px; height: 20px"
                    />
                </button><div class="modalCard">
            <img
            src="${targetCardImg}"
            alt="영화의 이미지가 표현됩니다." class ="modalImage"
        />
            <p class="movieIntroduce">영화의 자세한 소개가 적혀있지 않습니다.</li>
        <ul class="contentWrapper">
            <li class="movieTitle">${targetedCardTitle}</li>
            <li class="movieScore">${targetScore}</li>
        </ul>
        </div><button class="addBookmarkBtn">임시 북마크 버튼</button>`;
            modalContainerInner.innerHTML += modalCardHtml;
            // 여기까지 아예 '영화 소개가 없을 때' 출력
        } else if (targetOverview.length > 300) {
            const modalCardHtml = `<button class="closeBtn">
                    <img
                        src="img/x icon.png"
                        alt="닫기 버튼입니다."
                        style="width: 20px; height: 20px"
                    />
                </button><div class="modalCard">
            <img
            src="${targetCardImg}"
            alt="영화의 이미지가 표현됩니다." class ="modalImage"
        />
            <p class="movieIntroduce">영화 소개가 너무 길군요!</li>
        <ul class="contentWrapper">
            <li class="movieTitle">${targetedCardTitle}</li>
            <li class="movieScore">${targetScore}</li>
        </ul>
        </div><button class="addBookmarkBtn">북마크 추가</button>`;
            modalContainerInner.innerHTML += modalCardHtml;
            // 영화의 설명이 너무 길어져서 css 깨질 시에, '영화 소개가 너무 길군요!' 출력
        } else {
            const modalCardHtml = `<button class="closeBtn">
                    <img
                        src="img/x icon.png"
                        alt="닫기 버튼입니다."
                        style="width: 20px; height: 20px"
                    />
                </button><div class="modalCard">
            <img
            src="${targetCardImg}"
            alt="영화의 이미지가 표현됩니다." class ="modalImage"
        />
            <p class="movieIntroduce">${targetOverview}</li>
        <ul class="contentWrapper">
            <li class="movieTitle">${targetedCardTitle}</li>
            <li class="movieScore">${targetScore}</li>
        </ul>
        </div><button class="addBookmarkBtn">북마크 추가</button>`;
            modalContainerInner.innerHTML += modalCardHtml;
            // 일반적인 상황에서의 html 넣기. 
        }
        // 닫기 버튼을 작동시키는 로직입니다.
        const closeBtn = document.querySelector(".closeBtn");
        closeBtn.addEventListener("click", function () {
            modalContainer.style.display = "none";
        });

        // 북마크 버튼을 작동시키는 로직입니다.
        const addBookmarkBtn = document.querySelector(".addBookmarkBtn");
        addBookmarkBtn.addEventListener("click", () => {
            if (Object.keys(localStorage).includes(targetedCardTitle)) {
                alert("이미 추가된 북마크입니다. 다른 걸 추가해주세요.");
            } else {
                alert("밍플릭스 북마크에 해당 영화가 추가되었습니다!");
                localStorage.setItem(targetedCardTitle, targetId);
            }
        });
    }
};

const bookmarkmodalAdd = function (e) {
    // 북마크 모달 안에 있는 카드들에 대한 추가 모달 로직. (북마크 안에 있는 카드 클릭하면 상세한 창이 뜸.)
    // bookmarkmodalAdd의 자식 요소 중에서 가장 가까운 modalcard를 선택.
    if (e.target.closest(".modalcard")) {
        if (e.target.tagName === "BUTTON") {
            e.stopPropagation(); // 이벤트 전파를 막음.
            if (e.target.innerText === "삭제") {
                const targetedCard = e.target.closest(".modalcard");
                const targetedCardTitle =
                    targetedCard.querySelector(".movieTitle").innerText;
                targetedCard.remove();
                localStorage.removeItem(targetedCardTitle);
                if (localStorage.length === 0) {
                    alert("해당 북마크가 삭제되었습니다.");
                    bookmarkModalContainerInner.innerHTML = `<p class="noMessage">북마크가 없습니다. 추가해주세요~</p>`; // '북마크가 없습니다' 메시지 추가
                } else {
                    alert("해당 북마크가 삭제되었습니다.");
                }
            }
            return; // 버튼 클릭 시에는 모달을 열지 않음.
        }
        modalContainer.style.display = "flex";
        modalContainerInner.innerHTML = "";

        // 이렇게 안의 html을 초기화하지 않으면 closeBtn이 작동하지 않아요!!

        const targetedCard = e.target.closest(".modalcard");

        const targetCardImg = targetedCard.querySelector(".posterOfMovie").src;

        const targetedCardTitle =
            targetedCard.querySelector(".movieTitle").innerText;

        const targetOverview =
            targetedCard.querySelector(".movieDetails").innerText;

        const targetScore = targetedCard.querySelector(".movieScore").innerText;
        const targetId = targetedCard.querySelector(".movieId").innerText;

        // 선택된 카드의 값들을 받아오는 변수 지정이에요.
        if (targetOverview === "") {
            const modalCardHtml = `<button class="closeBtn">
                    <img
                        src="img/x icon.png"
                        alt="닫기 버튼입니다."
                        style="width: 20px; height: 20px"
                    />
                </button><div class="modalCard">
            <img
            src="${targetCardImg}"
            alt="영화의 이미지가 표현됩니다." class ="modalImage"
        />
            <p class="movieIntroduce">영화의 자세한 소개가 적혀있지 않습니다.</li>
        <ul class="contentWrapper">
            <li class="movieTitle">${targetedCardTitle}</li>
            <li class="movieScore">${targetScore}</li>
        </ul>
        </div><button class="addBookmarkBtn">임시 북마크 버튼</button>`;
            modalContainerInner.innerHTML += modalCardHtml;
        } else {
            const modalCardHtml = `<button class="closeBtn">
                    <img
                        src="img/x icon.png"
                        alt="닫기 버튼입니다."
                        style="width: 20px; height: 20px"
                    />
                </button><div class="modalCard">
            <img
            src="${targetCardImg}"
            alt="영화의 이미지가 표현됩니다." class ="modalImage"
        />
            <p class="movieIntroduce">${targetOverview}</li>
        <ul class="contentWrapper">
            <li class="movieTitle">${targetedCardTitle}</li>
            <li class="movieScore">${targetScore}</li>
        </ul>
        </div>`;
            modalContainerInner.innerHTML += modalCardHtml;
        }
        // 닫기 버튼을 작동시키는 로직입니다.
        const closeBtn = document.querySelector(".closeBtn");
        closeBtn.addEventListener("click", function () {
            modalContainer.style.display = "none";
        });
    }
};
export { addCards, modalAdd, addBookmarkCards, bookmarkmodalAdd };
