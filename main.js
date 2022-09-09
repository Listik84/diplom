let newsAPI = "http://api.mediastack.com/v1/news?countries=us,in&access_key=4d7cd9a8b38b8eb8ce825c1ac633c96f&categories=";
let noImage = "tttt.jpg"

let app = document.querySelector(".app");
let screen = {
    main: app.querySelector(".main-screen"),
    news: app.querySelector(".news-screen")
};

let catagories = ["General", "Business", "Technology", "Entertaiment", "Healt", "Science", "Sports"];

for (let i = 0; i < catagories.length; i++) {
    let div = document.createElement("div");
    div.innerText = catagories[i];
    div.addEventListener("click", function () {
        screen.main.querySelector(".menu .active").classList.remove("active");
        div.classList.add("active");
        fetchCatagoryNews(catagories[i]);
    });
    if (i == 0) {
        div.classList.add("active");
        fetchCatagoryNews(catagories[i]);
    }
    screen.main.querySelector(".menu").appendChild(div);
}

async function fetchCatagoryNews(catagory) {
    screen.main.querySelector(".content-list").innerHTML = "";
    try {
        let res = await fetch(newsAPI + catagory.toLowerCase());
        let data = await res.json();
        let news = data.data;
        console.log(data)
        

        for (let i = 0; i < news.length; i++) {
            let div = document.createElement("div");
            div.classList.add("item");
            div.addEventListener("click", function () {
                shoFullNews(news[1]);
            });
            div.innerHTML = `
                <div class ="thumbnail">
                    <img src="${news[i].image || noImage}">
                </div>
                <div class="details">
                    <h2>${news[i].title}</h2>
                    <p>${news[i].description}</p>
                </div>
            `;
            screen.main.querySelector(".content-list").appendChild(div);
        }
    } catch (msg) { }
}

function shoFullNews(news) {
    screen.main.classList.add("hidden");
    screen.news.classList.remove("hidden");

    screen.news.querySelector(".header .title").innerText = news.title;
    screen.news.querySelector(".header .back-btn").addEventListener("click", function () {
        screen.news.classList.add("hidden");
        screen.main.classList.remove("hidden");
        
    });
    screen.news.querySelector("#news-frame").src = news.url;


}