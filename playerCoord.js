let playerList = [];
let villageList = [];

let newElement = "<h4>Get coordintes of players</h4><div><textarea id='playerList' name='playerList'></textarea></div> <button id='playerListOk' class='btn'>OK</button><p><span id='errorPlayer'></span></p><p><span id='addedVillages'></span></p>";
let targetElement = $("#overviewtable");
targetElement.prepend($(newElement));

$("#playerListOk").click(function() {
    localStorage.villageList = "";
    let lines = $("#playerList").val().split('\n');
    for (let i = 0; i < lines.length; i++){
        playerList.push(lines[i].replace(" ", "+"));
    }
    console.log(playerList);
    // Get player ID
    $.get("/map/player.txt", function(response) {
        getCoordinates(playerList, response);
    })
});

function getCoordinates(playerList, response) {
    let playerListLength = playerList.length;
    for (let i = 0; i < playerListLength; i++) {
        let found = false;
        let player = playerList[i];
        for (let j = 0; j < villageList.length; j++) {
            if (villageList[j].includes(player)) {
                found = true;
                break;
            }
        }
        if (found) {
            document.querySelector("#addedVillages").innerHTML += player + " is already in here! <br />";
            continue;
        }
        console.log(player);
        let anchorBool = false;
        // Get player ID
        let playerIdTxt;
        if (!response.match('\\d*,' + player)) {
            document.querySelector("#errorPlayer").innerText = "Couldn't get coordinates. Please check the names entered for mistakes.";
            playerList.pop();
        } else {
            document.querySelector("#errorPlayer").innerText = "";
        }
        let playerMatch = response.match('\\d*,' + player);
        if (playerMatch) {
            playerIdTxt = parseInt(playerMatch[0].replace("," + player, ""));// Get profile of player
            $.get("/game.php?village=" + game_data.village.id + "&screen=info_player&id=" + playerIdTxt, function(response) {
                const parser = new DOMParser();
                let dom = parser.parseFromString(response, "text/html");
                let anchor;
                if (dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(101) > td:nth-child(1) > a:nth-child(1)")) {
                    anchor = dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(101) > td:nth-child(1) > a:nth-child(1)");
                    anchorBool = true;
                }
                const link = "/game.php?village=" + game_data.village.id + "&screen=info_player&ajax=fetch_villages&player_id=" + playerIdTxt;
                getAllVillages(anchor, link, dom);
                if (anchorBool) anchor.parentElement.parentElement.outerHTML = "";
            });
        } else {
            console.error("Player not found.");
        }
    }
    playerList.length = 0;
}

function getAllVillages(anchor, link, dom) { // Get additional villages that are not displayed (> 100 villages)
    $.get(link, { }, function(data) { // Get request
        dom.querySelector('#villages_list > tbody').innerHTML += data.villages; // Add villages to village list
        getAllCoordinates(dom);
    }, 'json');
}

function getAllCoordinates(dom) {
    let length = dom.getElementById("villages_list").rows.length ;
    let coords = "";
    let x = 0;
    let y = 0;
    let playerName = dom.querySelector("#content_value > h2:nth-child(1)").innerText.trim();
    for (let i = 1; i < length; i++) {
        coords = dom.querySelector("#villages_list > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").innerText;

        x = coords.substring(0, 3);
        y = coords.substring(4, 7);
        villageList.push([parseInt(x), parseInt(y), "K" + y.toString().charAt(0) + x.toString().charAt(0), playerName]);
    }
    console.log("Added " + (length - 1) + " villages from " + playerName + " to the list.")
    document.querySelector("#addedVillages").innerHTML += "Added " + (length - 1) + " villages from " + playerName + " to the list. Total villages in list: " + villageList.length + "<br />";
    console.log(villageList);
    localStorage.villageList = JSON.stringify(villageList);
}