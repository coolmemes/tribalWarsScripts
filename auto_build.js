// ==UserScript==
// @name         Auto Builder
// @version      0.2
// @description  Adds buildings to queue automatically
// @author       FunnyPocketBook
// @match        https://*/game.php?village=*&screen=main*
// @grant        none
// ==/UserScript==

/**
 * TODO
 * - buildingQueue.splice(0, 1); might cause issues because of async
 */

"use strict";
let buildingQueueLength;
let buildingQueue = [];
let selection;
let buildingQueueCounter = 0;
let scriptStatus = false; // false == script not running, true == script running

class BQueue {
    constructor(world, player, village) {
        this.world = world;
        this.player = player;
        this.village = village;
        this.buildingQueue = [];
    }
    add(building, display) {
        this.buildingQueue.push(building);
        if (display) {
            let ele = document.createElement("tr");
            ele.innerHTML = `<td>${building}</td>
                <td class="delete-icon-large hint-toggle float_left"></td>`
            ele.addEventListener("click", () => {
                this.removeBuilding(ele);
            })
            document.getElementById("autoBuilderTable").appendChild(ele);
        }
    }
    /**
     * Appends buildings to a table
     * @param {DOM element} parent The element (table) where the buildings should be appended to.
     */
    display(parent) {
        this.buildingQueue.forEach((building) => {
            let ele = document.createElement("tr");
            ele.innerHTML = `<td>${building}</td>
                <td class="delete-icon-large hint-toggle float_left"></td>`
            ele.addEventListener("click", () => {
                this.removeBuilding(ele);
            })
            parent.appendChild(ele);
        });
    }
    removeBuilding(ele) {
        this.buildingQueue.splice(ele.rowIndex - 3, 1);
        ele.remove();
        localStorage.buildingQueue = JSON.stringify(buildingQueue);
    }
}

init();

function init() {
    const putEleAfter = document.querySelector("#content_value > table:nth-child(2)");
    let newDiv = document.createElement("div");
    const selectBuildingHtml = '<td><select id="selectBuildingHtml"> ' +
        '<option value="main">Headquarters</option> ' +
        '<option value="barracks">Barracks</option> ' +
        '<option value="stable">Stable</option> ' +
        '<option value="garage">Workshop</option> ' +
        '<option value="watchtower">Watchtower</option> ' +
        '<option value="smith">Smithy</option> ' +
        '<option value="market">Market</option> ' +
        '<option value="wood">Timber Camp</option> ' +
        '<option value="stone">Clay Pit</option> ' +
        '<option value="iron">Iron Mine</option> ' +
        '<option value="farm">Farm</option> ' +
        '<option value="storage">Warehouse</option> ' +
        '<option value="hide">Hiding Place</option> ' +
        '<option value="wall">Wall</option> ' +
        '</select></td>';
    let newTable = `<table id="autoBuilderTable">
        <tr>
            <td><button id="startBuildingScript" class="btn">Start</button></td>
        </tr>
        <tr>
            <td>Queue length:</td>
            <td><input id='queueLengthInput' style='width:30px'></td>
            <td><button id='queueLengthBtn' class='btn'>OK</button></td>
            <td><span id='queueText'></span></td>
        </tr>
        <tr>
            <td>Building</td>
            ${selectBuildingHtml}
            <td><button id='addBuilding' class='btn'>Add</button></td>
        </tr>
        </table>`

    newDiv.innerHTML = newTable;
    putEleAfter.parentNode.insertBefore(newDiv, putEleAfter.nextSibling);

    selection = document.getElementById("selectBuildingHtml");

    if (localStorage.buildingQueueLength) {
        document.getElementById("queueLengthInput").value = localStorage.buildingQueueLength;
        buildingQueueLength = localStorage.buildingQueueLength;
    } else {
        document.getElementById("queueLengthInput").value = 2;
        buildingQueueLength = 2;
        localStorage.buildingQueueLength = buildingQueueLength;
    }

    if (localStorage.buildingQueue) {
        buildingQueue = JSON.parse(localStorage.buildingQueue);
        buildingQueue.forEach((b) => {
            addBuilding(b);
        });
    }

    eventListeners();

    if (localStorage.scriptStatus) {
        scriptStatus = JSON.parse(localStorage.scriptStatus);
        if (scriptStatus) {
            document.getElementById("startBuildingScript").innerText = "Stop";
            startScript();
        }
    }
}


function startScript() {
    let currentBuildLength = 0;
    if (document.getElementById("buildqueue")) {
        currentBuildLength = document.getElementById("buildqueue").rows.length - 2;
    }
    let buildInterval = setInterval(function () {
        let btn = document.querySelector(".btn-instant-free");
        if (btn && btn.style.display != "none") {
            btn.click();
        }
        if (buildingQueue.length !== 0) {
            let building = buildingQueue[0];
            let wood = parseInt(document.getElementById("wood").textContent);
            let stone = parseInt(document.getElementById("stone").textContent);
            let iron = parseInt(document.getElementById("iron").textContent);
            let woodCost = parseInt(document.querySelector("#main_buildrow_" + building + " > .cost_wood").getAttribute("data-cost"));
            let stoneCost = parseInt(document.querySelector("#main_buildrow_" + building + " > .cost_stone").getAttribute("data-cost"));
            let ironCost = parseInt(document.querySelector("#main_buildrow_" + building + " > .cost_iron").getAttribute("data-cost"));

            if (document.getElementById("buildqueue")) {
                currentBuildLength = document.getElementById("buildqueue").rows.length - 2;
            }
            if (currentBuildLength < buildingQueueLength && scriptStatus && wood >= woodCost && stone >= stoneCost && iron >= ironCost) {
                console.log("Sending build order for " + building);
                setTimeout(function () {
                    buildBuilding(building);
                }, Math.floor(Math.random() * 500 + 200));
            }
        }
    }, 1000);
}

function addBuilding(building) {
    let ele = document.createElement("tr");
    ele.innerHTML = `<td>${building}</td>
    <td class="delete-icon-large hint-toggle float_left"></td>`
    ele.addEventListener("click", function () {
        removeBuilding(ele);
    })
    document.getElementById("autoBuilderTable").appendChild(ele);
}

function buildBuilding(building) {
    let data = {
        "id": building,
        "force": 1,
        "destroy": 0,
        "source": game_data.village.id
    };
    let url = "/game.php?village=" + game_data.village.id + "&screen=main&ajaxaction=upgrade_building&id=" + building + "&type=main&h=" + game_data.csrf + "&client_time=" + Math.floor(Timing.getCurrentServerTime() / 1000);
    $.post(url, data, function () {
    })
        .done(function (response) {
            response = JSON.parse(response);
            if (response.error) {
                //UI.ErrorMessage(response.error[0]);
                console.error(response.error[0]);
            } else if (response.success) {
                UI.SuccessMessage(response.success);
                console.log(response.success);
                // TODO: might cause issues because of async
                buildingQueue.splice(0, 1);
                document.querySelector("#autoBuilderTable > tr").remove();
                localStorage.buildingQueue = JSON.stringify(buildingQueue);
                window.location.reload();
            }
        })
        .fail(function () {
            UI.ErrorMessage("Something bad happened. Please contact FunnyPocketBook#9373");
            console.log("Something bad happened. Please contact FunnyPocketBook#9373");
        });
}

/**
 * Removes the row of the building that should be removed. -2 because there are two other rows in the table
 * @param {DOM} ele table row of building queue to be removed
 */
function removeBuilding(ele) {
    buildingQueue.splice(ele.rowIndex - 3, 1);
    ele.remove();
    localStorage.buildingQueue = JSON.stringify(buildingQueue);
}

function eventListeners() {
    // #region Query
    // Enter triggers OK for "Queue length"
    document.getElementById("queueLengthInput").addEventListener("keydown", clickOnKeyPress.bind(this, 13, "#queueLengthBtn"));

    // Saves query length
    document.getElementById("queueLengthBtn").addEventListener("click", function () {
        if (!game_data.features.Premium.active) {
            buildingQueueLength = 2;
        } else {
            buildingQueueLength = parseInt(document.getElementById("queueLengthInput").value);
        }
        localStorage.buildingQueueLength = JSON.stringify(buildingQueueLength);
        if (!game_data.features.Premium.active) {
            document.getElementById("queueText").innerHTML = " Premium account not active, queue length set to 2.";
        } else if (parseInt(buildingQueueLength) > 5) {
            document.getElementById("queueText").innerHTML = " Queue length set to " + buildingQueueLength + ". There will be additional costs for more than 5 constructions in the queue";
        } else {
            document.getElementById("queueText").innerHTML = " Queue length set to " + buildingQueueLength;
        }
        document.getElementById("queueLengthInput").value = buildingQueueLength;
    });
    // #endregion Query

    // #region Building
    document.getElementById("addBuilding").addEventListener("click", function () {
        let b = selection.options[selection.selectedIndex].value;
        buildingQueue.push(selection.options[selection.selectedIndex].value);
        localStorage.buildingQueue = JSON.stringify(buildingQueue);
        addBuilding(b);
    });
    document.getElementById("startBuildingScript").addEventListener("click", function () {
        if (document.getElementById("startBuildingScript").innerText === "Start") {
            document.getElementById("startBuildingScript").innerText = "Stop";
            scriptStatus = true;
            localStorage.scriptStatus = JSON.stringify(scriptStatus);
            startScript();
        } else {
            document.getElementById("startBuildingScript").innerText = "Start";
            scriptStatus = false;
            localStorage.scriptStatus = JSON.stringify(scriptStatus);
        }
    });
    // #endregion Building
}

/**
 * Triggers a click on a keypress
 * @param {int} key key that has been pressed
 * @param {string} selector CSS selector of the element that is to be triggered
 */
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
