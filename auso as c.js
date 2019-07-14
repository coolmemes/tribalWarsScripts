// ==UserScript==
// @name     Auto AS c - TrOCA v2(take more to reload)
// @include  https://brs1*screen=am_farm*
// @include  https://*screen=am_farm
// ==/UserScript==
var atualizarPagina = 1;
var tempo = 500;
var x = 0;
var minhaVar = "";
var remove_atacadas = 0;
var menu = $('#am_widget_Farm a.farm_icon_c');
var altAldTempo = 1;

var jaEnviados = $(menu).parent().parent().find('img.tooltip').length + "000";

if (remove_atacadas == 1) {
    $('img').each(function() {
        var tempStr = $(this).attr('src');
        if (tempStr.indexOf('attack') != -1) {
            $(this).addClass('tooltip')
        }
    });
}
if (atualizarPagina == 1) {
    setInterval(
        function() {
            window.location.reload();
        }, 400000);
}

console.log("Ja existe " + jaEnviados.substring(0, (jaEnviados.length - 3)) + " aldeia com ataque.");


if (altAldTempo == "1") {
    var altAldTempo = aleatorio(5000, 6000);
} else {
    var altAldTempo = parseInt(altAldTempo) + parseInt(aleatorio(82353, 35356));
}
console.log("Resta " + altAldTempo + " milesegundos para alternar a aldeia.");

function aleatorio(superior, inferior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() numPosibilidades
    return Math.round(parseInt(inferior) + aleat)
}


var error = document.getElementsByClassName("error");
for (var i = 0; i < 100; i++) {
    $(menu).eq(i).each(function() {
        "use strict";
        if (!($(this).parent().parent().find('img.tooltip').length)) {
            var tempoAgora = (tempo * ++x) - aleatorio(250, 400);
            setTimeout(function(minhaVar) {
                $(minhaVar).click();
                error = document.getElementsByClassName("error");
            }, tempoAgora, this);
        }
        if (error !== null) {
            i = 99;
            $('.arrowRight').click();
            $('.groupRight').click();
            break;
        }
    });
}

function altAldeia() {
    $('.arrowRight').click();
    $('.groupRight').click();
}

setInterval(altAldeia, altAldTempo);

console.log("Changed by the best br Speeed Player ever");