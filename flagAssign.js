// ==UserScript==
// @name           Flag menager - Technologies
// @author         Ashayas
// @version        0.1 pre-alpha
// @include        *.plemiona.*mode=tech*
// @icon           https://dspl.innogamescdn.com/8.146/39093/graphic/delete_14.png
// ==/UserScript==

var parent = document.getElementById("inner-border");

var delete_flags = document.createElement("button");
delete_flags.setAttribute("id", "del_flags");
delete_flags.setAttribute("style", "float:left;margin:10px;");
delete_flags.setAttribute("class", "btn");
delete_flags.innerHTML = 'Delete flags <img src="https://dspl.innogamescdn.com/8.146/39093/graphic/delete_14.png" />';

parent.insertAdjacentElement('afterbegin', delete_flags);

var choose_flags = document.createElement("button");
choose_flags.setAttribute("id", "cho_flags");
choose_flags.setAttribute("style", "float:left;margin:10px;");
choose_flags.setAttribute("class", "btn");
choose_flags.innerHTML = 'Choose flags <img src="https://img.icons8.com/color/14/000000/filled-flag2.png" />';

parent.insertAdjacentElement('afterbegin', choose_flags);

var text_field = document.createElement("text");
text_field.setAttribute("style", "float:left;margin:10px;");
text_field.innerHTML = 'I will add more features later. For now choosen flag is "Attack"';

parent.insertAdjacentElement('afterbegin', text_field);

$(document).ready(function(){
    $('#del_flags').click(function(e) {
        var arr=$('a.flag_unassign'),
            i=0,
            t=setInterval(function(){
                $(arr[i++]).click();
                if(i>arr.length)
                    clearInterval(t);
            },500);
    });
});

$(document).ready(function(){
    $('#cho_flags').click(function(e) {
        var arr=$('a.flag_unassign'),i=0,t=setInterval(function(){$(arr[i++]).click();
            if(i>arr.length)clearInterval(t);},500);
    });
});


// This will be a dropdown box with the options resource, recruit, attack, defend, luck, population, coin, and haul.
let type = "recruit";
const speed = 400; // Speed of assigning the flags in ms
let flagLevel = "9"; // Start with the highest flag level
let typeOfFlag;
let flagAmount = [];

// Determine which type of flag to assign depending on the chosen dropdown option
switch(type) {
    case "resource":
        typeOfFlag = 1;
        break;
    case "recruit":
        typeOfFlag = 2;
        break;
    case "attack":
        typeOfFlag = 3;
        break;
    case "defend":
        typeOfFlag = 4;
        break;
    case "luck":
        typeOfFlag = 5;
        break;
    case "population":
        typeOfFlag = 6;
        break;
    case "coin":
        typeOfFlag = 7;
        break;
    case "haul":
        typeOfFlag = 8;
        break;
    default:
        alert("Please select a valid flag type.");
}
let trNumber = typeOfFlag + 1;

let villID = []; // Array to store the village IDs
const table = document.querySelector("#techs_table");

/**
 * Populate the villID array
 */
for(let i = 0; i < table.rows.length - 1; i++) {
    villID.push(table.querySelectorAll("tr[id^='village']")[0].id.replace("village_",""));
}



// for-loop with setInterval to determine the attackMs of the iterations
let j = 0;
const interval = setInterval(function() {
    FlagsOverview.selectFlag(event, villID[j]);
    let temp = j;
    setTimeout(function() {
        console.log("j: " + temp);
        getAmountFlags();
        setFlag(flagLevel, villID[temp]);
        j++;
    }, 200);
    if(j >= villID.length) {
        clearInterval(interval);
    }
}, speed);

function getAmountFlags() {
    // Get the amount of flags
    for(var k = 1; k < 10; k++) {
        flagAmount.push(document.querySelector("#ds_body > div.popup_helper > div > div.popup_content > table > tbody > tr:nth-child(" + trNumber + ") ").cells[k].innerText.replace(/ /g,''));
    }
}
function setFlag(level, villageID) {
    if(!flagAmount[level - 1]) {
        setFlag(level - 1, villageID);
        console.log("Level at " + level);
        return;
    }
    console.log("typeOfFlag: " + typeOfFlag);
    console.log("level: " + level);
    console.log("villageID: " + villageID);
    console.log("--------------------------");

    FlagsOverview.assignFlag(typeOfFlag, level, villageID); // Try to assign the flag
    remove("#techs_table > tbody > tr:nth-child(2)");
}

function remove(selector) {
    var elem = document.querySelector(selector);
    return elem.parentNode.removeChild(elem);
}