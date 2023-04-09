// const idBtnBack = "btnBack";
// const btnBack = document.getElementById(idBtnBack);


// function addLink(event) {
//    const link = "/" + event.target.dataset.link;
//    window.history.replaceState("object or string", "Title", "");
//    window.history.pushState("object or string", "Title", link);
//    console.log(window.history);
// }

// function clearPath() {
// window.location.href = window.location.href.replace(/#promptbase/g, "");
// window.location.href += "#main";
// }


// window.addEventListener('pushstate', () => {
//    console.log("You're visiting a cool feature!");
// });

// function clearPath() {
// const url = window.location.toString();
// window.location.hash = "";
// url = url.replace(/#/, "google");
// window.location = window.location.toString() + "#string";
// }

// function add


document.addEventListener("click", e => {
   if (e.target.classList.contains("link")) {
      route(e);
   }
   e.preventDefault();
});

const route = (e) => {
   const link = e.target.dataset.href;
   window.history.pushState({}, "", link);
   handleLocation();
};

const routers = {
   "/": "main.html",
   "/promptbase": "promptbase.html",
   "/pinterest": "pinterest.html",
   "/opensea": "opensea.html"
};

const handleLocation = async () => {
   const path = window.location.pathname;
   const html = await fetch(routers[path]).then(data => data.text());
   document.getElementById("main").innerHTML = html;
};

window.onpopstate = handleLocation();
window.route = route;
handleLocation();