// ==UserScript==
// @name     Farm CD
// @description Farms stuff
// @version 1
// @include https://*/game.php?village=*&screen=am_farm*

// @namespace https://greasyfork.org/users/151096
// ==/UserScript==

let villFarmB = ["2584", "217"]; // Put village ID here where you want to send B
let total = 5; // Attacks sent per village
const cooldown = 10; // Time in seconds to wait until the farm loop starts again





let farms = $(".farm_icon_a");
let progressElm = $("<div> </div>");
$("#am_widget_Farm").before(progressElm);

let cd = false;

const currentVill = JSON.stringify(game_data.village.id);



if(currentVill == sessionStorage.startVill) {
    cd = true;
}

if(!sessionStorage.startVill) {
    sessionStorage.startVill = currentVill;
}

function fasend(a) {
    "use strict";
    if(villFarmB.includes(currentVill)) {
        farms = $(".farm_icon_b");
    }
    if (a == total) {
        switchOrStop();
        return;
    }
    $(farms[a]).trigger("click");
    progressElm.html(a + " / " + total);
    setTimeout(function() {
        fasend(a+1);
    }, 250);
}
fasend(0);

function switchOrStop() {
    if (cd) {
        setTimeout(function () {
            document.querySelector('.arrowRight').click();
            document.querySelector('.groupRight').click();
        }, cooldown * 1000);
    } else {
        document.querySelector('.arrowRight').click();
        document.querySelector('.groupRight').click();
    }
}
