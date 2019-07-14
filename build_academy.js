javascript: 
var buildAll = document.getElementById("get_all_possible_build");
var parentVar = document.getElementById("villages");
var buildings = parentVar.getElementsByClassName("b_snob");
buildIcon();


 function buildIcon() {
    "use strict";
    if ($(".build_icon").hasClass("translucent")) {
        buildAll.click();
    }
} 

function buildBuilding() {
    "use strict";
    for (var i = 0; i < buildings.length; i++) {
        if (buildings[i].firstElementChild !== null) {
            setTimeout(buildings[i].firstElementChild.click(), 1000);
        }
    }
}

setInterval(buildBuilding, 1000);
void(0);