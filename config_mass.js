javascript: function Conf_() { /* Lockr Script */
	! function(t, e) {
		t.Lockr = function(t, e) {
			"use strict";
			return e.prefix = "", e._getPrefixedKey = function(t, e) {
				return e = e || {}, e.noPrefix ? t : this.prefix + t
			}, e.set = function(t, e, r) {
				var a = this._getPrefixedKey(t, r);
				try {
					localStorage.setItem(a, JSON.stringify({
						data: e
					}))
				} catch (t) {}
			}, e.get = function(t, e, r) {
				var a, i = this._getPrefixedKey(t, r);
				try {
					a = JSON.parse(localStorage.getItem(i))
				} catch (t) {
					a = localStorage[i] ? {
						data: localStorage.getItem(i)
					} : null
				}
				return null === a ? e : "object" == typeof a && void 0 !== a.data ? a.data : e
			}, e
		}(t, {})
	}(this); /* Limpar */
	$("#content_value").empty(); /* html */
	let html = ['<div id="conf">', '<fieldset id="head">Attack and Support Settings</fieldset>', '<table>', '<tr>', '<td>', '<fieldset style="width:380px">', '<legend>ATTACK Coordinates</legend>', '<textarea style="width:380px" id="coords_ataque"></textarea>', '</fieldset>', '</td>', '<td>', '<p></p>', '</td>', '<td>', '<fieldset style="width:380px">', '<legend>SUPPORT Coordinates</legend>', '<textarea style="width:380px" id="coords_defesa"></textarea>', '</fieldset>', '</td>', '</tr>', '</table>', '<table>', '<tbody>', '<tr>', '<td>', '<fieldset id="units">', '<legend>ATTACK Units</legend>', '<label><input id="spear_a" value="0">Spear</label><br/>', '<label><input id="sword_a" value="0"> Sword</label><br/>', '<label><input id="axe_a" value="0"> Axe</label><br/>', '<label><input id="archer_a" value="0"> Archer</label><br/>', '<label><input id="spy_a" value="0"> Scout</label><br/>', '<label><input id="light_a" value="0"> L. Cavalry</label><br/>', '<label><input id="marcher_a" value="0"> M. Cavalry</label><br/>', '<label><input id="heavy_a" value="0"> H. Cavalry</label><br/>', '<label><input id="ram_a" value="0"> Ram</label><br/>', '<label><input id="catapult_a" value="0"> Catapult</label><br/>', '<label><input id="knight_a" value="0"> Paladin</label><br/>', '<label><input id="snob_a" value="0"> Noble</label><br/>', '</fieldset>', '</td>', '<td></td>', '<td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td><td>', '</td>', '<td></td>', '<td>', '<fieldset id="units" >', '<legend>SUPPORT Units</legend>', '<label><input id="spear_d" value="0">Spear</label><br/>', '<label><input id="sword_d" value="0"> Sword</label><br/>', '<label><input id="axe_d" value="0"> Axe</label><br/>', '<label><input id="archer_d" value="0"> Archer</label><br/>', '<label><input id="spy_d" value="0"> Scout</label><br/>', '<label><input id="light_d" value="0"> L. Cavalry</label><br/>', '<label><input id="marcher_d" value="0"> M. Cavalry</label><br/>', '<label><input id="heavy_d" value="0"> H. Cavalry</label><br/>', '<label><input id="ram_d" value="0"> Ram</label><br/>', '<label><input id="catapult_d" value="0"> Catapult</label><br/>', '<label><input id="knight_d" value="0"> Paladin</label><br/>', '<label><input id="snob_d" value="0"> Noble</label><br/>', '</fieldset>', '</td>', '</tr>', '</tbody>', '</table>', '<fieldset style="margin-top:10px;text-align:center">', '<input type="button" value="Save Settings" id="save" class="btn">', '<input type="button" value="Reset Settings" class="btn" id="reset">', '</fieldset>', '</div>']; /* form */
	$("#content_value").append(html.join(""));
	$('#coords_ataque').text(Lockr.get('Alvos') ? Lockr.get('Alvos') : 'Put coordinates that should be ATTACKED here');
	$('#coords_defesa').text(Lockr.get('Alvos_Apoio') ? Lockr.get('Alvos_Apoio') : 'Put coordinates that should be SUPPORTED here');
	$('input#spear_a').val(Lockr.get('Tropas_Ataque_Lanceiro') ? Lockr.get('Tropas_Ataque_Lanceiro') : 0);
	$('input#sword_a').val(Lockr.get('Tropas_Ataque_Espadachim') ? Lockr.get('Tropas_Ataque_Espadachim') : 0);
	$('input#axe_a').val(Lockr.get('Tropas_Ataque_Barbaro') ? Lockr.get('Tropas_Ataque_Barbaro') : 0);
	$('input#archer_a').val(Lockr.get('Tropas_Ataque_Arqueiro') ? Lockr.get('Tropas_Ataque_Arqueiro') : 0);
	$('input#spy_a').val(Lockr.get('Tropas_Ataque_Explorador') ? Lockr.get('Tropas_Ataque_Explorador') : 0);
	$('input#light_a').val(Lockr.get('Tropas_Ataque_Cavalaria_leve:') ? Lockr.get('Tropas_Ataque_Cavalaria_leve:') : 0);
	$('input#marcher_a').val(Lockr.get('Tropas_Ataque_Arqueiro_a_cavalo') ? Lockr.get('Tropas_Ataque_Arqueiro_a_cavalo') : 0);
	$('input#heavy_a').val(Lockr.get('Tropas_Ataque_Cavalaria_pesada') ? Lockr.get('Tropas_Ataque_Cavalaria_pesada') : 0);
	$('input#ram_a').val(Lockr.get('Tropas_Ataque_Ariete') ? Lockr.get('Tropas_Ataque_Ariete') : 0);
	$('input#catapult_a').val(Lockr.get('Tropas_Ataque_Catapulta') ? Lockr.get('Tropas_Ataque_Catapulta') : 0);
	$('input#knight_a').val(Lockr.get('Tropas_Ataque_Paladino') ? Lockr.get('Tropas_Ataque_Paladino') : 0);
	$('input#snob_a').val(Lockr.get('Tropas_Ataque_Nobre') ? Lockr.get('Tropas_Ataque_Nobre') : 0);
	$('input#spear_d').val(Lockr.get('Tropas_Defesa_Lanceiro') ? Lockr.get('Tropas_Defesa_Lanceiro') : 0);
	$('input#sword_d').val(Lockr.get('Tropas_Defesa_Espadachim') ? Lockr.get('Tropas_Defesa_Espadachim') : 0);
	$('input#axe_d').val(Lockr.get('Tropas_Defesa_Barbaro') ? Lockr.get('Tropas_Defesa_Barbaro') : 0);
	$('input#archer_d').val(Lockr.get('Tropas_Defesa_Arqueiro') ? Lockr.get('Tropas_Defesa_Arqueiro') : 0);
	$('input#spy_d').val(Lockr.get('Tropas_Defesa_Explorador') ? Lockr.get('Tropas_Defesa_Explorador') : 0);
	$('input#light_d').val(Lockr.get('Tropas_Defesa_Cavalaria_leve:') ? Lockr.get('Tropas_Defesa_Cavalaria_leve:') : 0);
	$('input#marcher_d').val(Lockr.get('Tropas_Defesa_Arqueiro_a_cavalo') ? Lockr.get('Tropas_Defesa_Arqueiro_a_cavalo') : 0);
	$('input#heavy_d').val(Lockr.get('Tropas_Defesa_Cavalaria_pesada') ? Lockr.get('Tropas_Defesa_Cavalaria_pesada') : 0);
	$('input#ram_d').val(Lockr.get('Tropas_Defesa_Ariete') ? Lockr.get('Tropas_Defesa_Ariete') : 0);
	$('input#catapult_d').val(Lockr.get('Tropas_Defesa_Catapulta') ? Lockr.get('Tropas_Defesa_Catapulta') : 0);
	$('input#knight_d').val(Lockr.get('Tropas_Defesa_Paladino') ? Lockr.get('Tropas_Defesa_Paladino') : 0);
	$('input#snob_d').val(Lockr.get('Tropas_Defesa_Nobre') ? Lockr.get('Tropas_Defesa_Nobre') : 0); /* Limpar */
	$('#reset').click(function(e) {
		e.preventDefault();
		$('#coords_ataque').val('Put coordinates that should be ATTACKED here');
		Lockr.set('Alvos', 'Put coordinates that should be ATTACKED here');
		Lockr.set("Alvos_Nao_Atacados", '');
		$('#coords_defesa').val('Put coordinates that should be SUPPORTED here');
		Lockr.set('Alvos_Apoio', 'Put coordinates that should be SUPPORTED here');
		Lockr.set("Alvos_Nao_Apoiados", '');
		$('input#spear_a').val(0);
		$('input#sword_a').val(0);
		$('input#axe_a').val(0);
		$('input#archer_a').val(0);
		$('input#spy_a').val(0);
		$('input#light_a').val(0);
		$('input#marcher_a').val(0);
		$('input#heavy_a').val(0);
		$('input#ram_a').val(0);
		$('input#catapult_a').val(0);
		$('input#knight_a').val(0);
		$('input#snob_a').val(0); /* Ataque */
		Lockr.set('Tropas_Ataque_Lanceiro', $('input#spear_a').val());
		Lockr.set('Tropas_Ataque_Espadachim', $('input#sword_a').val());
		Lockr.set('Tropas_Ataque_Barbaro', $('input#axe_a').val());
		Lockr.set('Tropas_Ataque_Arqueiro', $('input#archer_a').val());
		Lockr.set('Tropas_Ataque_Explorador', $('input#spy_a').val());
		Lockr.set('Tropas_Ataque_Cavalaria_leve:', $('input#light_a').val());
		Lockr.set('Tropas_Ataque_Arqueiro_a_cavalo', $('input#marcher_a').val());
		Lockr.set('Tropas_Ataque_Cavalaria_pesada', $('input#heavy_a').val());

		Lockr.set('Tropas_Ataque_Ariete', $('input#ram_a').val());
		Lockr.set('Tropas_Ataque_Catapulta', $('input#catapult_a').val());
		Lockr.set('Tropas_Ataque_Paladino', $('input#knight_a').val());
		Lockr.set('Tropas_Ataque_Nobre', $('input#snob_a').val());
		$('input#spear_d').val(0);
		$('input#sword_d').val(0);
		$('input#axe_d').val(0);
		$('input#archer_d').val(0);
		$('input#spy_d').val(0);
		$('input#light_d').val(0);
		$('input#marcher_d').val(0);
		$('input#heavy_d').val(0);
		$('input#ram_d').val(0);
		$('input#catapult_d').val(0);
		$('input#knight_d').val(0);
		$('input#snob_d').val(0); /* Defesa */
		Lockr.set('Tropas_Defesa_Lanceiro', $('input#spear_d').val());
		Lockr.set('Tropas_Defesa_Espadachim', $('input#sword_d').val());
		Lockr.set('Tropas_Defesa_Barbaro', $('input#axe_d').val());
		Lockr.set('Tropas_Defesa_Arqueiro', $('input#archer_d').val());
		Lockr.set('Tropas_Defesa_Explorador', $('input#spy_d').val());
		Lockr.set('Tropas_Defesa_Cavalaria_leve:', $('input#light_d').val());
		Lockr.set('Tropas_Defesa_Arqueiro_a_cavalo', $('input#marcher_d').val());
		Lockr.set('Tropas_Defesa_Cavalaria_pesada', $('input#heavy_d').val());
		Lockr.set('Tropas_Defesa_Ariete', $('input#ram_d').val());
		Lockr.set('Tropas_Defesa_Catapulta', $('input#catapult_d').val());
		Lockr.set('Tropas_Defesa_Paladino', $('input#knight_d').val());
		Lockr.set('Tropas_Defesa_Nobre', $('input#snob_d').val());
		alert('Settings Saved');
	}); /* Save */
	$('#save').click(function(e) {
		e.preventDefault();
		let ataque = $('#coords_ataque').val().split(',');
		Lockr.set('Alvos', ataque);
		Lockr.set("Alvos_Nao_Atacados", '');
		let defesa = $('#coords_defesa').val().split(',');
		Lockr.set('Alvos_Apoio', defesa);
		Lockr.set("Alvos_Nao_Apoiados", ''); /* Ataque */
		Lockr.set('Tropas_Ataque_Lanceiro', $('input#spear_a').val());
		Lockr.set('Tropas_Ataque_Espadachim', $('input#sword_a').val());
		Lockr.set('Tropas_Ataque_Barbaro', $('input#axe_a').val());
		Lockr.set('Tropas_Ataque_Arqueiro', $('input#archer_a').val());
		Lockr.set('Tropas_Ataque_Explorador', $('input#spy_a').val());
		Lockr.set('Tropas_Ataque_Cavalaria_leve:', $('input#light_a').val());
		Lockr.set('Tropas_Ataque_Arqueiro_a_cavalo', $('input#marcher_a').val());
		Lockr.set('Tropas_Ataque_Cavalaria_pesada', $('input#heavy_a').val());
		Lockr.set('Tropas_Ataque_Ariete', $('input#ram_a').val());
		Lockr.set('Tropas_Ataque_Catapulta', $('input#catapult_a').val());
		Lockr.set('Tropas_Ataque_Paladino', $('input#knight_a').val());
		Lockr.set('Tropas_Ataque_Nobre', $('input#snob_a').val()); /* Defesa */
		Lockr.set('Tropas_Defesa_Lanceiro', $('input#spear_d').val());
		Lockr.set('Tropas_Defesa_Espadachim', $('input#sword_d').val());
		Lockr.set('Tropas_Defesa_Barbaro', $('input#axe_d').val());
		Lockr.set('Tropas_Defesa_Arqueiro', $('input#archer_d').val());
		Lockr.set('Tropas_Defesa_Explorador', $('input#spy_d').val());
		Lockr.set('Tropas_Defesa_Cavalaria_leve:', $('input#light_d').val());
		Lockr.set('Tropas_Defesa_Arqueiro_a_cavalo', $('input#marcher_d').val());
		Lockr.set('Tropas_Defesa_Cavalaria_pesada', $('input#heavy_d').val());
		Lockr.set('Tropas_Defesa_Ariete', $('input#ram_d').val());
		Lockr.set('Tropas_Defesa_Catapulta', $('input#catapult_d').val());
		Lockr.set('Tropas_Defesa_Paladino', $('input#knight_d').val());
		Lockr.set('Tropas_Defesa_Nobre', $('input#snob_d').val());
		alert('Settings Saved');
	});
}
Conf_();