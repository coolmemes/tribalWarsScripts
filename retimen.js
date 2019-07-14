window.intervalTime = 100; // Set interval in ms
window.timeoutTime = 50; // Set timeout in ms
window.showArrTimeTr = document.createElement("tr"); // Create button called btn as a link because any button causes the attack to launch
window.showArrTimeTd = document.createElement("td");
var pEle = document.getElementById("troop_confirm_go"); // Button comes after this element
var btn = document.createElement("a"); // Create button called btn as a link because any button causes the attack to launch
btn.setAttribute("id", "arrTime"); // Set ID of btn
btn.setAttribute("style", "cursor:pointer;"); // Set cursor to pointer
pEle.parentNode.insertBefore(btn, pEle.nextElementSibling); // Place btn after pEle
var t = document.createTextNode("Set arrival time"); // btn has this text
btn.appendChild(t); // Append text to btn

btn.onclick = function() {
	"use strict";
	var time = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
	var lalau = document.getElementById("date_arrival");
	window.input = prompt("Please enter desired arrival time", time);
	window.ms = prompt("Please enter approximate tenths of a second", "0-9");
	window.showArrTimeTr.appendChild(window.showArrTimeTd);
	lalau.parentNode.parentNode.insertBefore(window.showArrTimeTr, lalau.parentNode[1]);
	window.showArrTimeTd.innerHTML = "You set the arrival time to: ~" + window.input + ":" + window.ms + "00";
	window.showArrTimeTd.setAttribute("colspan", "2");

};

setInterval(function retime() {
	"use strict";
	var arrival = document.getElementsByClassName("relative_time")[0].textContent;
	if(arrival.slice(-8) === window.input)
		{
			setTimeout(function() {document.getElementById("troop_confirm_go").click();}, window.ms * 100 - 50);
		} else {}
}, window.intervalTime);