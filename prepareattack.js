// JavaScript Document
// Create inputs for units
var parentUnits = document.getElementById("command_target"); // Button comes before this element
var tableTop = document.createElement("table");
var tbodyTop = document.createElement("tbody");
var trTop = document.createElement("tr");

var td = ["td1", "td2", "td3", "td4"];
var table = ["table1", "table2", "table3", "table4"];
var tbody = ["tbody1", "tbody2", "tbody3", "tbody4"];
var tr = ["tr1", "tr2", "tr3", "tr4"];
var th = ["th1", "th2", "th3", "th4"];
for (var i = 0; i < td.length; i++) {
    window[td[i]] = document.createElement("td");
    window[td[i]].setAttribute("valign", "top");
    
    window[table[i]] = document.createElement("table");
    window[table[i]].setAttribute("class", "vis");
    window[table[i]].setAttribute("width", "100%");
    
    window[tbody[i]] = document.createElement("tbody");
    window[tbody[i]].setAttribute("class", "vis");
    window[tbody[i]].setAttribute("width", "100%");
    
    window[tr[i]] = document.createElement("tr");
    
    window[th[i]] = document.createElement("th");
    if (i === 3) {
        window[th[i]].innerHTML = "Other";
    } else if (i === 2) {
        window[th[i]].innerHTML = "Siege cavalry";
    } else if (i === 1) {
        window[th[i]].innerHTML = "Cavalry";
    } else if (i === 0) {
        window[th[i]].innerHTML = "Infantry";
    }
    
    window[tr[i]].appendChild(window[th[i]]);
    window[tbody[i]].appendChild(window[tr[i]]);
    window[table[i]].appendChild(window[tbody[i]]);
    window[td[i]].appendChild(window[table[i]]);
    trTop.appendChild(window[td[i]])
    
}
var other = "Other";
tbodyTop.appendChild(trTop);
tableTop.appendChild(tbodyTop);
parentUnits.parentNode.insertBefore(tableTop, parentUnits.nextElementSibling);

var unitNames = ["spear", "sword", "axe", "archer", "scout", "lcav", "marcher", "hcav", "ram", "catapult", "paladin", "noble"];
for (var i = 0; i < 4; i++) {
    window[unitNames[i]] = document.createElement("input");
    window[unitNames[i]].setAttribute("id", unitNames[i]);
    window[unitNames[i]].setAttribute("value", "0");
    window[unitNames[i]].setAttribute("style", "display:block;");
    td1.appendChild(window[unitNames[i]]);
}

for (var i = 4; i < 8; i++) {
    window[unitNames[i]] = document.createElement("input");
    window[unitNames[i]].setAttribute("id", unitNames[i]);
    window[unitNames[i]].setAttribute("value", "0");
    window[unitNames[i]].setAttribute("style", "display:block;");
    td2.appendChild(window[unitNames[i]]);
}
for (var i = 8; i < 10; i++) {
    window[unitNames[i]] = document.createElement("input");
    window[unitNames[i]].setAttribute("id", unitNames[i]);
    window[unitNames[i]].setAttribute("value", "0");
    window[unitNames[i]].setAttribute("style", "display:block;");
    td3.appendChild(window[unitNames[i]]);
}
for (var i = 10; i < 12; i++) {
    window[unitNames[i]] = document.createElement("input");
    window[unitNames[i]].setAttribute("id", unitNames[i]);
    window[unitNames[i]].setAttribute("value", "0");
    window[unitNames[i]].setAttribute("style", "display:block;");
    td4.appendChild(window[unitNames[i]]);
}

var text = document.createTextNode("Set Offset"); // buttonOffset has this text
buttonOffset.appendChild(text); // Append text to buttonOffset



















