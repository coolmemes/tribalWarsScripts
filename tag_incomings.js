// ==UserScript==
// @name         Tag Incomings
// @version      2.1.3
// @description  Tags new incomings
// @author       FunnyPocketBook
// @match        https://*/game.php?*village=*&screen=overview_villages&mode=incomings*
// @grant        none
// @namespace https://greasyfork.org/users/151096
// ==/UserScript==
const attack = "attack"; // Change this to your language
const support = "support"; // Change this to your language
const noble = "noble" // Change this to your language
const wait = 10000; // How often the script checks for new attacks in milliseconds


const incRow = document.querySelector("#incomings_table").rows.length;
const timeout = Math.max(60000, incRow * 31);
setTimeout(function() {
    "use strict";
    tagger();
}, wait);

setTimeout(function() {
    window.location.reload();
}, timeout);

function tagger() {
    "use strict";
    let attackingVillage = []; // Store all attacking villages
    let villNr = []; // Store number of attacks per attacking village, same index as attackingVillage
    let index;
    for (let i = 2; i < incRow; i++) {
        index = attackingVillage.indexOf($("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(3) > a").text()); // See if the attacking village is already in the array
        if(index === -1) { // If attacking village is not in array, push it into array
            attackingVillage.push($("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(3) > a").text());
            villNr.push(1);
        } else { // If attacking village is in array, increase attack number
            villNr[index]++;
        }
        let incName = document.querySelector("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(1) > span > span > a:nth-child(1) > span.quickedit-label").innerHTML;
        let nobleIcon = "";
        // If icon exist, save it in nobleIcon
        if (document.querySelector("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(1) > span > span > a:nth-child(1) > span:nth-child(2) > img")) {
            nobleIcon = document.querySelector("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(1) > span > span > a:nth-child(1) > span:nth-child(2) > img").getAttribute("src");
        }
        incName = incName.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,"").toLowerCase(); // Remove all whitespace from attack name and make it lowercase
        // If the attack has the noble icon and is not already tagged as noble, tag it as noble
        if (nobleIcon.includes("snob.png") && !incName.includes(noble)) {
            document.querySelector("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(1) > span > span > a.rename-icon").click();
            document.querySelector('#incomings_table > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > span > span.quickedit-edit > input[type="text"]:nth-child(1)').value = noble;
            document.querySelector("#incomings_table > tbody > tr:nth-child(" + i + ") > td:nth-child(1) > span > span.quickedit-edit > input.btn").click();
        }
        // If the attack is labelled with attack or support, click the checkbox so the system automatically tags the inc
        else if (incName.includes(attack) || incName.includes(support)) {
            document.querySelector('#incomings_table > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > input[type="checkbox"]:nth-child(2)').click();
        }
    }

    // Tag the attacks with the number of attacks per attacking village
    let j = 2;
    let tagInterval = setInterval(function() { // Interval instead of for-loop to control the server requests
        let incName = document.querySelector("#incomings_table > tbody > tr:nth-child(" + j + ") > td:nth-child(1) > span > span > a:nth-child(1) > span.quickedit-label").innerHTML; // Get inc name
        incName = incName.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,"").toLowerCase(); // Remove all whitespace from attack name and make it lowercase
        const attVill = attackingVillage.indexOf($("#incomings_table > tbody > tr:nth-child(" + j + ") > td:nth-child(3) > a").text());
        if(!incName.includes(attack) && incName.slice(-1) != villNr[attVill]) { // If the last character in the inc name is not a number and the incName does not include "attack", append the number
            index = attackingVillage.indexOf($("#incomings_table > tbody > tr:nth-child(" + j + ") > td:nth-child(3) > a").text()); // See which index the attack has
            document.querySelector("#incomings_table > tbody > tr:nth-child(" + j + ") > td:nth-child(1) > span > span > a.rename-icon").click();
            const incLabel = document.querySelector('#incomings_table > tbody > tr:nth-child(' + j + ') > td:nth-child(1) > span > span.quickedit-edit > input[type="text"]:nth-child(1)');
            if(Number.isInteger(parseInt(incName.slice(-1)))) {
                incLabel.value = incLabel.value.slice(0, -1);
            }
            document.querySelector('#incomings_table > tbody > tr:nth-child(' + j + ') > td:nth-child(1) > span > span.quickedit-edit > input[type="text"]:nth-child(1)').value += " " + villNr[index];
            document.querySelector("#incomings_table > tbody > tr:nth-child(" + j + ") > td:nth-child(1) > span > span.quickedit-edit > input.btn").click();
        }
        j++;
        if(j >= incRow) { // Stop interval, just like the for-loop condition
            clearInterval(tagInterval);
            if($("#incomings_table > tbody > tr:nth-child(" + incRow + ") > th:nth-child(2) > input:nth-child(2)").attr("name").toLowerCase() === "label") {
                document.querySelector("#incomings_table > tbody > tr:nth-child(" + incRow + ") > th:nth-child(2) > input:nth-child(2)").click();
            } else {
                document.querySelector("#incomings_table > tbody > tr:nth-child(" + incRow + ") > th:nth-child(2) > input:nth-child(3)").click();
            }
        }
    }, 30);
}