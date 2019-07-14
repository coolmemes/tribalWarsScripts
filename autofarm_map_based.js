javascript: coords = "";
units = {
	light: 120
};
protect = true;
minpoints = [0, 50];

function getCoords() {
	var e = [],
		d, c, b, a;
	for (d = 0; d < TWMap.size[1]; d++)
		for (c = 0; c < TWMap.size[1]; c++)
			if (a = TWMap.map.coordByPixel(TWMap.map.pos[0] + TWMap.tileSize[0] * c, TWMap.map.pos[1] + TWMap.tileSize[1] * d))
				if ((b = TWMap.villages[a.join("")]) && b.owner === "0") b = Number(b.points.replace(".", "")), (b >= minpoints[0] || b <= minpoints[1]) && e.push(a.join("|"));
	return e.join("-")
}

function autoFarm() {
	function e() {
		++a >= b.length && (a = 0);
		g = b[a].split("|");
		localStorage.autofarmIndex = a;
		return !0
	}

	function d() {
		var a, c;
		for (a in b)
			if (!(b[a] in f)) return !1;
		a = ["As coordenadas est\u00e3o com problemas:\n"];
		for (c in f) a.push(c + " " + f[c] + ".");
		alert(a.join("\n"));
		return !0
	}

	function c() {
		if (g.join("|") in f) return e() && c();
		h.x = g[0];
		h.y = g[1];
		$.post(l, h, function(a) {
			if (i = $("#error", a).text()) switch (i) {
				case "Alvo n\u00e3o existe":
				case "Voc\u00ea precisa fornecer as coordenadas x e y do alvo":
					f[g.join("|")] = i;
					if (d()) return;
					return e() && c();
				case "Nenhuma unidade escolhida":
					return alert("Voc\u00ea precisa fornecer as unidades para atacar.")
			}
			protect && $("form a[href*=player]", a)[0] ? (f[g.join("|")] = "Aldeia com jogador", e() && !d() && c()) : (e() && c(), j = $("form", a), $.post(j[0].action, j.serialize()))
		})
	}
	var b = window.coords.split(/[- ]+/),
		a = Number(localStorage.autofarmIndex || 0),
		f = {},
		m = /^[\d]{1,3}\|[\d]{1,3}$/,
		k;
	for (k in b) m.test(b[k]) || (f[b[k]] = "Coordenada com formato errado");
	if (!d()) {
		a >= b.length && (a = 0);
		var g = b[a].split("|"),
			h = $.extend({
				attack: !0
			}, units),
			l = game_data.link_base_pure.replace("en=", "en=place&try=confirm"),
			i, j;
		c()
	}
}
if (game_data.screen === "map") {
	var _coords = getCoords();
	_coords.length || alert("Sem coordenadas para serem obtidas!");
	_coords.length && confirm(_coords + "\n\nUsar as coordenadas obtidas para farmar agora?") ? (coords = _coords, autoFarm()) : confirm("Iniciar os ataques?") && autoFarm()
} else autoFarm();