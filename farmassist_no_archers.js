// ==UserScript==
// @name     Farmassist Autofarm - No Archers
// @description Farms automatically with loot assistant
// @version 2.2
// @require https://code.jquery.com/jquery-3.2.1.min.js
// @include https://*/game.php?village=*&screen=am_farm*
// @namespace https://greasyfork.org/users/151096
// ==/UserScript==

let maxDistanceA = localStorage.maxDistanceA;
let maxDistanceB = localStorage.maxDistanceB;
let maxDistanceC = localStorage.maxDistanceC;
let maxDistance = maxDistanceA;
let switchSpeed;
let speed;
if(localStorage.speed) {
    speed = localStorage.speed;
} else {
    speed = 350;
    localStorage.speed = speed;
}
if(localStorage.switchSpeed) {
    switchSpeed = localStorage.switchSpeed;
} else {
    switchSpeed = 0;
    localStorage.switchSpeed = switchSpeed;
}
let stop;
if(localStorage.stop){
    stop = JSON.parse(localStorage.stop);
} else {
    stop = true;
    localStorage.stop = stop;
}
// Create input fields and stuff
const distanceInputDiv = document.createElement("div");
// Max distance
const letters = ["Maximum Farm Distance A ", "Maximum Farm Distance B ", "Maximum Farm Distance C "];
const distanceInput = ["<input id='distInputA' value=" + maxDistanceA + " style='width:30px'>",
    "<input id='distInputB' value=" + maxDistanceB + " style='width:30px'>",
    "<input id='distInputC' value=" + maxDistanceC + " style='width:30px'>"];
const buttons = ["<button id = 'buttonDistA' class = 'btn'>OK</button><span id='textA'></span>",
    "<button id = 'buttonDistB' class = 'btn'>OK</button><span id='textB'></span>",
    "<button id = 'buttonDistC' class = 'btn'>OK</button><span id='textC'></span>"];
for (let i = 0; i < 3; i++) {
    distanceInputDiv.innerHTML += "<p id=" + i + ">" + letters[i] + distanceInput[i] + buttons[i] + "</p>";
}
// Refresh page
distanceInputDiv.innerHTML += "<p>Refresh page/Switch village in ms " +
    "<input id='switchSpeed' value=" + switchSpeed + " style='width:50px'>" +
    "<button id = 'switchSpeedOk' class = 'btn'>OK</button><span id='textSwitch'></span></p>" +
    "<p>Difference in ms between attacks " +
    "<input id='attackMs' value='" + speed + "' style='width:30px'>" +
    "<button id='speedOk' class='btn'>OK</button><span id='textSpeed'></span> </p>" +
    "<p><button id='start-stop' class='btn'></button></p>";

const putAfter = document.querySelector("#content_value > h3");
putAfter.parentNode.insertBefore(distanceInputDiv, putAfter.nextSibling);


// Change farm button
$("#start-stop").click(function() {
    if(stop) {
        this.innerText = "Stop";
        stop = false;
        localStorage.stop = stop;
        checkUnits();
        startFarming();
    } else {
        this.innerText = "Start";
        stop = true;
        localStorage.stop = stop;
    }
});

// Save values to localStorage on OK click
$("#buttonDistA").click(function() {
    maxDistanceA = parseInt($("#distInputA").val());
    localStorage.maxDistanceA =  JSON.stringify(maxDistanceA);
    if(parseInt(maxDistanceA) === 0) {
        document.getElementById("textA").innerHTML = "A will not be used";
    } else {
        document.getElementById("textA").innerHTML = "Maximum distance A set to " + maxDistanceA;
    }
    document.getElementById("distInputA").value = maxDistanceA;
    checkUnits();
});

$("#buttonDistB").click(function() {
    maxDistanceB = parseInt($("#distInputB").val());
    localStorage.maxDistanceB =  JSON.stringify(maxDistanceB);
    if(parseInt(maxDistanceB) === 0) {
        document.getElementById("textB").innerHTML = "B will not be used";
    } else {
        document.getElementById("textB").innerHTML = "Maximum distance B set to " + maxDistanceB;
    }
    document.getElementById("distInputB").value = maxDistanceB;
    checkUnits();
});

$("#buttonDistC").click(function() {
    maxDistanceC = parseInt($("#distInputC").val());
    localStorage.maxDistanceC =  JSON.stringify(maxDistanceC);
    if(parseInt(maxDistanceC) === 0) {
        document.getElementById("textC").innerHTML = "C will not be used";
    } else {
        document.getElementById("textC").innerHTML = "Maximum distance C set to " + maxDistanceC;
    }
    document.getElementById("distInputC").value = maxDistanceC;
    checkUnits();
});

$("#switchSpeedOk").click(function() {
    switchSpeed = parseInt($("#switchSpeed").val());
    localStorage.switchSpeed =  JSON.stringify(switchSpeed);
    if(parseInt(switchSpeed) === 0) {
        document.getElementById("textSwitch").innerHTML = "Page won't reload and village won't switch";
    } else {
        document.getElementById("textSwitch").innerHTML = "Switch attackMs set to " + switchSpeed + "ms";
    }
    document.getElementById("switchSpeed").value = switchSpeed;
});

$("#speedOk").click(function() {
    speed = parseInt($("#attackMs").val());
    localStorage.speed =  JSON.stringify(speed);
    if(parseInt(speed) <= 200) {
        document.getElementById("textSpeed").innerHTML = "Can't set anything lower than 200";
        return;
    } else {
        document.getElementById("textSpeed").innerHTML = "Speed set to " + speed + "ms";
    }
    document.getElementById("attackMs").value = speed;
});

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



document.getElementById("distInputA").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#buttonDistA"));
document.getElementById("distInputB").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#buttonDistB"));
document.getElementById("distInputC").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#buttonDistC"));
document.getElementById("switchSpeed").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#switchSpeedOk"));
document.getElementById("attackMs").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#speedOk"));



let removeUnitsFrom;
let x = 0;
let farmButton;

// Save the values from your farm button A and B and the units in the village. It's ugly, but it works.
// I made it like this so the page reloads/village switches as soon as not enough units are in the village anymore.
let farmA = {
    spear: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(1) > input[type="text"]').value),
    sword: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]').value),
    axe: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(3) > input[type="text"]').value),
    spy: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(4) > input[type="text"]').value),
    light: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(5) > input[type="text"]').value),
    heavy: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(6) > input[type="text"]').value),
    knight: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(1) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(7) > input[type="text"]').value),
};

let farmB = {
    spear: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(1) > input[type="text"]').value),
    sword: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]').value),
    axe: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(3) > input[type="text"]').value),
    spy: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(4) > input[type="text"]').value),
    light: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(5) > input[type="text"]').value),
    heavy: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(6) > input[type="text"]').value),
    knight: parseInt(document.querySelector('#content_value > div:nth-child(4) > div > form:nth-child(2) > table > ' +
        'tbody > tr:nth-child(2) > td:nth-child(7) > input[type="text"]').value),
};

let unitInVill = {
    spear: parseInt(document.getElementById("spear").innerText),
    sword: parseInt(document.getElementById("sword").innerText),
    axe: parseInt(document.getElementById("axe").innerText),
    spy: parseInt(document.getElementById("spy").innerText),
    light: parseInt(document.getElementById("light").innerText),
    heavy: parseInt(document.getElementById("heavy").innerText),
    knight: parseInt(document.getElementById("knight").innerText)
};

function random(maximum, minimum) {
    let numPossibilities = maximum - minimum
    let aleat = Math.random() * numPossibilities
    return Math.round(parseInt(minimum) + aleat)
}

// If any any of the units in the village that are present are fewer than button A requires, butABoo will be set to
// false, meaning there aren't enough units in the village to send an attack with button A
function checkUnits() {
    if (unitInVill.spear < farmA.spear || unitInVill.sword < farmA.sword || unitInVill.axe < farmA.axe ||
        unitInVill.spy < farmA.spy || unitInVill.light < farmA.light || unitInVill.heavy < farmA.heavy ||
        unitInVill.knight < farmA.knight) {
        butABoo = false;
    } else {
        butABoo = true;
    }
// If any any of the units in the village that are present are fewer than button B requires, butABoo will be set to
// false, meaning there aren't enough units in the village to send an attack with button B
    if (unitInVill.spear < farmB.spear || unitInVill.sword < farmB.sword || unitInVill.axe < farmB.axe ||
        unitInVill.spy < farmB.spy || unitInVill.light < farmB.light || unitInVill.heavy < farmB.heavy ||
        unitInVill.knight < farmB.knight) {
        butBBoo = false;
    } else {
        butBBoo = true;
    }

    if (butABoo && $('#am_widget_Farm a.farm_icon_a').length > 0 && parseInt(maxDistanceA) !== 0) {
        farmButton = $('#am_widget_Farm a.farm_icon_a'); // Choose button A to farm with
        maxDistance = maxDistanceA;
        removeUnitsFrom = farmA;
    } else if (butBBoo && $('#am_widget_Farm a.farm_icon_b').length > 0 && parseInt(maxDistanceB) !== 0) {
        farmButton = $('#am_widget_Farm a.farm_icon_b'); // Choose button B to farm with
        maxDistance = maxDistanceB;
        removeUnitsFrom = farmB;
    } else {
        farmButton = $('#am_widget_Farm a.farm_icon_c'); // Choose button C to farm with
        maxDistance = maxDistanceC;
    }
}

checkUnits();

// Subtract units in FarmA or FarmB from unitInVill and update which farm button will be used
function removeUnits(farm) {
    unitInVill.spear -= farm.spear;
    unitInVill.sword -= farm.sword;
    unitInVill.axe -= farm.axe;
    unitInVill.spy -= farm.spy;
    unitInVill.light -= farm.light;
    unitInVill.heavy -= farm.heavy;
    unitInVill.knight -= farm.knight;
    checkUnits();
}

if(!stop) {
    document.getElementById("start-stop").innerText = "Stop";
    startFarming();
} else {
    document.getElementById("start-stop").innerText = "Start";
}
// The actual script to launch the attacks.
function startFarming() {
    let distance = 0; // Instantiate distance. It will record the distance from the village to the first barbarian
    // village in the farm assistant.
    const entries = parseInt(document.querySelector("#plunder_list > tbody").rows.length) - 2;
    for (let i = 0; i < entries; i++) {
        try {
            distance = parseFloat(document.querySelector("#plunder_list > tbody > tr:nth-child(" + (i + 3) + ") > " +
                "td:nth-child(8)").innerText); // Get the distance to the barb villa
        } catch(e) {}
        if (distance <= maxDistance) { // It will only launch the attacks that are within maxDist fields
            $(farmButton).eq(i).each(function () {
                if (!($(this).parent().parent().find('img.tooltip').length)) {
                    try {
                        removeUnits(removeUnitsFrom);
                    } catch(e){}
                    let speedNow = (speed * ++x) - random(250, 400);
                    setTimeout(function (myVar) {
                        if(!stop) {
                            $(myVar).click();
                            console.log("Sent");
                        }
                        if(document.querySelectorAll(".error").length) {
                            reload();
                        }
                    }, speedNow, this);
                }
            })
        }
    }
}
setTimeout(function () {
    if (parseInt(switchSpeed) !== 0) {
        reload();
    }
}, switchSpeed);
function pageReload() {
    window.location.reload();
}

function switchVillage() {
    document.querySelector('.arrowRight').click();
    document.querySelector('.groupRight').click();
}

function reload() {
    try {
        switchVillage()
    } catch (err) {
        pageReload();
    }
}