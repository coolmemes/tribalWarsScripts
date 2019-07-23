let points = {
	min: 0,
	max: 12379
};
barbCollect();
function barbCollect() {
	let mapPos;
	let mapSize;
	let tileSize;
	let villages;
	let settings = {
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
			console.log("Not working!");
			return false;
		}
	}

	function listAllCoords() {
		let coords = [];
		let coord = "";
		let x = 0;
		let y = 0;
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
		let selectedCoords = [];
		let village = {};
		let index = 0;
		let points = 0;
		for (i = 0; i < coords.length; i++) {
			index = parseInt(coords[i].join(""));
			if (villages[index]) {
				village = villages[index];
				if (!village.special) {
					if (!village.owner || village.owner == "0") {
						points = parseInt(village.points.replace(".", ""));
						if (points >= settings.min && points <= settings.max) {
							selectedCoords.push([TWMap.villages[coords[i].join("")].id, coords[i][0], coords[i][1]]);
						}
					}
				}
			}
		}
		return selectedCoords;
	}


	function __(settingsObj) {
		settingsObj = settingsObj || {};
		if (checkSettings(settingsObj)) {
			return selectCoords(listAllCoords());
		}
	}
	if (typeof points !== 'undefined') {
		__(points);
	} else {
		__();
	}
}
