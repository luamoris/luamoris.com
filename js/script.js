// add

const contentId = "content";
const contentContainerCs = "content__container";
const mainCardId = "main";
const addCardId = "add";
const addBodyCs = "card__body";

const contentElm = document.getElementById(contentId);
const contentContainerEml = contentElm.querySelector("." + contentContainerCs);
const mainCardElm = document.getElementById(mainCardId);
const addCardElm = document.getElementById(addCardId);
const addCardBodyElm = addCardElm.querySelector("." + addBodyCs);

const csLink = "link";
const idBtnClose = "btnClose";

const linkElms = mainCardElm.querySelectorAll("." + csLink);
const btnCloseElm = addCardElm.querySelector("#" + idBtnClose);


// Class Names
const csContentAdd = "content_add";
const csContentAnimation = "content_animation";
const csNoEvent = "no-event";
const csVisible = "_visible";
const csInvisible = "_invisible";

// Values
const swapMs = 500;
let activePage = "";


// Hash Controller
function hashController() {
   const set = hash => {
      window.location.hash = hash;
   };
   const del = () => {
      history.pushState({}, "", "/");
   };

   return {
      set,
      del,
   }
}

const hash = hashController();

// Content

const blockTitles = {
   promptbase: "promptbase",
   pinterest: "pinterest",
   opensea: "opensea",
}

function getHtmlPromptbase() {
   return "<h1>Promptbase</h1>";
}

function updateHtmlPromptbase() { }

function getHtmlPinterest() {
   return "<h1>Pinterest</h1>";
}

function updateHtmlPinterest() { }

function getHtmlOpensea() {
   return "<h1>Opensea</h1>";
}

function updateHtmlOpensea() { }


const getBlock = title => {
   switch (title) {
      case blockTitles.promptbase:
         return getHtmlPromptbase();
      case blockTitles.pinterest:
         return getHtmlPinterest();
      case blockTitles.opensea:
         return getHtmlOpensea();
      default:
         break;
   }
};

const updateBlock = title => {
   switch (title) {
      case blockTitles.promptbase:
         return updateHtmlPromptbase();
      case blockTitles.pinterest:
         return updateHtmlPinterest();
      case blockTitles.opensea:
         return updateHtmlOpensea();
      default:
         break;
   }
};


//  Function
function addNoEvent() {
   contentContainerEml.classList.add(csNoEvent);
   setTimeout(() => {
      contentContainerEml.classList.remove(csNoEvent);
   }, swapMs);
}

function applyAddCard(isTransition) {
   if (isTransition) {
      if (!contentElm.classList.contains(csContentAnimation)) {
         contentElm.classList.add(csContentAnimation);
      }
      addNoEvent();
   } else if (!isTransition) {
      if (contentElm.classList.contains(csContentAnimation)) {
         contentElm.classList.remove(csContentAnimation);
      }
   }
   contentElm.classList.add(csContentAdd);
   mainCardElm.classList.add(csInvisible);
   addCardElm.classList.remove(csInvisible);
}

function closeAddCard() {
   if (!contentElm.classList.contains(csContentAnimation)) {
      contentElm.classList.add(csContentAnimation);
   }
   addNoEvent();
   contentElm.classList.remove(csContentAdd);
   mainCardElm.classList.remove(csInvisible);
   addCardElm.classList.add(csInvisible);
}

function setCardContent(html) {
   addCardBodyElm.innerHTML = html;
}

function delCardContent() {
   addCardBodyElm.innerHTML = "";
}


function setAdd(href, isTransition) {
   hash.set(href);
   if (activePage !== href) {
      const html = getBlock(href);
      delCardContent();
      setCardContent(html);
   }
   activePage = href;
   applyAddCard(isTransition);
   updateBlock(href);
}

function delAdd() {
   hash.del();
   closeAddCard();
}

// Start
function start() {
   const hash = window.location.hash;
   if (hash) {
      const href = hash.slice(1, hash.length);
      setAdd(href, false);
   }
}

start();

// Extions
linkElms.forEach(link => link.addEventListener("click", e => setAdd(e.target.dataset.href, true)));
btnCloseElm.addEventListener("click", delAdd);


// SHARE
const logoId = "logo";
const logoEml = document.getElementById(logoId);

const shareUrl = window.location.href;
const shareTitle = "I am combine my passion for art, programming, and artificial intelligence to create original ideas that bring beauty to the world 🚀\n";

logoEml.addEventListener('click', () => {
   if (navigator.share) {
      navigator.share({
         title: shareTitle,
         url: shareUrl,
      }).catch(console.error);
   } else {
      alert('Sorry!\nThis function is not available on your device.');
   }
});