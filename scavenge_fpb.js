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
let unit = new Units();
let option = 1;
let postUrl = window.location.origin + "/game.php?village=" + game_data.village.id + "&screen=scavenge_api&ajaxaction=send_squads";
let params = {
    "squad_requests[0][village_id]": game_data.village.id,
    "squad_requests[0][candidate_squad][unit_counts][spear]": unit.spear,
    "squad_requests[0][candidate_squad][unit_counts][sword]": unit.sword,
    "squad_requests[0][candidate_squad][unit_counts][axe]": unit.axe,
    "squad_requests[0][candidate_squad][unit_counts][archer]": unit.archer,
    "squad_requests[0][candidate_squad][unit_counts][light]": unit.light,
    "squad_requests[0][candidate_squad][unit_counts][marcher]": unit.marcher,
    "squad_requests[0][candidate_squad][unit_counts][heavy]": unit.heavy,
    "squad_requests[0][candidate_squad][unit_counts][knight]": "",
    "squad_requests[0][candidate_squad][carry_max]": 155,
    "squad_requests[0][option_id]": option,
    "squad_requests[0][use_premium]": false,
    "h": game_data.csrf
}