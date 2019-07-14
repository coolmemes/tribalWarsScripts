// ==UserScript==
// @name Snipe por cancelamento
// @author Me
// @include https://*&screen=place*
// @grant GM_getTab
// @grant GM_saveTab
// ==/UserScript==
var T;

GM_getTab(function(tab) {
    T = tab;
    if(tab.state === undefined)
        T.state = 0;
    var confirm = location.href.match("https://.*/game\.php.*screen=place.*try=confirm.*") !== null;
    if(!confirm){
        if(T.state === 0)
            SC.init0();
        else if(T.state == 1){
            if(location.href !== T.targetUrl)
                windowlocation = T.targetUrl;
            else
                SC.init1();
        }else if(T.state == 3)
            SC.init3();
        //else if(T.state == 4)
        //	SC.init3();
    }else if(T.state == 2)
        SC.init2();
});

SC = {
    error: function(errorMsg){
        $(".error_box").remove();
        $("td#content_value").prepend("<div class=\"error_box\"><div class=\"content\">" + errorMsg + "</div></div>");
    },
    init0:function(){
        $("input.btn-cancel").parent().append("<button type=\"button\" id=\"SC_SNIPAR\" name=\"SC_SNIPAR\" class=\"btn\">Snipar o cabrão</button>");
        $("#SC_SNIPAR").click(function(){
            var times = [];
            for(var i = 0; i < $(".command-row").length; i++)
                if($($(".command-row").eq(i)).find("input[type=checkbox]").is(":checked"))
                    times.push(SC.convertArrivalTime($($(".command-row").eq(i)).find("td")[1].innerText));
            if(times.length != 2){
                SC.error("Tens que selecionar exatamente dois comandos!");
                return;
            }
            var targetUrl = location.href;
            var units = {};
            $(".unitsInput").each(function (i, val){
                units[$(this).attr("id")] = Number($(this).val());
            });
            T.times = times;
            T.targetUrl = targetUrl;
            T.units = units;
            $("input.btn-cancel").parent().append("Delay NET: <input type=\"number\" id=\"SC_OFFSET\"/><button type=\"button\" id=\"SC_SNIPAR_CONFIRMAR\" name=\"SC_SNIPAR_CONFIRMAR\" class=\"btn\">OK</button>");
            this.offset = localStorage.getItem("CS.offset") || -250;
            $("#SC_OFFSET").val(this.offset);
            $("#SC_SNIPAR_CONFIRMAR").click(function(){
                T.offset = $("#SC_OFFSET").val();
                localStorage.setItem("CS.offset", T.offset);
                T.state = 1;
                GM_saveTab(T);
                window.location = T.targetUrl;
            });
        });
    },
    init1:function(){
        var notroops = true;
        var interv = setInterval(function(){
            var done = true;
            for(var key in T.units){
                $("#" + key).val(T.units[key]);
                var max = $("#" + key).parent().find(".units-entry-all").text();
                max = max.substring(1, max.length - 1);
                if(T.units[key] > max)
                    done = false;
            }
            if(done){
                notroops = false;
                T.state = 2;
                GM_saveTab(T);
                var t1 = new Date(T.times[0]), now = new Date();
                setTimeout(function(){
                    $("#target_attack").click();
                }, t1 - now - (19*60+59)*1000);
                clearInterval(interv);
            }
        }, 10);
        setTimeout(function(){
            if(notroops)
                window.location = T.targetUrl;
        }, 2000);
    },
    /*
    targettime: 1520204037303
    now 1520203302741
    offset: 45620
    12:20
    */

    init2:function(){
        var now = new Date().getTime();
        var confirmButton = $("#troop_confirm_go");
        T.alvo = $($(".village_anchor a").eq(0)).text();
        confirmButton.addClass("btn-disabled");
        T.duration = $("#command-data-form").find("td:contains(\"Duração:\")").next().text().split(":").map(Number);
        T.state = 3;
        var offsetVal = T.offset;
        var target = SC.getTargetTime();
        var timeToTarget = target - now;
        var offsetToSend = SC.getClosest(timeToTarget);
        T.timesent = offsetToSend;
        GM_saveTab(T);

        setTimeout(function(){
                confirmButton.click();
            },
            target - offsetToSend - now + 1*offsetVal
        );
    },
    init3:function(){
        console.log("alvo=" + T.alvo);
        var cmd;
        $("#commands_outgoings .quickedit-label").each(function(){
            if($(this).text().indexOf(T.alvo) !== -1)
                cmd = $(this).parent().eq(4);
        });
        var cancel = $(cmd).find(".command-cancel"); //cruz para cancelar
        var arrival = SC.convertArrivalTime($($(cmd)).find("td")[1].innerText); //hora a que este ataque chega
        var dur = T.duration[0]*3600 + T.duration[1]*60 + T.duration[2]; //duração do ataque
        var sent = arrival.getTime() - dur*1000; //cálculo hora exata a que foi enviado
        var senttime = new Date(sent);
        var t1time = new Date(T.times[0]), t2time = new Date(T.times[1]), t1 = t1time.getTime(), t2 = t2time.getTime(); //ataques para snipar (1 e 2)
        var targetSecond = (arrival.getMilliseconds() < t2time.getMilliseconds() ? new Date(t2) : new Date(t1));
        targetSecond.setMilliseconds(0);
        var journey = targetSecond.getTime() - (sent - senttime.getMilliseconds()); //tempo entre o segundo em que foi enviado e o segundo em q o target chega
        var journeytime = new Date(journey);
        var returnTime = sent + journey; //hora a que, cancelando, o ataque chegaria
        //DEBUG
        console.log("enviado às: " + senttime);
        console.log("target second: " + targetSecond);
        console.log("journey time: " + journeytime);
        console.log("return time: " + new Date(returnTime) + ":" + (new Date(returnTime)).getMilliseconds());
        //END DEBUG
        if(journeytime.getSeconds() % 2 !== 0 || returnTime < t1 || returnTime > t2){
            T.offset = 1*T.offset + (t2 - returnTime);
            localStorage.setItem("CS.offset", T.offset);
            //fora do intervalo, cancelar e tentar outra vez
            T.state = 1;
            GM_saveTab(T);
            cancel.click();
            setTimeout(function(){
                window.location = T.targetUrl;
            }, 500);
        }else{
            var canceltime = sent + (journey/2);//cálculo hora a que se tem q cancelar
            var canceldate = new Date(canceltime);
            var now = new Date();
            T.state = 0;
            GM_saveTab(T);
            SC.error("A cancelar às " + canceldate + " - NÃO MEXER EM NADA!");
            var cancelbits = [canceldate.getHours(), canceldate.getMinutes(), canceldate.getSeconds()];
            var cancelInterval = setInterval(function(){
                if(SC.checkTime(cancelbits)){
                    clearInterval(cancelInterval);
                    setTimeout(function(){
                        cancel.click();
                    }, 200);
                }
            }, 1);
            setTimeout(function(){
                SC.error("SNIPADO POR PHILIPSNOSTRUM BIAAAATCHHHH!!!!");
            }, canceldate.getTime() - now.getTime() + 1000);
        }
    },
    checkTime:function(bits){
        var clock = $("#serverTime").html().split(":");
        return clock[0] == bits[0] && clock[1] == bits[1] && clock[2] == bits[2];
    },
    getClosest:function(time){
        var t = (19*60+40)*1000;
        while(t > 0){
            if(time > t)
                return t;
            t -= 4*1000;
        }
        return 0;
    },
    getTargetTime:function(){
        var t1 = new Date(T.times[0]).getTime(), t2 = new Date(T.times[1]).getTime();
        return Math.round(t1 + ((t1-t2)/2));
    },
    convertArrivalTime:function(timeString){
        var bits = timeString.split(" "), i = 2;
        var date = new Date();
        if(bits[0] === "amanhã"){
            date.setTime(date.getTime() + 86400000);
        }else if(bits[0] === "a"){
            var d = bits[1].split(".");
            date.setDate(Number(d[0]));
            date.setMonth(Number(d[1]) - 1);
            i++;
        }
        var tbits = bits[i].split(":");
        date.setHours(tbits[0]);
        date.setMinutes(tbits[1]);
        date.setSeconds(tbits[2]);
        date.setMilliseconds(tbits[3]);
        return date;
    }
};