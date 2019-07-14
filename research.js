var villNumber = document.querySelector("#techs_table > tbody").rows.length - 1;
var researchArray = [];
var counter = 0;
for(var i = 0; i < villNumber; i++) {
    for (var j = 3; j <= 12; j++) {
        if(document.querySelector("#techs_table > tbody > tr:nth-child(" + i + ") > td:nth-child(" + j + ") > a")) {
            researchArray[counter] = document.querySelector("#techs_table > tbody > tr:nth-child(" + i + ") > td:nth-child(" + j + ") > a");
            counter++;
        }
    }
}
var arrayLength = researchArray.length;
var i = 0;
var intervalFunction = setInterval(function() {
    "use strict";
    researchArray[i].click();
    i++;
    if(i >= arrayLength) {
        clearInterval(intervalFunction);
    }
}, 100);