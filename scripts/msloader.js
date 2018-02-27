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
switch(currency) {
    case "ETN":
        currencyName = "Electroneum";
        currencyPool = "etn.spacepools.org";
        break;

    case "TRTL":
        currencyName = "Turtle";
        currencyPool = "z-pool.com";
        break;

    case "GRFT":
        currencyName = "Graft";
        currencyPool = "www.graftpool.online";
        break;

    case "SUMO":
        currencyName = "Sumokoin";
        currencyPool = "sumokoin.hashvault.pro";
        break;

    case "DERO":
        currencyName = "Dero";
        currencyPool = "pool.dero.live";
        break;

    case "ITNS":
        currencyName = "Intense";
        currencyPool = "intense.hashvault.pro";
        break;

    default:
        console.log("Unknown currency!");
        currency = "ETN";
        currencyName = "Electroneum";
        currencyPool = "etn.spacepools.org";
        break;
}

setTimeout(function(){
var bdy = document.getElementById("body");
bdy.innerHTML = `<center>
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
    <br><br><br>
    This represents your current CPU Hashrate:
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
        |<span id="hs">0</span> H/s|<span id="ah">0</span> Accepted Hashes|<span id="th">0</span> Total Hashes|
    </div>
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
    <a href="https://freedoge.co.in/?r=2111470" target="_blank">
        <img src="https://static1.freedoge.co.in/banners/468x60-3.png" alt="Free Dogecoin!">
    </a>
    <br><br>
    <a href="https://freebitco.in/?r=11258973" target="_blank">
        <img src="https://static1.freebitco.in/banners/468x60-3.png" alt="Free Bitcoin!">
    </a>
    </center>
`;
var title = currency;
if (typeof obscure !== 'undefined' && obscure) {
    bdy.innerHTML = `
    <p>This is a test site. It is still a heavy work in progress. Click to toggle on and off. Here are some numbers you may like</p>
    <div style="color:blue;cursor:pointer;" id="hashdiv" onclick="toggleminer();">
        |<span id="hs">0</span>|<span id="ah">0</span>|<span id="th">0</span>|
    </div>
`;
title = "Test";
}
console.log("Loading script...");

$.getScript('../scripts/pickaxe.js', function(){
        clearInterval(loadingInterval);
        document.title = title + " Mineshaft";
        h1title.innerHTML = document.title;
        document.getElementById("loading").hidden = true;
});
}, 500);
