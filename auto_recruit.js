const hostname = window.location.hostname;
const villageID = game_data.village.id;
const unitInfoUrl = "https://" + hostname + "/interface.php?func=get_unit_info";
let archer, knight, militia;
let village;
let maxUnits = new Units();
maxUnits.spear = 1500;
maxUnits.sword = 1500;
maxUnits.axe = 1000;
maxUnits.archer = 1500;
maxUnits.spy = 500;
maxUnits.light = 500;
maxUnits.marcher = 0;
maxUnits.heavy = 400;
maxUnits.ram = 20;
maxUnits.catapult = 10;
main();

function main() {
    if (localStorage.autoRecruit === undefined) {
        localStorage.autoRecruit = "{\"villageList\": []}";
    }
    getConfigUnits();
    getTotalUnits(villageID);
}
class VillageObj {
    constructor(units, maxUnits, resources) {
        this.id = villageID;
        this.units = {
            spear: units.spear,
            sword: units.sword,
            axe: units.axe,
            archer: units.archer,
            spy: units.spy,
            light: units.light,
            marcher: units.marcher,
            heavy: units.heavy,
            ram: units.ram,
            catapult: units.catapult
        };
        this.maxUnits = maxUnits;
        this.resources = {
            wood: resources[0],
            stone: resources[1],
            iron: resources[2]
        }
    }
}

class Units {
    constructor() {
        this.archer = 0;
        this.marcher = 0;
        this.spear = 0;
        this.sword = 0;
        this.axe = 0;
        this.spy = 0;
        this.light = 0;
        this.heavy = 0;
        this.ram = 0;
        this.catapult = 0;
    }
}

/**
 * Get total amount of units that belong to the village
 */
function getTotalUnits(villageID) {
    let villageList = JSON.parse(localStorage.autoRecruit);
    $.get("https://" + hostname + "/game.php?village=" + villageID +"&screen=train", function(data) {
        let doc = new DOMParser().parseFromString(data, "text/html");
        const unitTypeLength = doc.querySelector("#train_form > table:nth-child(1)").rows.length;
        let units = new Units();
        for (let i = 2; i < unitTypeLength; i++) {
            let unitName = doc.querySelector("#train_form > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(" + i + ") > td:nth-child(1) > a:nth-child(1)").getAttribute("data-unit");
            units[unitName] = doc.querySelector("#train_form > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(" + i + ") > td:nth-child(3)").innerText.split("/")[1];
        }
        village = new VillageObj(units, [document.getElementById("wood").innerText, document.getElementById("stone").innerText, document.getElementById("iron").innerText]);
        villageList.villageList.push(village);
        localStorage.autoRecruit = JSON.stringify(villageList);
    })
}

/**
 * Check the available units (archer, marcher, paladin, militia)
 */
function getConfigUnits() {
    $.get(unitInfoUrl, function(data) {
        let r = xmlToJson(data)
        archer = r.config.archer !== undefined;
        knight = r.config.knight !== undefined;
        militia = r.config.militia !== undefined;
    })
}

/**
 * Trains unitAmount of unit
 * @param {String}  unit        Name of unit
 * @param {Integer} unitAmount  Amount of unit to train
 */
function recruitUnit(unit, unitAmount) {
    let data = {};
    data["units[" + unit + "]"] = unitAmount;
    let url = "game.php?village=" + game_data.village.id + "&screen=train&ajaxaction=train&h=" + game_data.csrf + "&client_time=" + Math.floor(Timing.getCurrentServerTime()/1000);
    $.post(url, data);  
}

function getCurrentRecruit(villageID) {
    
}





//#region Utility

/**
 * Convert XML to JSON, used for world configs
 * @param {XML} xml 
 */
function xmlToJson(xml) {
	// Create the return object
	let obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (let j = 0; j < xml.attributes.length; j++) {
				let attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(let i = 0; i < xml.childNodes.length; i++) {
			let item = xml.childNodes.item(i);
			let nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					let old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

//#endregion Utility
