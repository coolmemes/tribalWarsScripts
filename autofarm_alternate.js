// ==UserScript==
// @name     Auto Farm Change Button and Maximum Distance for not-UK33
// @description Farms automatically with loot assistant
// @version 1.2.3.3
// @require https://code.jquery.com/jquery-3.2.1.min.js
// @include https://uk*.tribalwars.co.uk/game.php?village=*&screen=am_farm*
// @exclude https://uk33.tribalwars.co.uk/game.php?village=*&screen=am_farm*
// @include https://ch*.staemme.ch/game.php?village=*&screen=am_farm*
// @include https://frs*.guerretribale.fr/game.php?village=*&screen=am_farm*
// @include https://de*.die-staemme.de/game.php?village=*&screen=am_farm*
// @include https://en*tribalwars.net/game.php?village=*&screen=am_farm*
// @include https://nl*.tribalwars.nl/game.php?village=*&screen=am_farm*
// @include https://pl*.plemiona.pl/game.php?village=*&screen=am_farm*
// @include https://sv*.tribalwars.se/game.php?village=*&screen=am_farm*
// @include https://br*.tribalwars.com.br/game.php?village=*&screen=am_farm*
// @include https://pt*.tribalwars.com.pt/game.php?village=*&screen=am_farm*
// @include https://cs*.divokekmeny.cz/game.php?village=*&screen=am_farm*
// @include https://ro*.triburile.ro/game.php?village=*&screen=am_farm*
// @include https://es*.guerrastribales.es/game.php?village=*&screen=am_farm*
// @include https://it*.tribals.it/game.php?village=*&screen=am_farm*
// @include https://us*.tribalswars.us/game.php?village=*&screen=am_farm*
// @namespace https://greasyfork.org/users/151096
// ==/UserScript==
var time = 1513043460; // Enter UNIX time from which point on the farm script will run
var timeNow = Math.round(new Date().getTime() / 1000.0); // Get the UNIX time of now


if (timeNow < time) { 
    setInterval(function() { 
        "use strict";
        timeNow = Math.round(new Date().getTime() / 1000.0); // If time hasn't been reached yet, update timeNow every second
        if (timeNow > time) { // When the time has come, start the farm script and reload the page (error preventing measure)
            farm();
            window.location.reload();
        }
    }, 1000);
}
if (timeNow > time) { // When the time has come, start the farm script
    farm();
}

/********************************************
*********************************************
*********************************************
****************FARM**SCRIPT*****************
*********************************************
*********************************************
********************************************/

function farm() { 
    "use strict";
    // Set maximum farm distance
    window.maxDistance = 20; // Maximum distance default
    window.maxDistanceA = 20; // Maximum distance for button A
    window.maxDistanceB = 10; // Maximum distance for button B
    window.maxDistanceC = 10; // Maximum distance for button C

    var menu = $('#am_widget_Farm a.farm_icon_a'); // Use farm button A to farm as default
    var refreshSpeed = 20000; // Refresh the page after 20'000ms as default
    var switchVillSpeed = random(3000, 4500); // Switch village between a random number between 3000ms and 4500ms default
    var speed = 350; // Variable to send attacks default
    var x = 0; // No idea what this is
    var distance = 0; // Instantiate distance. It will record the distance from the village to the first barbarian village in the farm assistant.
    var butABoo = 0; // This will be used later to set the maximum distance and which button to farm with
    var butBBoo = 0; // This will be used later to set the maximum distance and which button to farm with
    var error = document.getElementsByClassName("error");
    
    var unitLength = $("#units_home").children().children().eq(1).children().length - 1; // Get the number of units available in the world in the farm assistant
    var unitInVill = new Array(unitLength); // Create an array to store the number of units in the village
    var childNumber = 2; // Depending on if account manager is active, change this number. 2 for no account manager, 4 for account manager. default
    var butA = new Array(unitLength); // Get the troops that have been assigned to button A
    var butB = new Array(unitLength); // Get the troops that have been assigned to button A

    if ($("#content_value").children().eq(1).html() === "Account Manager") { // Change childNumber depending on account manager
        childNumber = 4;
    } else {
        childNumber = 2;
    }
    
    // Put units in button A into array
    for (var i = 0; i < unitLength; i++) {
        butA[i] = parseInt($("#content_value").children().eq(childNumber).children().eq(1).children().children().children().children().eq(1).children().eq(i).children().val());
    }
    // Put units in button B into array
    for (var j = 0; j < unitLength; j++) {
        butB[j] = parseInt($("#content_value").children().eq(childNumber).children().eq(1).children().eq(1).children().children().children().eq(1).children().eq(j).children().val());
    }

    unitsInVill();
    // Put units present in village into array
    function unitsInVill() {
        unitInVill[0] = parseInt($("#spear").text()); 
        unitInVill[1] = parseInt($("#sword").text()); 
        unitInVill[2] = parseInt($("#axe").text()); 
        unitInVill[3] = parseInt($("#spy").text()); 
        unitInVill[4] = parseInt($("#light").text()); 
        unitInVill[5] = parseInt($("#heavy").text()); 
        if (unitLength === 9) { // If unitLength is 9 it means the world is a world with archers. Therefore, overwrite the existing ones with archers.
            unitInVill[3] = parseInt($("#archer").text());
            unitInVill[4] = parseInt($("#spy").text());
            unitInVill[5] = parseInt($("#light").text());
            unitInVill[6] = parseInt($("#marcher").text());
            unitInVill[7] = parseInt($("#heavy").text());
        }
    }

    // Create function for random number between maximum and minimum
    function random(maximum, minimum) {
        var numPossibilities = maximum - minimum;
        var aleat = Math.random() * numPossibilities;
        return Math.round(parseInt(minimum) + aleat);
    }

    chooseButton();
    // Choose which button to send depending on the troops present in the village
    function chooseButton() {
        if (unitLength === 7) { // Not an archer world
            // If any any of the units in the village that are present are fewer than button A requires, butABoo will be set to false, meaning there aren't enough units in the village to send an attack with button A
            if (unitInVill[0] < butA[0] || unitInVill[1] < butA[1] || unitInVill[2] < butA[2] || unitInVill[3] < butA[3] || unitInVill[4] < butA[4] || unitInVill[5] < butA[5]) {
                butABoo = 0;
            } else {
                butABoo = 1;
            }
            // If any any of the units in the village that are present are fewer than button B requires, butABoo will be set to false, meaning there aren't enough units in the village to send an attack with button B
            if (unitInVill[0] < butB[0] || unitInVill[1] < butB[1] || unitInVill[2] < butB[2] || unitInVill[3] < butB[3] || unitInVill[4] < butB[4] || unitInVill[5] < butB[5]) {
                butBBoo = 0;
            } else {
                butBBoo = 1;
            }
        } else { // Archer world
            // If any any of the units in the village that are present are fewer than button A requires, butABoo will be set to false, meaning there aren't enough units in the village to send an attack with button A
            if (unitInVill[0] < butA[0] || unitInVill[1] < butA[1] || unitInVill[2] < butA[2] || unitInVill[3] < butA[3] || unitInVill[4] < butA[4] || unitInVill[5] < butA[5] || unitInVill[6] < butA[6] || unitInVill[7] < butA[7]) {
                butABoo = 0;
            } else {
                butABoo = 1;
            }
            // If any any of the units in the village that are present are fewer than button B requires, butABoo will be set to false, meaning there aren't enough units in the village to send an attack with button B
            if (unitInVill[0] < butB[0] || unitInVill[1] < butB[1] || unitInVill[2] < butB[2] || unitInVill[3] < butB[3] || unitInVill[4] < butB[4] || unitInVill[5] < butB[5] || unitInVill[6] < butB[6] || unitInVill[7] < butB[7]) {
                butBBoo = 0;
            } else {
                butBBoo = 1;
            }
        }
        // If butABoo was set to 1/true in the if-statements above, button A will be chosen to execute the farm script.
        if (butABoo) {
            menu = $('#am_widget_Farm a.farm_icon_a'); // Choose button A to farm with
            console.log("Choose A");
            window.maxDistance = window.maxDistanceA;
        } else if (butBBoo) {
            menu = $('#am_widget_Farm a.farm_icon_b'); // Choose button B to farm with
            console.log("Choose B");
            window.maxDistance = window.maxDistanceB; // Change maximum distance because there are swordmen in button B and they are much slower than lcav.
        } else {
            menu = $('#am_widget_Farm a.farm_icon_c'); // Choose button C to farm with
            console.log("Choose C");
            window.maxDistance = window.maxDistanceC; // Change maximum distance because there are swordmen in button C and they are much slower than lcav.
        }
    }


    // The actual script to launch the attacks.
    for (var l = 0; l < 100; l++) {
        distance = parseInt($("#plunder_list").children().children().eq(2 + l).children().eq(7).text()); // Get the distance to the barb villa
        if (distance <= window.maxDistance) {
            $(menu).eq(l).each(function() {
                if (!($(this).parent().parent().find('img.tooltip').length)) {
                    var speedNow = (speed * ++x) - random(250, 400);
                    setTimeout(function(myVar) {
                        $(myVar).click();
                        unitsInVill();
                        chooseButton();
                        error = document.getElementsByClassName("error");
                    }, speedNow, this);
                }
                if (error.length != 0) {
                    l = 99;
                    switchOrRefresh();
                }
            });
        } else {
            if (distance > window.maxDistance) {
                if($('.groupRight').length !== 0) {
                    console.log("Here");
                    switchVillSpeed = random(500, 700); // Do this if account manager is active
                } else {
                    refreshSpeed = random(500,700); // Do this if accont manager isn't active
                }
            }
        }
    }
    // Function to refresh page
    function refreshPage() {
        window.location.reload();
    }
    // Function to switch villages
    function switchVillage() {
        $('.arrowRight').click();
        $('.groupRight').click();
    }
    
    switchOrRefresh();
    function switchOrRefresh() {
        // Switch village/refresh page if there aren't many units in the village left.
        if (unitInVill[2] < 100 && unitInVill[4] < 30 && unitInVill[5] < 1) {
            if($('.groupRight').length !== 0) {
                switchVillSpeed = random(500, 700); // Do this if account manager is active
            } else {
                refreshSpeed = random(500,700); // Do this if accont manager isn't active
            }
        }

        // Switch village or refresh page, depending on if there are any villages to switch
        if($('.groupRight').length !== 0) {
            console.log("Wait " + switchVillSpeed + " milliseconds to switch villages."); //Do this if accont manager is active
            setInterval(switchVillage, switchVillSpeed);
        } else {
            console.log("Wait " + refreshSpeed + " milliseconds to refresh page.");
            setInterval(refreshPage(), refreshSpeed); //Do this if accont manager isn't active
        }
    }
}