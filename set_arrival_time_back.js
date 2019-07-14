var attBtn = document.querySelector("#target_attack");
var reload = JSON.parse(localStorage.getItem("reload"));
var storedID = JSON.parse(localStorage.getItem("storedID")); // Get tab ID
var tabID = sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random(); // Generate ID for tab
if(typeof tabID != "string") {
    tabID = tabID.toString();
}
var index = storedID.indexOf(tabID); // Get index of time of this tab

if(reload[index]) {
    attBtn.click();
}