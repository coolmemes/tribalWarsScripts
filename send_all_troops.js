let data;
let attackAmnt;
let x = 483;
let y = 488;
let units;
let trainUrl = "https://" + window.location.hostname + game_data.link_base_pure + "train";

let key; // Weird obfuscated key that doesn't seem to be changing but maybe it will at some point
let value; // Value of the key

class Units {
    constructor(spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, paladin, snob, catapultAttack) {
        this.spear = spear;
        this.sword = sword;
        this.axe = axe;
        this.archer = archer;
        this.spy = spy;
        this.light = light;
        this.marcher = marcher;
        this.heavy = heavy;
        this.ram = ram;
        this.catapult = catapult;
        this.paladin = paladin;
        this.snob = snob;
        this.catapultAttack = catapultAttack;
    }
}

function getUnits() {
    $.get(trainUrl, (response) => {
        console.log(response);
        const parser = new DOMParser();
        const dom = parser.parseFromString(response, "text/html");
        console.log(dom);
        let spear = dom.querySelector("tr.row_a:nth-child(2) > td:nth-child(3)").textContent.split("/")[0];
        let sword = dom.querySelector("tr.row_a:nth-child(3) > td:nth-child(3)").textContent.split("/")[0];
        let axe = dom.querySelector("tr.row_a:nth-child(4) > td:nth-child(3)").textContent.split("/")[0];
        let sct = dom.querySelector("tr.row_b:nth-child(5) > td:nth-child(3)").textContent.split("/")[0];
        let lcav = dom.querySelector("tr.row_b:nth-child(6) > td:nth-child(3)").textContent.split("/")[0];
        let ram = dom.querySelector("tr.row_a:nth-child(7) > td:nth-child(3)").textContent.split("/")[0];
        let cat = dom.querySelector("tr.row_a:nth-child(8) > td:nth-child(3)").textContent.split("/")[0];
        units = new Units(spear, sword, axe, 0, sct, lcav, 0, 0, ram, cat, 1, 1, "");
        getKey();
    })
}
//#region attack
/**
 * Get the weird obfuscated key and value which is stored in the rally point and set data
 */
function getKey() {
    $.get("https://" + window.location.hostname + game_data.link_base_pure + "place", function(response) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(response, "text/html");
        key = dom.querySelector("#command-data-form > input:nth-child(1)").getAttribute("name");
        value = dom.querySelector("#command-data-form > input:nth-child(1)").value;
        // Form data for entering the attack dialog
        // Data for support
        /* data = {
            key: value,
            "template_id": "",
            "source_village": game_data.village.id,
            "spear": units.spear,
            "sword": units.sword,
            "axe": units.axe,
            "archer": units.archer,
            "spy": units.spy,
            "light": units.light,
            "marcher": units.marcher,
            "heavy": units.heavy,
            "ram": units.ram,
            "catapult": units.catapult,
            "knight": units.knight,
            "snob": units.snob,
            "x": 0,
            "y": 0,
            "target_type": "coord",
            "input": "",
            "support": "Support",
        };*/

        // Data for attack
        
        data = {
            key: value,
            "template_id": "",
            "source_village": game_data.village.id,
            "spear": units.spear,
            "sword": units.sword,
            "axe": units.axe,
            "archer": units.archer,
            "spy": units.spy,
            "light": units.light,
            "marcher": units.marcher,
            "heavy": units.heavy,
            "ram": units.ram,
            "catapult": units.catapult,
            "knight": units.knight,
            "snob": units.snob,
            "x": x,
            "y": y,
            "target_type": "coord",
            "input": "",
            "attack": "Attack",
        };   
        attack();
    });
}


/**
 * Send post request to attack dialog
 */
function attack() {
    let url = "https://" + window.location.hostname + game_data.link_base_pure + "place&try=confirm";
    $.post(url, data).done(function (response) { // Post request to prepare attack
        const parser = new DOMParser(); // Create new DOM environment
        const dom = parser.parseFromString(response, "text/html"); // Parse the reponse to DOM
        if (dom.querySelector(".error_box")) { // Error check, cancel request on invalid command
            console.error("Error: " + dom.querySelector(".error_box").innerText.trim());
        } else {
            console.log("Sending attack");
            const ch = dom.getElementsByName("ch")[0].getAttribute("value"); // Get attack hash
            sendAttack(ch);
        }
    });
}

function sendAttack(ch) {
    let url = "https://" + window.location.hostname + game_data.link_base_pure + "place&ajaxaction=popup_command&h=" + 
    game_data.csrf + "&client_time" + Math.floor(Timing.getCurrentServerTime() / 1000);

    // Form data to confirm attack, needs to be duplicated due to different order (ban prevention)
    // Data for support
    /*data = {
        "support": true,
        "ch": ch,
        "x": x,
        "y": y,
        "source_village": game_data.village.id,
        "village": game_data.village.id,
        "attack_name": "",
        "spear": units.spear,
        "sword": units.sword,
        "axe": units.axe,
        "archer": units.archer,
        "spy": units.spy,
        "light": units.light,
        "marcher": units.marcher,
        "heavy": units.heavy,
        "ram": units.ram,
        "catapult": units.catapult,
        "knight": units.knight,
        "snob": units.snob,
        "building": units.catapultAttack
    };*/

    // Data for attack
    data = {
        "attack": true,
        "ch": ch,
        "x": x,
        "y": y,
        "source_village": game_data.village.id,
        "village": game_data.village.id,
        "attack_name": "",
        "spear": units.spear,
        "sword": units.sword,
        "axe": units.axe,
        "archer": units.archer,
        "spy": units.spy,
        "light": units.light,
        "marcher": units.marcher,
        "heavy": units.heavy,
        "ram": units.ram,
        "catapult": units.catapult,
        "knight": units.knight,
        "snob": units.snob,
        "building": units.catapultAttack
    };
    
    $.post(url, data).done(function(response) { // Post request to send attack
        if (response.includes("redirect")) {
            console.log("Attack successfully sent!");
        } else {
            console.error(response);
        }
    });
}
//#endregion attack
