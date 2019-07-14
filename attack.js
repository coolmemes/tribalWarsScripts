let x = 555; // x coordinate of target
let y = 555; // y coordinate of target
let spearAmnt = 1;
let swordAmnt = 0;
let axeAmnt = 0;
let archerAmnt = 0;
let spyAmnt = 0;
let lightAmnt = 0;
let marcherAmnt = 0;
let heavyAmnt = 0;
let ramAmnt = 0;
let catapultAmnt = 0;
let knightAmnt = 0;
let snobAmnt = 0;
let catAttack = "main";

let data;
let attackAmnt;
let successCounter = 0;
let failureCounter = 0;

let key; // Weird obfuscated key that doesn't seem to be changing but maybe it will at some point
let value; // Value of the key

/**
 * Get the weird obfuscated key and value which is stored in the rally point
 */
$.get("game.php?village=" + game_data.village.id + "&screen=place", function(response) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(response, "text/html");
    key = dom.querySelector("#command-data-form > input:nth-child(1)").getAttribute("name");
    value = dom.querySelector("#command-data-form > input:nth-child(1)").value;
    // Form data for entering the attack dialog
    data = {
        key: value,
        "template_id": "",
        "source_village": game_data.village.id,
        "spear": spearAmnt,
        "sword": swordAmnt,
        "axe": axeAmnt,
        "archer": archerAmnt,
        "spy": spyAmnt,
        "light": lightAmnt,
        "marcher": marcherAmnt,
        "heavy": heavyAmnt,
        "ram": ramAmnt,
        "catapult": catapultAmnt,
        "knight": knightAmnt,
        "snob": snobAmnt,
        "x": x,
        "y": y,
        "target_type": "coord",
        "input": "",
        "attack": "Attack",
    };
});

let newElement = "<h4>Send attacks to coords collected by other script</h4><p><button id='coordsOk' class='btn'>OK</button><span id='attacksSent'></span></p><p><span id='attacksFailed'></span></p> ";
let targetElement = $("#overviewtable");
targetElement.prepend($(newElement));

$("#coordsOk").click(function() {
    if(localStorage.villageList) {
        let villageList = JSON.parse(localStorage.villageList);
        attackAmnt = villageList.length;
        document.querySelector("#attacksSent").innerText = "0 / " + attackAmnt + " attacks sent";
        let delay = 200;
        for(let i = 0; i < attackAmnt; i++) {
            delay += 200;
            setTimeout(function() {
                data.x = x = villageList[i][0];
                data.y = y = villageList[i][1];
                attack();
            }, delay)
        }
    }
});

/**
 * Send post request to attack dialog
 */
function attack() {
    let url = "game.php?village=" + game_data.village.id + "&screen=place&try=confirm";
    $.post(url, data).done(function (response) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(response, "text/html");
        if(dom.querySelector(".error_box")) { // Error check, cancel request on invalid command
            console.error("Error: " + dom.querySelector(".error_box").innerText.trim());
            document.querySelector("#attacksFailed").innerText = "";
            document.querySelector("#attacksFailed").innerText = ++failureCounter + " / " + attackAmnt + " attacks failed. Please see the console for more information.";
        } else {
            const ch = dom.getElementsByName("ch")[0].getAttribute("value"); // Get attack hash
            const timeout = Math.floor(Math.random() * 1000 + 500);
            setTimeout(function() {
                sendAttack(ch);
            }, timeout);
            console.log("Wait " + timeout + "ms");
        }
    });
}

function sendAttack(ch) {
    // Form data to confirm attack, needs to be duplicated due to different order (ban prevention)
    data = {
        "attack": true,
        "ch": ch,
        "x": x,
        "y": y,
        "source_village": game_data.village.id,
        "village": game_data.village.id,
        "attack_name": "",
        "spear": spearAmnt,
        "sword": swordAmnt,
        "axe": axeAmnt,
        "archer": archerAmnt,
        "spy": spyAmnt,
        "light": lightAmnt,
        "marcher": marcherAmnt,
        "heavy": heavyAmnt,
        "ram": ramAmnt,
        "catapult": catapultAmnt,
        "knight": knightAmnt,
        "snob": snobAmnt,
        "building": catAttack
    };
    let url = "game.php?village=" + game_data.village.id + "&screen=place&ajaxaction=popup_command&h=" + game_data.csrf + "&client_time" + Math.floor(Timing.getCurrentServerTime() / 1000);
    $.post(url, data).done(function (response) {
        if(response.includes("redirect")) {
            console.log("Attack successfully sent!");
            document.querySelector("#attacksSent").innerText = ++successCounter + " / " + attackAmnt + " attacks sent";
        } else {
            console.error(response);
            document.querySelector("#attacksFailed").innerText = "";
            document.querySelector("#attacksFailed").innerText = ++failureCounter + " / " + attackAmnt + " attacks failed. Please see the console for more information.";
        }
    });
}