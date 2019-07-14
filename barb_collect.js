javascript: var pontok = {
	min: 0,
	max: 12379
};
var fejleszto = "IronFist";
var verzio = "1.1";
(function() {
	var mapPos;
	var mapSize;
	var tileSize;
	var villages;
	var settings = {
		min: 0,
		max: 12154
	};

	function checkSettings(settingsObj) {
		if (game_data.screen == "map") {
			settings = $.extend({
				min: 0,
				max: 12154
			}, settingsObj);
			mapPos = TWMap.map.pos;
			mapSize = TWMap.size;
			tileSize = TWMap.tileSize;
			villages = TWMap.villages;
			return true;
		} else {
			alert("A script csak a térképen fut.\nUgrás a térképre...");
			self.location = game_data.link_base_pure.replace(/screen\=/i, "screen=map");
			return false;
		}
	}

	function listAllCoords() {
		var coords = [];
		var coord = "";
		var x = 0;
		var y = 0;
		for (col = 0; col < mapSize[0]; col++) {
			for (row = 0; row < mapSize[1]; row++) {
				x = mapPos[0] + (tileSize[0] * col);
				y = mapPos[1] + (tileSize[1] * row);
				coord = TWMap.map.coordByPixel(x, y, false);
				coords.push(coord);
			}
		}
		return coords;
	}

	function selectCoords(coords) {
		var selectedCoords = [];
		var village = {};
		var index = 0;
		var points = 0;
		for (i = 0; i < coords.length; i++) {
			index = parseInt(coords[i].join(""));
			if (villages[index]) {
				village = villages[index];
				if (!village.special) {
					if (!village.owner || village.owner == "0") {
						points = parseInt(village.points.replace(".", ""));
						if (points >= settings.min && points <= settings.max) {
							selectedCoords.push(TWMap.villages[coords[i].join("")].id + '&' + coords[i].join("|"));
							console.log(coords[i]);
						}
					}
				}
			}
		}
		return selectedCoords;
	}

	function createStirng(coords) {
		return coords.join(",");
	}

	function createInterface() {
		if ($('textarea#scriptused_coords').length == 0) {
			$('.minimap_container').after('<textarea id="scriptused_coords" cols="40" rows="20"></textarea>');
		} else {
			$('textarea#scriptused_coords').val("");
		}
	}

	function bind() {
		$('textarea#scriptused_coords').on('focus', function() {
			$(this).select();
		});
	}

	function refreshData(coords) {
		$('textarea#scriptused_coords').val(coords);
	}

	function __(settingsObj) {
		settingsObj = settingsObj || {};
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));
			$('body').empty();
			return false;
		}
		if (checkSettings(settingsObj)) {
			var preCoords = listAllCoords();
			var realCoords = selectCoords(preCoords);
			var textOfCoords = createStirng(realCoords);
			createInterface();
			bind();
			refreshData(textOfCoords);
		}
	}
	if (typeof pontok !== 'undefined') {
		__(pontok);
	} else {
		__();
	}
})();
void(0);