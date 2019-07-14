// JavaScript Document

var progressElm = $("<div>da</div>");
$("#am_widget_Farm").before(progressElm);
var total = $(".farm_icon_a").length;
var farms = $(".farm_icon_a");
window.counter = 0;

function fasend(a) {
    "use strict";
    if (a == total) return;
    $(farms[a]).trigger("click");
    progressElm.html(a + " / " + total);
    setTimeout(function() {
        fasend(a+1);
    }, 205);
    window.counter++;
    if (window.counter == total) {
        window.location.reload();
    }
}
fasend(0);