var devWallets = {
    "AEON" : "WmtmYA9Q8hT6PnknGNTBe1PUoGKbatK7mSg1wC51d4BRQu1xYdY4bA2PPivxnR621YMXjDF399399jboWm1eFbfC27tvLep1c",
    "XMR" : "47pfFbfcRWhjbKzLEU5iLGhVY7U6iMNdodH8r7S9MQxwYBTqaYjLZVr7pVEjunW17KXpgW5T83gjyRF2FXNyXxC73523jZJ"
}

var websites = {
    "aeonfaucet.info" : ["AEON", "faucet.info"],
    "monerofaucet.info" : ["XMR", "faucet.info"],
    "faucet.fonero.org" : ["FNO", "faucet.fno"]
}


function faucetinfo(wallet) {
    var faddr = document.getElementById("address");
    if (faddr) {
        faddr.value = wallet;
    } else {
        console.log("No address element!");
    }

    var fbutton = document.getElementById("claim");
    if (fbutton) {
        fbutton.disabled = false;
    } else {
        console.log("No address element!");
    }
}

function fnofaucet() {
    
}


var website = window.location.hostname;

var info = websites[website.toLowerCase()];
var coin = "UNKNOWN";
var type = null;
var wallet = null;
if (info == null) {
    while(coin) {
        coin = prompt("Unknown page! Please enter the currency manually.");
        wallet = devWallets[coin.toUpperCase()];
        if (wallet) {
            break;
            type ="unknown";
        }
    }
} else {
    coin = info[0];
    type = info[1];
    wallet = devWallets[coin.toUpperCase()]
}

switch(type) {
    case "faucet.info":
        faucetinfo(wallet);
        break;

    case "faucet.fno":
        fnofaucet();
        break;

    default:
    console.log("Unknown type!");
}
