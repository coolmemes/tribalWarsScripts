javascript: var parentThingie = document.getElementById("inner-border");

var pointsInput = document.createElement("input");
pointsInput.setAttribute("id", "pointsInput");
pointsInput.setAttribute("type", "text");
pointsInput.setAttribute("placeholder", 'Points');
pointsInput.setAttribute("style", "margin-top:10px;");
parentThingie.parentNode.insertBefore(pointsInput, parentThingie);

var output = document.createElement("input");
output.setAttribute("id", "output");
output.setAttribute("type", "text");
output.setAttribute("placeholder", 'Output');
output.setAttribute("style", "margin-top:10px;");
parentThingie.parentNode.insertBefore(output, parentThingie);

var text = document.createElement("textarea");
text.setAttribute("id", "text");
text.setAttribute("type", "text");
text.setAttribute("placeholder", 'Text');
text.setAttribute("style", "margin-top:10px; display: inline;");
text.setAttribute("rows", "3");
parentThingie.parentNode.insertBefore(text, parentThingie);

var okButton = document.createElement("button");
okButton.innerHTML = "OK";
okButton.setAttribute("id", "okButton");
okButton.setAttribute("style", "margin:10px;");
okButton.setAttribute("class", "btn");

var copyButton = document.createElement("button");
copyButton.innerHTML = "Copy Output";
copyButton.setAttribute("id", "copyButton");
copyButton.setAttribute("style", "margin:10px;");
copyButton.setAttribute("class", "btn");

parentThingie.insertAdjacentElement('afterbegin', copyButton);
parentThingie.insertAdjacentElement('afterbegin', output);

parentThingie.insertAdjacentElement('afterbegin', okButton);
parentThingie.insertAdjacentElement('afterbegin', pointsInput);
parentThingie.insertAdjacentElement('afterbegin', text);

document.getElementById("pointsInput").addEventListener("keyup", function(event) {
    "use strict";
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("okButton").click();
    }
});


document.getElementById("text").addEventListener("keyup", function(event) {
    "use strict";
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("okButton").click();
    }
});

document.getElementById("okButton").onclick = function calc() {
    "use strict";
    var points = $("#pointsInput").val();
    console.log("points: " + points);

    var string = document.querySelector("#text").value;
    string = string.replace(/(\r\n|\n|\r)/gm, "¬¬¬¬");
    string = string.split("¬¬¬¬");
    console.log("string1: " + string);
    if (string[0] === "Current population") {
        string.shift();
        console.log("Current population");
    }
    for(var i = 0; i < string.length; i++) {
        console.log("for: " + i);
        string[i] = string[i].split("	");
        string[i] = string[i][1];
    }
    console.log("string2: " + string);
    var troops = parseInt(string[1]) + parseInt(string[2]);
    console.log("troops: " + troops);
    var ratio = troops / parseInt(points);
    document.querySelector("#output").value = ratio;
};

document.getElementById("copyButton").onclick = function copy() {
    "use strict";
    var copyText = document.getElementById("output");
    copyText.select();
    document.execCommand("Copy");
};
void(0);