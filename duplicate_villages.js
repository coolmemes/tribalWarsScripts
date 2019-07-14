var string1 = "[b]Village:[/b] [coord]538|501[/coord][b]Wall level:[/b] 13[b]Defender:[/b]  18120  12209  25  13215  1802  0  0  4402  0  0  0  0  0     [command]attack[/command] Ram [coord]535|518[/coord] --> Arrival time: Dec 21, 2017  17:49:24:902 [player]Win Again[/player]    [command]attack[/command] Ram [coord]532|521[/coord] --> Arrival time: Dec 21, 2017  19:38:03:136 [player]Win Again[/player]    [command]attack[/command] Ram [coord]525|522[/coord] --> Arrival time: Dec 21, 2017  21:32:51:674 [player]Win Again[/player]    [command]attack[/command] Ram [coord]525|523[/coord] --> Arrival time: Dec 21, 2017  21:58:25:494 [player]Win Again[/player]    [command]attack[/command] Ram [coord]522|521[/coord] --> Arrival time: Dec 21, 2017  22:00:28:093 [player]Win Again[/player]    [command]attack[/command] Ram [coord]520|520[/coord] --> Arrival time: Dec 21, 2017  22:17:11:128 [player]Win Again[/player]    [command]attack[/command] Ram [coord]514|515[/coord] --> Arrival time: Dec 21, 2017  23:07:48:031 [player]Win Again[/player]    [command]attack[/command] Ram [coord]513|515[/coord] --> Arrival time: Dec 21, 2017  23:33:33:598 [player]Win Again[/player]	[b]Village:[/b] [coord]538|502[/coord][b]Wall level:[/b] 17[b]Defender:[/b]  23481  16331  4058  18047  1599  1233  624  7112  168  0  1  0  0     [command]attack[/command] Ram [coord]534|519[/coord] --> Arrival time: Dec 21, 2017  17:57:09:962 [player]Win Again[/player]    [command]attack[/command] Ram [coord]514|510[/coord] --> Arrival time: Dec 21, 2017  21:52:33:487 [player]Win Again[/player]    [command]attack[/command] Ram [coord]521|523[/coord] --> Arrival time: Dec 21, 2017  22:43:39:411 [player]Win Again[/player]    [command]attack[/command] Ram [coord]514|519[/coord] --> Arrival time: Dec 21, 2017  23:54:46:642 [player]Win Again[/player]";

var string = "[b]Village:[/b] [coord]539|502[/coord][b]Wall level:[/b] 6[b]Defender:[/b]  1040  924  0  864  65  0  0  132  0  1  0  0  0     [command]attack_small[/command] Spy [coord]539|504[/coord] --> Arrival time: Dec 21, 2017  09:44:29:458 [player]Win Again[/player] [command]attack_large[/command] [command]snob[/command] Noble [coord]539|506[/coord] --> Arrival time: Dec 21, 2017  11:47:13:871 [player]Win Again[/player] [command]attack_small[/command] [command]snob[/command] Noble [coord]539|506[/coord] --> Arrival time: Dec 21, 2017  11:47:14:071 [player]Win Again[/player]";

var deleteChars = 15;

var splitVill = string1.split("[b]Village:[/b] [coord]");
console.log(splitVill);
var coord = new Array(splitVill.length - 1);
// Get every attack for each attacked village
for (var i = 1; i < splitVill.length; i++) {
    // Get attacked Villages and store them in attackedVill
    var attackedVill = new Array(splitVill.length - 1);
    for (var j = 1; j < splitVill.length; j++) {
            attackedVill[j-1] = splitVill[i].substring(0,7);
    }
    var attackingVillages = splitVill[i].substring(deleteChars);
    var substring = attackingVillages.split("[coord]");
    var coords = new Array(substring.length);
    // Get the attacking villages
    coords[0] = attackedVill[i-1];
    for (var k = 1; k < substring.length; k++) {
        coords[k] = substring[k].substring(0,7);
    }
    coord[i-1] = coords;
    //console.log(attackedVill[i-1]);
    
}
console.log(coord);


var test1 = [["x","y","z","a","b","c","d","d"], ["a", "x", "c", "g", "h", "i", "k", "l", "m", "h", "o"], ["q", "r", "a", "s", "t", "b", "c", "x", "y"]];

test1[0] = test1[0].filter(function(val) {
    "use strict";
    return test1[0].indexOf(val) == -1;
});



/* var substring = string.split("[coord]");
var coords = new Array(substring.length - 1);

for (var i = 0; i < substring.length - 1; i++) {
	coords[i] = substring[i+1].substring(0,7);
}
console.log(coords);*/