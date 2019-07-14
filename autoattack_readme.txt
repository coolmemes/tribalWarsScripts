- Download Tampermonkey https://tampermonkey.net/

- Download Script https://greasyfork.org/en/scripts/32749-set-arrival-time

- For each attack you want to make, open a new window and not a tab
	and do not minimize the windows	as there will be a delay of up to
	two seconds.
	
- In IW, prepare an attack/a support until you come to "Send Attack".
	Please note that the script will not work when attacking directly 
	from the map, you have to go to the village information and select
	"Send Troops" in order for the script to work.

- Click "Set Arrival Time". A prompt appears. Enter your desired arrival
	time without milliseconds (e.g. 21:23:02) and hit enter.
	Another prompt appears where you enter the desired milliseconds.
	Enter only the milliseconds (e.g. 312). The script will then try
	to send the attack so it arrives at 21:23:02:312 (hh:mm:ss:ms).
	
- Wait until the right time has come and the script will automatically
	send the attack.
	
- It is very likely that your attack will be sent 500ms too early or 
	too late when you just installed the script. This is because your
	computer's processing power is different from mine and the script's
	default offset is set to my optimum. 
	Please test yourself first how much of an offset you have. Then you
	need to go to the code of the script (go to Tampermonkey and select 
	the script "Set Arrival Time") and change the number in line 14
		window.delayTime = 11; // Set delay in ms
	Change the 11 to something higher, for example 15, if the attack is
	sent too early. Set it to something lower if the attack is sent too late.
	Just play with that number.
	

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////WARNING/////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

If you leave the attack window open for a long time (5+ hours) it could 
be that the error message "Invalid request - It appears that you have too 
many sessions open" or something like that appears. This only happens if 
you setup the attack and then do _lots_ of other stuff in that world, for
example constantly logging in. If you just set the script before you go to 
bed without playing much more, you will be fine. 

As you will not refresh the site once you setup the attack, no new information
will be pulled from the TW server. Therefore, if you set the script very early
before the attack, you may experience a delay up to 500ms. Let's say I set up the
attack at 21:00:00 so the script would send the attack at 05:00:00:000 in the morning,
it could be that the attack will arrive at 05:00:00:500.

The computer may not be put to sleep or something else, otherwise the script
will not be executed.