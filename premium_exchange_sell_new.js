// ==UserScript==
// @name         Premium Exchange - Sell Resources
// @description  Automatically sell resources
// @author       FunnyPocketBook
// @version      2.2
// @include      https://*/game.php*screen=market*
// @namespace    https://greasyfork.org/users/151096
// ==/UserScript==
const incoming = "Incoming";
const outgoing = "Outgoing";
const timeout = 9000;
let leave, priceSell, stackSell;
let startSell = false;
let isBuying = false;

createInput();

function createInput() {
    "use strict";
    const userInputParent = _ID("premium_exchange_form"); // Parent element

    // Create input for setting how much res should be bought
    const divScript = document.createElement("div");
    divScript.setAttribute("id", "divScript");
    userInputParent.parentNode.insertBefore(divScript, userInputParent);
    _ID("divScript").innerHTML = "<p>Leave this much in warehouse: <input id='leaveInput'> " +
        "<button id='leaveOk' class='btn'>OK</button><span id='leaveText'></span></p><p>Sell when price above: <input id='priceSellInput'> " +
        "<button id='priceSellOk' class='btn'>OK</button><span id='priceSellText'></span></p>" +
        "<p>Sell max this much at once: <input id='stackSellInput'> <button id='stackSellOk' class='btn'>OK</button><span id='stackSellText'></span></p>" +
        "<p>Sell resources:</p><p><input type=\"checkbox\" name=\"wood\" id=\"woodCheck\"> Wood <input type=\"checkbox\" " +
        "name=\"stone\" id=\"stoneCheck\"> Stone <input type=\"checkbox\" name=\"iron\" id=\"ironCheck\"> Iron</p>" +
        "<p><button id='startSell' class='btn'></button></p>";
    if (!startSell) {
        _ID("startSell").innerHTML = "Start";
    } else {
        _ID("startSell").innerHTML = "Stop";
    }
    if (localStorage.leave) {
        _ID("leaveInput").value = localStorage.leave;
        leave = localStorage.leave;
    }
    if (localStorage.priceSell) {
        _ID("priceSellInput").value = localStorage.priceSell;
        price = localStorage.priceSell;
    }
    if (localStorage.stackSell) {
        _ID("stackInput").value = localStorage.stackSell;
        stack = localStorage.stackSell;
    }
}

_ID("leaveOk").addEventListener("click", function() {
    leave = _ID("leaveInput").value;
    localStorage.leave = leave;
    _ID("leaveText").innerHTML = "Top up to " + leave;
});
_ID("priceSellOk").addEventListener("click", function() {
    priceSell = _ID("priceSellInput").value;
    localStorage.price = price;
    _ID("priceSellText").innerHTML = "Sell when price above " + priceSell;
});
_ID("stackSellOk").addEventListener("click", function() {
    stackSell = _ID("stackInput").value;
    localStorage.stack = stackSell;
    _ID("stackSellText").innerHTML = "Sell only " + stackSell + " resources at once";
});
_ID("startSell").addEventListener("click", function() {
    if (startSell) {
        startSell = false;
        _ID("startSell").innerHTML = "Start";
    } else {
        start = true;
        _ID("startSell").innerHTML = "Stop";
        sellRes();
    }
});

_ID("leaveInput").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#leaveOk"));
_ID("priceSellInput").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#priceSellOk"));
_ID("stackSellInput").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#stackSellOk"));

let warehouse = game_data.village.res[6];
let wood = game_data.village.wood;
let stone = game_data.village.stone;
let iron = game_data.village.iron;
let woodPriceSell = parseInt(__("#premium_exchange_rate_wood > div:nth-child(1)").innerText);
let stonePriceSell = parseInt(__("#premium_exchange_rate_stone > div:nth-child(1)").innerText);
let ironPriceSell = parseInt(__("#premium_exchange_rate_iron > div:nth-child(1)").innerText);
let woodOut = 0;
let stoneOut = 0;
let ironOut = 0;
const sellWoodInput = __("#premium_exchange_buy_wood > div:nth-child(1) > input");
const sellStoneInput = __("#premium_exchange_buy_stone > div:nth-child(1) > input");
const sellIronInput = __("#premium_exchange_buy_iron > div:nth-child(1) > input");

if (startSell) {
    sellRes();
}
const interval = setInterval(function() {
    if (startSell && (!document.querySelector("#fader") || document.querySelector("#fader").style.display === "none")) {
        sellRes();
    }
}, timeout);

function sellRes() {
    getRes();
    if (wood + woodInc < leave || stone + stoneInc < leave || iron + ironInc < leave) {
        if (woodPrice > price && wood + woodInc < leave && __("#woodCheck").checked) {
            // Buy wood
            let buyWoodAmnt = leave - wood - woodInc;
            if (buyWoodAmnt <= 0) {
                buyWoodAmnt = woodPrice - 2;
            }
            if(buyWoodAmnt > stack) {
                buyWoodAmnt = stack;
            }
            buyStoneInput.value = "";
            buyIronInput.value = "";
            buyWoodInput.value = buyWoodAmnt;
            clickBuy();
        } else if (stonePrice > price && stone + stoneInc < leave && __("#stoneCheck").checked) {
            // Buy stone
            let buyStoneAmnt = leave - stone - stoneInc;
            if (buyStoneAmnt <= 0) {
                buyStoneAmnt = stonePrice - 2;
            }
            if(buyStoneAmnt > stack) {
                buyStoneAmnt = stack;
            }
            buyWoodInput.value = "";
            buyIronInput.value = "";
            buyStoneInput.value = buyStoneAmnt;
            clickBuy();
        } else if (ironPrice > price && iron + ironInc < leave && __("#ironCheck").checked) {
            // Buy iron
            let buyIronAmnt = leave - iron - ironInc;
            if (buyIronAmnt <= 0) {
                buyIronAmnt = ironPrice - 2;
            }
            if(buyIronAmnt > stack) {
                buyIronAmnt = stack;
            }
            buyWoodInput.value = "";
            buyStoneInput.value = "";
            buyIronInput.value = buyIronAmnt;
            clickBuy();
        }
    }
}

function clickBuy() {
    __("#premium_exchange_form > input").click();
    setTimeout(function() {
        //__("#premium_exchange > div > div > div.confirmation-buttons > button.btn.evt-confirm-btn.btn-confirm-yes").click();
    }, 1000);
}

function buy(res, amnt) {
    isBuying = true; // Making sure that it only starts the buying process once
    let exchangeBeginUrl = window.location.origin + "/game.php?village=" + game_data.village.id + "&screen=market&ajaxaction=exchange_begin";
    let data = {};
    data["buy_" + res] = amnt;
    data.h = game_data.csrf;
    $.post(exchangeBeginUrl, data, (r) => {
        r = JSON.parse(r);
        if (r.error) {
            isBuying = false;
            return;
        }
        let rate_hash = r[0].rate_hash;
        let buy_amnt = r[0].amount;
        let exchangeConfirmUrl = window.location.origin + "/game.php?village=" + game_data.village.id + "&screen=market&ajaxaction=exchange_confirm";
        data["rate_" + res] = rate_hash;
        data["buy_" + res] = buy_amnt;
        data["mb"] = 1;
        data.h = game_data.csrf;
        $.post(exchangeConfirmUrl, data, (r) => {
            isBuying = false;
            r = JSON.parse(r);
            if (r.success) {
                UI.SuccessMessage("Bought " + buy_amnt + " " + res + "!");
                console.log("Bought " + buy_amnt + " " + res + "!");
                $("#market_status_bar").replaceWith(r.data.status_bar);
                getRes();
            }
        })
    })
}

function _ID(selector) {
    return document.getElementById(selector);
}

function __(selector) {
    return document.querySelector(selector);
}

function getRes() {
    let parentInc;
    warehouse = game_data.village.res[6];
    wood = game_data.village.wood;
    stone = game_data.village.stone;
    iron = game_data.village.iron;
    woodPrice = parseInt(__("#premium_exchange_rate_wood > div:nth-child(1)").innerText);
    stonePrice = parseInt(__("#premium_exchange_rate_stone > div:nth-child(1)").innerText);
    ironPrice = parseInt(__("#premium_exchange_rate_iron > div:nth-child(1)").innerText);
    try {
        if (__("#market_status_bar > table:nth-child(2) > tbody > tr > th:nth-child(1)").innerHTML.split(" ")[0].replace(":", "") === incoming) {
            parentInc = __("#market_status_bar > table:nth-child(2) > tbody > tr > th:nth-child(1)");
        }
    } catch(e) {}
    try {
        if (__("#market_status_bar > table:nth-child(2) > tbody > tr > th:nth-child(2)").innerHTML.split(" ")[0].replace(":", "") === incoming) {
            parentInc = __("#market_status_bar > table:nth-child(2) > tbody > tr > th:nth-child(2)");
        }
    } catch(e) {}

    try {
        woodInc = setZeroIfNaN(parseInt(parentInc.querySelector(".wood").parentElement.innerText.replace(".", "")));
    } catch (e) {}
    try {
        stoneInc = setZeroIfNaN(parseInt(parentInc.querySelector(".stone").parentElement.innerText.replace(".", "")));
    } catch (e) {}
    try {
        ironInc = setZeroIfNaN(parseInt(parentInc.querySelector(".iron").parentElement.innerText.replace(".", "")));
    } catch (e) {}
}

function clickOnKeyPress(key, selector) {
    "use strict";
    if (event.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
    }
    let handled = false;
    if (event.key === key) {
        document.querySelector(selector).click();
        handled = true;
    } else if (event.keyIdentifier === key) {
        document.querySelector(selector).click();
        handled = true;
    } else if (event.keyCode === key) {
        document.querySelector(selector).click();
        handled = true;
    }
    if (handled) {
        event.preventDefault();
    }
}

function setZeroIfNaN(x) {
    "use strict";
    if ((typeof x === 'number') && (x % 1 === 0)) {
        return x;
    } else {
        return 0;
    };
}