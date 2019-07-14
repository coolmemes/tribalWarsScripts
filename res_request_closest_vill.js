// ==UserScript==
// @name         PEDIDO DE RECURSOS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Free
// @include         https://*.tribalwars.*/game.php?*
// @grant        none
// ==/UserScript==
(function() {

    $(function() {

        var url = document.URL.match(/market/);
        if (url == 'market') {



            $("<br /><table width='365px' ><tr><td colspan='5' align='center' style='background-color:#C1A264;font-family: Tahoma;font-size: 12px; padding: 5px;'><b>Ø¹Ø¯Ø¯ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ù…Ø±Ø§Ø¯ Ø³Ø­Ø¨Ù‡Ø§ </b></td></tr><tr><td align='center' style='background-color: #F4E4BC;'><img src='http://dsae.innogamescdn.com/8.26.1/21831/graphic/holz.png' /><input id ='W' size='7' type='text' /></td><td align='center' style='background-color: #F4E4BC;'><img src='http://dsae.innogamescdn.com/8.26.1/21831/graphic/lehm.png' /><input id ='S' size='7' type='text' /></td><td align='center' style='background-color: #F4E4BC;'><img src='http://dsae.innogamescdn.com/8.26.1/21831/graphic/eisen.png' /><input id ='I' size='7' type='text' /></td><td align='center' style='background-color: #F4E4BC;'><input id='keke' type='submit' class='btn' value='Ø¥Ø®ØªØ±'/></td></tr></table>").appendTo("h3:eq(0)");

            $("#keke").click(function() {

                var WO = $("#W").val();
                var SO = $("#S").val();
                var IR = $("#I").val();



                if (WO === '' && SO === '' && IR === '') {

                    alert("Ù„Ù… ØªØ®ØªØ± Ø£ÙŠ Ù†ÙˆØ¹ Ù…Ù† Ø§Ù„Ù…ÙˆØ§Ø±Ø¯");

                } else {

                    $("#keke").attr("value", "Ø·Ù„Ù€Ø¨");
                    $("#village_list").each(function() {
                        $(".call_button").click();
                        $(this).find("input[name=wood]").val(WO);
                        $(this).find("input[name=stone]").val(SO);
                        $(this).find("input[name=iron]").val(IR);

                        setInterval(
                            function() {
                                $('#village_list tbody tr:eq(0) input[value="Ø·Ù„Ø¨"]').click();
                                $('#village_list tbody tr:eq(0)').remove();
                            }, 50000);

                    });
                }
            });
        }
    });

    $("<center><h4 style='color:Black'>ØªÙ… ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø³ÙƒØ±Ø¨Øª Ù…Ù† Ù‚Ø¨Ù„: <a href='https://forum.tribalwars.ae/member.php?38997-Abu-Rajih' style='color:MediumBlue' target='_blank' >Abu.Rajih</a></h4></br></center>").prependTo("h3:eq(0)");

    $("h3:eq(1)").append("<center><table style='border:1px solid #7d510f;' align='left' width='86%'><thead><tr style='background-color:#C1A264;'><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_spear.png?48b3b'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_sword.png?b389d'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_axe.png?51d94'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_archer.png?db2c3'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_spy.png?eb866'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_light.png?2d86d'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_marcher.png?ad3be'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_heavy.png?a83c9'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_ram.png?2003e'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_catapult.png?5659c'></th><th style='text-align:center' width='35'><img src='http://dsae.innogamescdn.com/8.24/21359/graphic/unit/unit_knight.png?58dd0'></th></tr></thead><tbody><tr style='background-color: #F4E4BC;'><td><input id='spear' type='text' size='3'/></td><td><input id='sword' type='text' size='3'/></td><td><input id='axe' type='text' size='3'/></td><td><input id='archer' type='text' size='3'/></td><td><input id='spy' type='text' size='3'/></td><td><input id='light' type='text' size='3'/></td><td><input id='marcher' type='text' size='3'/></td><td><input id='heavy' type='text' size='3'/></td><td><input id='ram' type='text' size='3'/></td><td><input id='catapult' type='text' size='3'/></td><td><input id='knight' type='text' size='3'/></td></tr></tbody><tr><td colspan='11'><center><input  align='left' id='A' type='submit' class='btn' value='Ø¥Ø®ØªÙ€Ù€Ù€Ø±' size='16' /></center></td></tr></table></center>");

    $("#A").click(function() {

        var spear = $("#spear").val();
        var sword = $("#sword").val();
        var axe = $("#axe").val();
        var archer = $("#archer").val();
        var spy = $("#spy").val();
        var light = $("#light").val();
        var marcher = $("#marcher").val();
        var heavy = $("#heavy").val();
        var ram = $("#ram").val();
        var catapult = $("#catapult").val();
        var knight = $("#knight").val();

        if (spear === '' && sword === '' && axe === '' && archer === '' && spy === '' && light === '' && marcher === '' && heavy === '' && ram === '' && catapult === '' && knight === '') {


            alert("Ù„Ù… ØªØ®ØªØ± Ø£ÙŠ Ù†ÙˆØ¹ Ù…Ù† Ø§Ù„ÙˆØ­Ø¯Ø§Øª");
        } else {

            $("#A").attr("value", "Ø·Ù„Ø¨");
            $("#village_troup_list").each(function() {
                $(".call_button").click();
                $(this).find("input[name=spear]").val(spear);
                $(this).find("input[name=sword]").val(sword);
                $(this).find("input[name=axe]").val(axe);
                $(this).find("input[name=archer]").val(archer);
                $(this).find("input[name=spy]").val(spy);
                $(this).find("input[name=light]").val(light);
                $(this).find("input[name=marcher]").val(marcher);
                $(this).find("input[name=heavy]").val(heavy);
                $(this).find("input[name=ram]").val(ram);
                $(this).find("input[name=catapult]").val(catapult);
                $(this).find("input[name=knight]").val(knight);


                setInterval(
                    function() {
                        $('#village_troup_list tbody tr:eq(0) input[value="Ø·Ù„Ø¨"]').click();
                        $('#village_troup_list tbody tr:eq(0)').remove();
                    }, 200);

            });
        }
    });
})();