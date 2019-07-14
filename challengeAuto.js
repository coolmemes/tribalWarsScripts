// ==UserScript==
// @name     Auto Challenge for the Crest Challenge
// @description Automatically clicks the link/button to challenge a player in the crest challenge
// @version 1.2.1
// @require https://code.jquery.com/jquery-3.2.1.min.js
// @include https://uk*.tribalwars.co.uk/game.php?village=*&screen=event_crest&page=*
// @include https://ch*.staemme.ch/game.php?village=*&screen=event_crest&page=*
// @include https://frs*.guerretribale.fr/game.php?village=*&screen=event_crest&page=*
// @include https://de*.die-staemme.de/game.php?village=*&screen=event_crest&page=*
// @include https://en*tribalwars.net/game.php?village=*&screen=event_crest&page=*
// @include https://nl*.tribalwars.nl/game.php?village=*&screen=event_crest&page=*
// @include https://pl*.plemiona.pl/game.php?village=*&screen=event_crest&page=*
// @include https://sv*.tribalwars.se/game.php?village=*&screen=event_crest&page=*
// @include https://br*.tribalwars.com.br/game.php?village=*&screen=event_crest&page=*
// @include https://pt*.tribalwars.com.pt/game.php?village=*&screen=event_crest&page=*
// @include https://cs*.divokekmeny.cz/game.php?village=*&screen=event_crest&page=*
// @include https://ro*.triburile.ro/game.php?village=*&screen=event_crest&page=*
// @include https://es*.guerrastribales.es/game.php?village=*&screen=event_crest&page=*
// @include https://it*.tribals.it/game.php?village=*&screen=event_crest&page=*
// @include https://us*.tribalswars.us/game.php?village=*&screen=event_crest&page=*
// @namespace https://greasyfork.org/users/151096
// ==/UserScript==
var counter = 0;
setInterval(function challengeAuto(){
    "use strict";
    for(var i = 0;i < 7;i++){
        var but = $("#challenge_table").children().eq(1).children().eq(i).children().eq(3).children();
        if(but=== 'span'){
            
        } else if(but.attr('href')){
            window.location = but.attr("href");
            console.log("Sent");
        }       
    }
    counter++;
    console.log(counter);
},3000);