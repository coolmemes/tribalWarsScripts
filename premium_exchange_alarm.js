// ==UserScript==
// @name         Premium Exchange - Alert Resources
// @description  Plays horn sound whenever there is something in the stock
// @author       FunnyPocketBook
// @version      1.2
// @include      https://*/game.php*screen=market*
// @namespace    https://greasyfork.org/users/151096
// ==/UserScript==

let audio = new Audio("http://soundbible.com/grab.php?id=1598&type=mp3");
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