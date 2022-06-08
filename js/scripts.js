// -----START IS ON SCREEN-----
// Helper function from: http://stackoverflow.com/a/7557433/274826
const isElementInViewport = el => {
    const pixFromElementTop = 1;
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    let rect = el.getBoundingClientRect();
    return (
        (rect.top + pixFromElementTop <= 0 && rect.bottom >= 0) ||
        (rect.bottom + pixFromElementTop >=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top + pixFromElementTop <=
            (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top + pixFromElementTop >= 0 &&
            rect.bottom + pixFromElementTop <=
            (window.innerHeight || document.documentElement.clientHeight))
    );
};
// Detect request animation frame
let scroll =
    window.requestAnimationFrame ||
    // IE Fallback
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
let elementsToShow = document.querySelectorAll(".show-on-scroll");

const loop = () => {
    Array.prototype.forEach.call(elementsToShow, function (element) {
        if (isElementInViewport(element)) {
            element.classList.add("is-visible");
        } else {
            element.classList.remove("is-visible");
        }
    });

    scroll(loop);
};

// Call the loop for the first time
loop();

// -----END IS ON SCREEN-----





//get url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const locationNum = urlParams.get("locationNum");
const site = urlParams.get("site");
const from = urlParams.get("from");
let inputLocation = document.getElementsByClassName("systemfield12");
let inputSite = document.getElementsByClassName("systemfield52");
let inputFrom = document.getElementsByClassName("originatingleadcode");

let locationArray = [...inputLocation];
let siteArray = [...inputSite];
let fromArray = [...inputFrom];
locationArray.map(item => (item.value = locationNum));
siteArray.map(item => (item.value = site));
fromArray.map(item => (item.value = from));
