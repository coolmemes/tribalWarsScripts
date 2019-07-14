/**
 * Developer:  Rayan de Freitas rayandefreitas@outlook.com  Dale McKay dalesmckay@gmail.com
 */
var checkid = ($('a[href*="action=logout"]:first').attr('href').match(/[\?|\&]h\=(\w+)/) || ['', ''])[1];
if (typeof building == 'undefined') var building = 'snob&action=train&h=' + checkid;
$('tr:not(:first) td span a').each(function(i, e) {
	e.href = e.href.replace('&screen=overview', '&screen=' + building);
});