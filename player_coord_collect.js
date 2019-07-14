javascript: 
if (typeof bb === 'undefined') var bb = false;
if (document.URL.indexOf('screen=info_player') === -1) {
	alert("You must run the script on a player's profile!");
} else {
	var tds = document.getElementsByTagName("TD");
	var K = new Array();
	for (var idx = 0; idx < 100; idx++) {
		K[idx] = new Array();
	}
	var C = new Array();
	for (var idx = 0; idx < tds.length; idx++) {
		var xy = tds[idx].innerHTML;
		if (/^\d+\|\d+$/.test(xy)) {
			var id = $(tds[idx]).parent().find('span[class="village_anchor contexted"]').attr('data-id');
			var aux = id + "&" + xy;
			C.push(aux);
			var xys = xy.split('|');
			K[Math.floor(parseInt(xys[0]) / 100) + Math.floor(parseInt(xys[1]) / 100) * 10].push(aux);
		}
	}
	if (bb) {
		C = "This village does not exist";
	}
	if (!bb) {
		C = C.join(',');
	}
	var prefix = '<textarea cols=80 rows=10>';
	var postfix = '<\/textarea>';
	var S = '<html>' + '<head>' + '<title>Coordinate Collector</title>' + '<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />' + '</head>' + '<body>' + '<b>Coordinate Collector</b><hr>All Player Villages:<br>' + prefix + C + postfix;
	for (var idx = 0; idx < 100; idx++) {
		if (K[idx].length > 0) {
			if (bb) {
				var Ks = "This village does not exist";
			}
			if (!bb) {
				var Ks = K[idx].join(',');
			}
			S += '<br><br> Villages in Continent ' + idx + ' <br>' + prefix + Ks + postfix;
		}
	}
	S += '</body></html>';
	var popup = window.open('about:blank', 'twcc', 'width=720,height=480,scrollbars=1');
	popup.document.open('text/html', 'replace');
	popup.document.write(S);
	popup.document.close();
}
void(0);