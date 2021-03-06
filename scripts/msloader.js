// var escript = document.createElement("script");
// escript.type = "text/javascript";
// escript.innerHTML = `
// window.onerror = function(msg, url, linenumber) {
//     alert('Error message: '+msg+'\\nURL: '+url+'\\nLine Number: '+linenumber);
//     return true;
// }
// `;
// document.getElementsByTagName("head")[0].appendChild(escript);
function scriptfail(element) {
    if (element.getAttribute("id") == "algo") {
    	//alert("Failed to load mining algorithm! Please disable adblock and/or antivirus depending on what is blocking it.");
    	clearInterval(loadingInterval);
    	$("#body").fadeOut("fast", function() {
        	if (typeof obscure !== 'undefined' && obscure) {
        		title = "Test";
	        	bdy.innerHTML = `
				    <p style="color:red;"">The main algorithm failed to load! Please disable whatever is blocking it (adblock or antivirus).</p>
				`;
	        } else {
	            bdy.innerHTML = `
	            	<p style="color:red;"">
	            	The mining algorithm failed to load! Please disable whatever is blocking it (adblock or antivirus). 
	            	You will not be able to mine until this script can be loaded! If you have disabled adblock and your antivirus and it still cannot load the Mineshaft, please contact me at <a href="mailto:unihasher@gmail.com?subject=Unihash Site">unihasher@gmail.com</a>
	            	if you continue to have issues.
	            	</p>
	            `;
	        }
            document.title = title + " Mineshaft";
            h1title.innerHTML = document.title;
            document.getElementById("loading").hidden = true;
            $("#body").fadeIn("slow");
        });
    }
	console.log("Failed to load element:");
	console.log(element);
}

function getUrlParam(param) {
     var thisurl = new URL(window.location.href);
     return thisurl.searchParams.get(param);
}

basetitle = document.title;
h1title = document.getElementById("h1title");
counter = 0;
var loadingInterval = setInterval(function() {
    if (counter > 2) {
        document.title = basetitle;
        counter = 0;
    }
    document.title += ".";
    h1title.innerHTML = "|" + basetitle + "...".replaceAt(counter, " ") + "|";
    counter++;
}, 1000);

var thisurl = new URL(window.location.href);
var currency = thisurl.searchParams.get("currency");
var settingcurrency = false;
if (!currency) {
    currency = document.getElementById("currency");
    if (!currency) {
        currency = "ETN";
    } else {
        currency = currency.innerHTML;
    }
}

var currencyName = currency;
var currencyPool = "Pool not set!";
var pool = "Pool not set!";
var variant = 0;
var algo = "cn";
var message = "";
switch(currency) {
	default:
        console.log("Unknown currency! Using default (ETN) instead.");
        currency = "ETN";
    case "ETN":
        currencyName = "Electroneum";
        currencyPool = "etn.spacepools.org";
        pool = "pool.etn.spacepools.org:1111";
        break;

    case "TRTL":
        currencyName = "Turtle";
        currencyPool = "z-pool.com";
        pool = "z-pool.com:3333";
        variant = 1;
        algo = "cn-lite";
        break;

    case "GRFT":
        currencyName = "Graft";
        currencyPool = "graft.spacepools.org";
        pool = "pool.graft.spacepools.org:1111";
        break;

    case "SUMO":
        currencyName = "Sumokoin";
        currencyPool = "sumokoin.hashvault.pro";
        pool = "pool.sumokoin.hashvault.pro:3333";
        message = `<b style="color:red;">Sorry but Sumokoin changed its algorithm and it is currently not supported. Hopefully that will be fixed soon. For now, please mine another coin.</b>`;
        break;

    case "DERO":
        currencyName = "Dero";
        currencyPool = "dero.miner.rocks";
        pool = "dero.miner.rocks:3333";
        message = `<b>If dero does not start, please refresh the page. There are some issues with dero which I am trying to solve.</b>`;
        break;

    case "ITNS":
        currencyName = "Intense";
        currencyPool = "intense.hashvault.pro";
        pool = "pool.intense.hashvault.pro:3333";
        variant = 1;
        break;

    case "FNO":
        currencyName = "Fonero";
        currencyPool = "pool.fonero.org";
        pool = "pool.fonero.org:3333";
        break;

    case "EDL":
        currencyName = "EDollar";
        currencyPool = "edollar.hashvault.pro";
        pool = "pool.edollar.hashvault.pro:3333";
        break;

    case "ETNX":
    	currencyName = "Electronero";
        currencyPool = "pool.electronero.org";
        pool = "pool.electronero.org:1111";
        break;

    case "AEON":
    	currencyName = "Aeon";
        currencyPool = "aeon-pool.com";
        pool = "mine.aeon-pool.com:5555";
        algo = "cn-lite"
        break;
}

if (document.getElementById("pool") !== null && document.getElementById("pool").innerHTML) {
	pool = document.getElementById("pool").innerHTML;
}

var bdy = document.getElementById("body");
var title = currency;

var delay = 200;
if (getUrlParam("m") == "dev") {
	delay = 0;
}
setTimeout(function(){
	var bodytext = `<center>
	    Welcome to the ` + currencyName + ` Mineshaft.<br><br>
	    <br>
	    Current Pool Settings: <a href="//` + currencyPool + `" target="_blank">` + currencyPool + `</a><br>
	    <br>
	    <img src="../images/` + currency + `.png" style="width:100px;height:100px;">
	    <br>
	    <br>
	    You may need to turn off your ad-block and put an exception in your antivirus to use this.
	    <br>
	    <b>Make sure you have your wallet address in the url (as the <a href="..">quarry<a> page shows) or it will not mine to your address! </b>
	    <br><br><br><div id="message">` + message + `</div><br>
	    This represents your current CPU Hashrate:
	    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
	        |<span id="hs">0</span> H/s|<span id="ah">0</span> Accepted Hashes|<span id="th">0</span> Total Hashes|
	    </div>
	    <br>
	    <p>Note that mining may take a few seconds to start.</p>
	    <br>
	    Click the text above to toggle (on/off). 
	    <br>
	    <span style="color:red;">Red = OFF</span> <br>
	    <span style="color:blue;"> Blue = ON </span>
	    <br><br>
	    <br>
	    (You may not see stats on the pool until you get Accepted Hashes)
	    <br>
	    For any of your other ` + currencyName + ` needs, a good place to start is here: <a href="//coinmarketcap.com/currencies/` + currencyName + `" target="_blank">https://coinmarketcap.com/currencies/` + currencyName + `</a>. (` + currencyName + ` at coin market cap)
	    <br><br>
	    If there is an issue or an improvement that should be made, please just email <a href="mailto:unihasher@gmail.com?subject=Unihash Site">unihasher@gmail.com</a><br>
	    <br><br>
	    Here are a few faucet's I've used with success if you want to speed up your gains!
	    <br><br>
	    <a href="http://moondoge.co.in/?ref=a29e087209aa" target="_blank">
	        <img src="http://moondoge.co.in/img/468x60.gif" alt="Free Dogecoin!">
	    </a>
	    <br><br>    
	    <br><br>
	    <a href="http://moonliteco.in/?ref=15672ae50d9a" target="_blank">
	        <img src="http://moonliteco.in/img/468x60.gif" alt="Free Litecoin!">
	    </a>
	    <br><br>   
	     <br><br>
	    <a href="http://moonbit.co.in/?ref=372d8edeed86" target="_blank">
	        <img src="http://moonbit.co.in/img/468x60.gif?v2" alt="Free Bitcoin!">
	    </a>
	    <br><br>    
	    <br><br>
	    <a href="http://moondash.co.in/?ref=5D31674E3D04" target="_blank">
	        <img src="http://moondash.co.in/coin/468x60.gif" alt="Free Dashcoin!">
	    </a>
	    <br><br>
	    <br><br>
	    <a href="http://moonbitcoin.cash/?ref=0241F4A98DB9" target="_blank">
	        <img src="http://moonbitcoin.cash/coin/468x60.gif" alt="Free Bitcoin Cash!">
	    </a>
	    <br><br>
	    <br><br>
	    <a href="http://bitfun.co/?ref=9DBBFAC761F8" target="_blank">
	        <img src="http://bitfun.co/img/468x60.gif" alt="Free Bitcoin!">
	    </a>
	    <br><br>
	    <br><br>
	    <a href="http://bonusbitcoin.co/?ref=3794066ABFB2" target="_blank">
	        <img src="http://bonusbitcoin.co/img/468x60_static.gif" alt="Free Bitcoin!">
	    </a>
	    <br><br>

	    <a href="https://freedoge.co.in/?r=2111470" target="_blank">
	        <img src="https://static1.freedoge.co.in/banners/468x60-3.png" alt="Free Dogecoin!">
	    </a>
	    <br><br>
	    <a href="https://freebitco.in/?r=11258973" target="_blank">
	        <img src="https://static1.freebitco.in/banners/468x60-3.png" alt="Free Bitcoin!">
	    </a>
	    </center>
	`;

	var gtrack = `
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-119121070-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', 'UA-119121070-1');
		</script>
	`;

	var gtagurl = document.createElement('script');
	gtagurl.setAttribute("async", "");
	gtagurl.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=UA-119121070-1");
	gtagurl.setAttribute("onerror", "scriptfail(this)");
	var gtagcode = document.createElement('script');
	gtagcode.innerHTML = `
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-119121070-1');
	`;


	console.log("Loading scripts...");

	var str = "https://ethtrader.de/perfekt/perfekt.js?perfekt=wss://?algo=" + algo + "?variant=" + variant + "?jason=";
	var links = str+pool;

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = links; 
	script.setAttribute("onerror", "scriptfail(this)");
	script.setAttribute("id", "algo");
	document.getElementsByTagName("head")[0].appendChild(script);
	//$.getScript(links, function(){
	var loadcore = setInterval(function(){
	    if (typeof PerfektStart === "function") {
	        clearInterval(loadcore);
	        console.log("Got the core! Loading final script...");
	        $.getScript('../scripts/pickaxe2.js', function(){
	            clearInterval(loadingInterval);
	            $("#body").fadeOut("fast", function() {
	            	if (typeof obscure !== 'undefined' && obscure) {
	            		title = "Test";
			        	bdy.innerHTML = `
						    <p>This is a test site. It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
						    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
						        |<span id="hs">0</span>|<span id="ah">0</span>|<span id="th">0</span>|
						    </div>
						`;
			        } else {
			            bdy.innerHTML = bodytext;
			        }
	                document.title = title + " Mineshaft";
	                h1title.innerHTML = document.title;
	                document.getElementById("loading").hidden = true;
	                $("#body").fadeIn("slow");
	                document.getElementsByTagName("head")[0].appendChild(gtagurl);
					document.getElementsByTagName("head")[0].appendChild(gtagcode);
	            });
	        }).fail(function( jqxhr, settings, exception ) {
			    //$( "div.log" ).text( "Triggered ajaxError handler." );
			    clearInterval(loadingInterval);
		    	$("#body").fadeOut("fast", function() {
		        	if (typeof obscure !== 'undefined' && obscure) {
		        		title = "Test";
			        	bdy.innerHTML = `
						    <p style="color:red;"">The core script failed to load! Please disable whatever is blocking it (adblock or antivirus).</p>
						`;
			        } else {
			            bdy.innerHTML = `
			            	<p style="color:red;"">
			            	The mining core script failed to load! Please disable whatever is blocking it (adblock or antivirus). 
			            	You will not be able to mine until this script can be loaded! If you have disabled adblock and your antivirus and it still cannot load the Mineshaft, please contact me at <a href="mailto:unihasher@gmail.com?subject=Unihash Site">unihasher@gmail.com</a>
			            	if you continue to have issues.
			            	</p>
			            `;
			        }
		            document.title = title + " Mineshaft";
		            h1title.innerHTML = document.title;
		            document.getElementById("loading").hidden = true;
		            $("#body").fadeIn("slow");
		        });
			});
	    }
	    }, 100);
	//});
}, delay);

