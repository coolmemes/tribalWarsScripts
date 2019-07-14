let unitConfigUrl = "https://en108.tribalwars.net/interface.php?func=get_unit_info";
let units;
let data;
let attackAmnt;
let successCounter = 0;
let failureCounter = 0;

let key; // Weird obfuscated key that doesn't seem to be changing but maybe it will at some point
let value; // Value of the key

let arrivalTime;

// HTML for attack
let attackTitle = 
`<h4>Send attacks to coords collected by other script</h4>
<p>
    <button id='sendAttacks' class='btn'>OK</button><span id='attacksSent'></span></p>
<p><span id='attacksFailed'></span></p>`;
let titleParent = $("#contentContainer");

// HTML for get player
let getPlayerTitle = 
`<h4>Get coordintes of players</h4>
<div>
    <textarea id='playerList' name='playerList' placeholder='Put player names here, separated by line break'></textarea>
</div>
<button id='playerListOk' class='btn'>OK</button>
<button id='reset' class='btn'>Reset</button>
<p><span id='errorPlayer'></span></p>
<p><span id='addedVillages'></span></p>`;
let playerList = [];
let villageList = [];

// HTML for config
// TODO: Depending on the world, archers/paladin may be available. Get the world config and build up the unit config from the world config, checking each unit
// TODO: Add catapult target
// TODO: Add textarea to insert specific villages to attack one village multiple times
// To manually add one village n times, do the following:
/*
for (i = 0; i < n; i++) {
    villageList.push([x-coordinates, y-coordinates]);
}
localStorage.villageList = JSON.stringify(villageList);
*/
let unitConfig = 
`<h4>Set troops to send</h4>
<table style="margin-bottom: 10px" class="vis" width="100%">
    <tbody>
        <tr>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="spear"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_spear.png" title="Spear fighter" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="sword"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_sword.png" title="Swordsman" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="axe"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_axe.png" title="Axeman" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="archer"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_archer.png" title="Archer" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="spy"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_spy.png" title="Scout" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="light"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_light.png" title="Light cavalry" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="marcher"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_marcher.png" title="Mounted archer" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="heavy"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_heavy.png" title="Heavy cavalry" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="ram"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_ram.png" title="Ram" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="catapult"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_catapult.png" title="Catapult" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="knight"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_knight.png" title="Paladin" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                <a href="#" class="unit_link" data-unit="snob"><img src="https://dsen.innogamescdn.com/asset/10d39b3d/graphic/unit/unit_snob.png" title="Nobleman" alt="" class=""></a>
            </th>
            <th style="text-align:center" width="35">
                Catapult target
            </th>
            <td width="15%" align="center">
                <div class="vis_item">
                    <input id="saveUnitConfig" class="btn" type="submit" value="Save">
                </div>
            </td>
        </tr>
        <tr>
            <td align="center">
                <input id="spearInput" type="text" name="spear" size="3" value="0">
            </td>
            <td align="center">
                <input id="swordInput" type="text" name="sword" size="3" value="0">
            </td>
            <td align="center">
                <input id="axeInput" type="text" name="axe" size="3" value="0">
            </td>
            <td align="center">
                <input id="archerInput" type="text" name="archer" size="3" value="0">
            </td>
            <td align="center">
                <input id="spyInput" type="text" name="spy" size="3" value="0">
            </td>
            <td align="center">
                <input id="lightInput" type="text" name="light" size="3" value="0">
            </td>
            <td align="center">
                <input id="marcherInput" type="text" name="marcher" size="3" value="0">
            </td>
            <td align="center">
                <input id="heavyInput" type="text" name="heavy" size="3" value="0">
            </td>
            <td align="center">
                <input id="ramInput" type="text" name="ram" size="3" value="0">
            </td>
            <td align="center">
                <input id="catapultInput" type="text" name="catapult" size="3" value="0">
            </td>
            <td align="center">
                <input id="knightInput" type="text" name="knight" size="3" value="0">
            </td>
            <td align="center">
                <input id="snobInput" type="text" name="snob" size="3" value="0">
            </td>
            <td>
                <select id="selectBuilding">
                    <option value="main">Headquarters</option>
                    <option value="barracks">Barracks</option>
                    <option value="stable">Stable</option>
                    <option value="garage">Workshop</option>
                    <option value="watchtower">Watchtower</option>
                    <option value="smith">Smithy</option>
                    <option value="market">Market</option>
                    <option value="wood">Timber Camp</option>
                    <option value="stone">Clay Pit</option>
                    <option value="iron">Iron Mine</option>
                    <option value="storage">Warehouse</option>
                    <option value="wall">Wall</option>
                </select>
            </td>
            <td align="center">
                <div class="vis_item">
                    <input id="saveTemplate" class="btn" type="submit" value="Save Template">
                </div>
            </td>
        </tr>
    </tbody>
</table>
<p><span id="addedUnitConfig"></span></p>`;

const selectBuilding = 
`<td>
    <select id="selectBuilding">
        <option value="main">Headquarters</option>
        <option value="barracks">Barracks</option>
        <option value="stable">Stable</option>
        <option value="garage">Workshop</option>
        <option value="watchtower">Watchtower</option>
        <option value="smith">Smithy</option>
        <option value="market">Market</option>
        <option value="wood">Timber Camp</option>
        <option value="stone">Clay Pit</option>
        <option value="iron">Iron Mine</option>
        <option value="storage">Warehouse</option>
        <option value="hide">Hiding Place</option>
        <option value="wall">Wall</option>
    </select>
</td>`;

titleParent.prepend($(unitConfig));
titleParent.prepend($(attackTitle));
titleParent.prepend($(getPlayerTitle));

class Units {
    constructor(spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, paladin, snob, catapultAttack) {
        this.spear = spear;
        this.sword = sword;
        this.axe = axe;
        this.archer = archer;
        this.spy = spy;
        this.light = light;
        this.marcher = marcher;
        this.heavy = heavy;
        this.ram = ram;
        this.catapult = catapult;
        this.paladin = paladin;
        this.snob = snob;
        this.catapultAttack = catapultAttack;
    }
}

// Save units
$("#saveUnitConfig").click(function() {
    units = new Units(
        document.getElementById("spearInput").value,
        document.getElementById("swordInput").value,
        document.getElementById("axeInput").value,
        document.getElementById("archerInput").value,
        document.getElementById("spyInput").value,
        document.getElementById("lightInput").value,
        document.getElementById("marcherInput").value,
        document.getElementById("heavyInput").value,
        document.getElementById("ramInput").value,
        document.getElementById("catapultInput").value,
        document.getElementById("knightInput").value,
        document.getElementById("snobInput").value,
        document.getElementById("selectBuilding").value
    );
    getKey();
    document.getElementById("addedUnitConfig").innerHTML = "Saved units.";
    setTimeout(() => {
        document.getElementById("addedUnitConfig").innerHTML = "";
    }, 5000);
});

// Save template
$("#saveTemplate").click(function() {
    units = new Units(
        document.getElementById("spearInput").value,
        document.getElementById("swordInput").value,
        document.getElementById("axeInput").value,
        document.getElementById("archerInput").value,
        document.getElementById("spyInput").value,
        document.getElementById("lightInput").value,
        document.getElementById("marcherInput").value,
        document.getElementById("heavyInput").value,
        document.getElementById("ramInput").value,
        document.getElementById("catapultInput").value,
        document.getElementById("knightInput").value,
        document.getElementById("snobInput").value,
        document.getElementById("selectBuilding").value
    );
    getKey();
    document.getElementById("addedUnitConfig").innerHTML = "Saved units.";
    setTimeout(() => {
        document.getElementById("addedUnitConfig").innerHTML = "";
    }, 5000);
});


//#region get player

// Store the villages of the players 
$("#playerListOk").click(function() {
    let lines = document.getElementById("playerList").value.trim().split('\n'); // Get the player names by line, discard any empty lines
    localStorage.villageList = ""; // Initialize localStorage.villageList or empty the list for new villages
    for (let i = 0; i < lines.length; i++) {
        let player = lines[i].trim();
        if (player === "") {}
        else if (playerList.includes(player)) {
            console.log(player + " is a duplicate.");
        } else {
            playerList.push(player); // Store player name in global variable and replace any whitespace with a + (plus) 
        }
    }
    console.log(playerList);
    // Get player ID
    $.get("/map/player.txt", function(response) {
        getCoordinates(playerList, response);
    });
});

// Reset everything
$("#reset").click(function() {
    localStorage.villageList = ""; 
    playerList = [];
    villageList = [];
    document.getElementById("addedVillages").innerHTML = "";
    document.getElementById("errorPlayer").innerHTML = "";
    document.getElementById("playerList").value = "";
});

function getCoordinates(playerList, response) {
    let playerListLength = playerList.length;
    document.querySelector("#errorPlayer").innerText = "";
    for (let i = 0; i < playerListLength; i++) {
        let found = false; // Boolean is used to check if the villages of the player
        let player = playerList[i];
        // If the player has already been added, i.e. there is a village in villageList that belongs to player, skip the player
        for (let j = 0; j < villageList.length; j++) {
            if (villageList[j][3] == player) {
                found = true;
                break;
            }
        }
        if (found) {
            document.querySelector("#addedVillages").innerHTML += player + " is already in here! <br />";
            continue;
        }
        let anchorBool = false;
        let playerIdTxt;
        // TODO: Use encodeURIComponent(str) and other methods to convert special characters (encodeURIComponent("*") doesn't work, it stays * but in the API it's stored as %2A)
        let playerParsed = player;
        if (player != undefined) {
            playerParsed = player.replace(" ", "\\+"); // The API is storing spaces as +, so use this one to get the player. For display purposes, variable player remains untouched
        }
        let playerMatch = response.match('\\d*,' + playerParsed + '\\b,'); // Get the player from the API along with his ID
        if (!response.match('\\d*,' + playerParsed + '\\b,')) {
            document.querySelector("#errorPlayer").innerText += "Couldn't get coordinates for " + player + ". Please check the names entered for mistakes. </br>";
            playerList.pop();
        }
        if (playerMatch) {
            playerIdTxt = parseInt(playerMatch[0].replace("," + playerParsed + ",", ""));// Get profile page of player
            // The villages for each player are received by going through their profile page instead of the API 
            // /map/village.txt since the API is only updated every hour, which is not frequent enough.
            $.get("/game.php?village=" + game_data.village.id + "&screen=info_player&id=" + playerIdTxt, function(response) {
                const parser = new DOMParser();
                let dom = parser.parseFromString(response, "text/html");
                let anchor;
                const link = "/game.php?village=" + game_data.village.id + "&screen=info_player&ajax=fetch_villages&player_id=" + playerIdTxt;
                // TODO: Very janky checking if the player has more than 100 villages to retreive all villages. Change it to either check the table header or number of table rows
                if (dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(101) > td:nth-child(1) > a:nth-child(1)")) {
                    // Get the table row with the link to get more villages
                    anchor = dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(101) > td:nth-child(1) > a:nth-child(1)"); 
                    anchorBool = true;
                }
                getAllVillages(link, dom);
                // Remove the "Get all villages" link if it exists
                if (anchorBool) {
                    anchor.parentElement.parentElement.outerHTML = "";
                }
            });
        } else {
            console.error("Player not found.");
        }
    }
    playerList.length = 0;
}

function getAllVillages(link, dom) { // Get additional villages that are not displayed (> 100 villages)
    $.get(link, { }, function(data) { // Get request
        dom.querySelector('#villages_list > tbody').innerHTML += data.villages; // Add villages to village list
        getAllCoordinates(dom);
    }, 'json');
}

/**
 * Get all villages from the player via his profile page
 * @param {*} dom HTML dom of the player profile page 
 */
function getAllCoordinates(dom) {
    let length = dom.getElementById("villages_list").rows.length ;
    let coords = "";
    let x = 0;
    let y = 0;
    let playerName = dom.querySelector("#player_info > tbody:nth-child(1) > tr:nth-child(1) > th:nth-child(1)").innerText.trim();
    // Add each village to villageList as an array in the form of [x, y, continent, playerName]
    for (let i = 1; i < length; i++) {
        coords = dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").innerText;
        x = coords.substring(0, 3);
        y = coords.substring(4, 7);
        villageList.push([parseInt(x), parseInt(y), "K" + y.toString().charAt(0) + x.toString().charAt(0), playerName]);
    }
    console.log("Added " + (length - 1) + " villages from " + playerName + " to the list.")
    document.querySelector("#addedVillages").innerHTML += "Added " + (length - 1) + " villages from " + playerName + 
        " to the list. Total villages in list: " + villageList.length + "<br />";
    console.log(villageList);
    localStorage.villageList = JSON.stringify(villageList);
}
//#endregion get player


//#region attack
/**
 * Get the weird obfuscated key and value which is stored in the rally point and set data
 */
function getKey() {
    $.get("game.php?village=" + game_data.village.id + "&screen=place", function(response) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(response, "text/html");
        key = dom.querySelector("#command-data-form > input:nth-child(1)").getAttribute("name");
        value = dom.querySelector("#command-data-form > input:nth-child(1)").value;
        // Form data for entering the attack dialog
        // Data for support
        /* data = {
            key: value,
            "template_id": "",
            "source_village": game_data.village.id,
            "spear": units.spear,
            "sword": units.sword,
            "axe": units.axe,
            "archer": units.archer,
            "spy": units.spy,
            "light": units.light,
            "marcher": units.marcher,
            "heavy": units.heavy,
            "ram": units.ram,
            "catapult": units.catapult,
            "knight": units.knight,
            "snob": units.snob,
            "x": 0,
            "y": 0,
            "target_type": "coord",
            "input": "",
            "support": "Support",
        };*/

        // Data for attack
        
        data = {
            key: value,
            "template_id": "",
            "source_village": game_data.village.id,
            "spear": units.spear,
            "sword": units.sword,
            "axe": units.axe,
            "archer": units.archer,
            "spy": units.spy,
            "light": units.light,
            "marcher": units.marcher,
            "heavy": units.heavy,
            "ram": units.ram,
            "catapult": units.catapult,
            "knight": units.knight,
            "snob": units.snob,
            "x": 0,
            "y": 0,
            "target_type": "coord",
            "input": "",
            "attack": "Attack",
        };   
    });
}

$("#sendAttacks").click(function() {
    if(localStorage.villageList) {
        let villageList = JSON.parse(localStorage.villageList);
        let delay = 200;
        attackAmnt = villageList.length;
        document.querySelector("#attacksSent").innerText = "0 / " + attackAmnt + " attacks sent";
        // TODO: The following is a bit janky and not thought through very well. The idea behind it is that attacks should only be effectively sent every 200ms (because of the restriction)
        // However, if this script is to be used as a "Set Arrival Time" script, meaning a script where the desired arrival time is set by the user, then this will be a bit problematic
        // as it will take a few ms to process everything and send the attack. Those ms could be crucial when trying to fit in an attack/support between incoming attacks/supports
        for(let i = 0; i < attackAmnt; i++) {
            // Wait 200ms because of the "5 attacks per second" limit
            delay += 200;
            setTimeout(function() {
                // Add the coordinates in the setTimeout function instead of earlier because of async
                data.x = x = villageList[i][0];
                data.y = y = villageList[i][1];
                attack();
            }, delay)
        }
    } else {
        console.log("Please add villages with the textbox.");
        document.getElementById("attacksSent").innerHTML = "Please add villages to attack.";
    }
});

/**
 * Send post request to attack dialog
 */
function attack() {
    let url = "game.php?village=" + game_data.village.id + "&screen=place&try=confirm";
    $.post(url, data).done(function (response) { // Post request to prepare attack
        const parser = new DOMParser(); // Create new DOM environment
        const dom = parser.parseFromString(response, "text/html"); // Parse the reponse to DOM
        if (dom.querySelector(".error_box")) { // Error check, cancel request on invalid command
            console.error("Error: " + dom.querySelector(".error_box").innerText.trim());
            document.querySelector("#attacksFailed").innerText = "";
            document.querySelector("#attacksFailed").innerText = ++failureCounter + " / " + attackAmnt + 
                " attacks failed. Please see the console for more information.";
        } else {
            const ch = dom.getElementsByName("ch")[0].getAttribute("value"); // Get attack hash
            // Timeout to make requests more random and to prevent "5 attacks per second" error
            const timeout = Math.floor(Math.random() * 10);
            setTimeout(function() {
                sendAttack(ch);
            }, timeout);
        }
    });
}

function sendAttack(ch) {
    let url = "game.php?village=" + game_data.village.id + "&screen=place&ajaxaction=popup_command&h=" + 
    game_data.csrf + "&client_time" + Math.floor(Timing.getCurrentServerTime() / 1000);

    // Form data to confirm attack, needs to be duplicated due to different order (ban prevention)
    // Data for support
    /*data = {
        "support": true,
        "ch": ch,
        "x": x,
        "y": y,
        "source_village": game_data.village.id,
        "village": game_data.village.id,
        "attack_name": "",
        "spear": units.spear,
        "sword": units.sword,
        "axe": units.axe,
        "archer": units.archer,
        "spy": units.spy,
        "light": units.light,
        "marcher": units.marcher,
        "heavy": units.heavy,
        "ram": units.ram,
        "catapult": units.catapult,
        "knight": units.knight,
        "snob": units.snob,
        "building": units.catapultAttack
    };*/

    // Data for attack
    data = {
        "attack": true,
        "ch": ch,
        "x": x,
        "y": y,
        "source_village": game_data.village.id,
        "village": game_data.village.id,
        "attack_name": "",
        "spear": units.spear,
        "sword": units.sword,
        "axe": units.axe,
        "archer": units.archer,
        "spy": units.spy,
        "light": units.light,
        "marcher": units.marcher,
        "heavy": units.heavy,
        "ram": units.ram,
        "catapult": units.catapult,
        "knight": units.knight,
        "snob": units.snob,
        "building": units.catapultAttack
    };
    
    $.post(url, data).done(function(response) { // Post request to send attack
        if (response.includes("redirect")) {
            console.log("Attack successfully sent!");
            document.querySelector("#attacksSent").innerText = ++successCounter + " / " + attackAmnt + " attacks sent";
        } else {
            console.error(response);
            document.querySelector("#attacksFailed").innerText = "";
            document.querySelector("#attacksFailed").innerText = ++failureCounter + " / " + attackAmnt + " attacks failed. Please see the console (Ctrl+Shift+J) for more information.";
        }
    });
}
//#endregion attack

//#region set arrival time

// Will be used later/will be implemented later
function setArrivalTime(at) {
    setInterval(function() {
        arrival = document.getElementsByClassName("relative_time")[0].textContent;
        if(arrival.slice(-8) === input) {
            setTimeout(function() {document.getElementById("troop_confirm_go").click();}, delay);
        }
    }, 5);
}
//#endregion set arrival time