// API KEY
// Generate an API key from OpenWeather API: https://developer.nytimes.com
const apiKey = "5e14Dx160Xmj9VDgazD0ib3V60hR0oe0";

// GLOBAL SELECTOR VARIABLES
const body = document.querySelector("body");
const showBtn = document.querySelector(".show-btn");
const news = document.querySelector(".news");
let flag = false;

showBtn.addEventListener("click", click);

function click() {
  flag = !flag;
  if (flag) {
    showArticles();
  } else {
    hideArticles();
  }
}

function hideArticles() {
  let ul = document.querySelector("ul");
  if (ul != null) {
    news.removeChild(ul);
  }
  body.classList.add("center");
}

function showArticles() {
  fetchArticles();
  body.classList.remove("center");
}

// Get most popular articles in nytimes
// https://developer.nytimes.com/docs/most-popular-product/1/overview
function fetchArticles() {
  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
  };
  fetch(url, options).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      alert("Fail to fetch article data.");
      throw new Error("No article found.");
    })
    .then(data => {
      const results = data.results
      console.log(results);
      let html = "";
      html += `<ul>`
      results.forEach(res => {
        console.log(res.id, res.published_date, res.title, res.url)
        html += `<li class="card" id="card-${res.id}}">
                  <div class="title">${res.title}</div>
                  <div class="date">${res.published_date}</div>
                  <div class="url">${res.url}</div>
                </li>`
        
        news.innerHTML = html
      });
      html += `</ul>`
    })
    .catch(err => {
      console.error(err);
    });
}