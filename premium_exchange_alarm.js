// ==UserScript==
// @name         Premium Exchange - Alert Resources
// @description  Plays horn sound whenever there is something in the stock
// @author       FunnyPocketBook
// @version      1.3
// @include      https://*/game.php*screen=market*
// @namespace    https://greasyfork.org/users/151096
// ==/UserScript==
let assetFolder = getComputedStyle(document.querySelector("body")).getPropertyValue("background-image").replace("url(\"", "").replace("/graphic/background/bg-image.jpg\")", ""); // Get the current asset folder
let audio = new Audio(assetFolder + "/graphic//sound/attack.ogg");
let woodOld = parseInt(document.getElementById("premium_exchange_stock_wood").textContent);
let stoneOld = parseInt(document.getElementById("premium_exchange_stock_stone").textContent);
let ironOld = parseInt(document.getElementById("premium_exchange_stock_iron").textContent);

let checkRes = setInterval(() => {
    let woodCurrent = parseInt(document.getElementById("premium_exchange_stock_wood").textContent);
    let stoneCurrent = parseInt(document.getElementById("premium_exchange_stock_stone").textContent);
    let ironCurrent = parseInt(document.getElementById("premium_exchange_stock_iron").textContent);
    if (woodCurrent > woodOld || stoneCurrent > stoneOld || ironCurrent > ironOld) {
        audio.play();
    }
    woodOld = parseInt(document.getElementById("premium_exchange_stock_wood").textContent);
    stoneOld = parseInt(document.getElementById("premium_exchange_stock_stone").textContent);
    ironOld = parseInt(document.getElementById("premium_exchange_stock_iron").textContent);
}, 100); 