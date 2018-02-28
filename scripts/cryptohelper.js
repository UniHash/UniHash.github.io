var fnoWallets = {
    "Thaumic" : "8wjbjpKucDLctKSK7Ma4WkaRhcxhUAwGaMJj22QF1bXsGX4AEvdciykRzC9UutNqpQjU1g9R6CXzq2sixDqqTVu9GiVZWdB",
    "Online" : "93Qan7JqcWNfFrakhvFXb37JcJGe3YvsGL59L51dXL1o8GUStxzrmzRTiqFNAejBBVLxDd5mUKBNYP9STU3qzbrU7rSrtFCxGfC65g3Lrn",
    "faucet1" : "8zf2sG57Taq5jNGwPnhju8FwBAAobFsv58KctNfwWR6Jd2QaYJC7uHsfcvHZVuQ6ZwSTULpZdEAfwhtyVkVA9nFaL29dzsw",
    "faucet2" : "8uorGCRgXvhh7EKJ4yMEnbWER7q9eAxVW4GJxCTZWAz2PCMAZLAaAa65Zq43BU2VPrNsfoYD2X78GZwN3SEECucGKQ8o9Et",
    "faucet3" : "8xkLuu8pCg83QvVLV4qQxbCrhv1pzTeF2aJP7piwkG2vgqYatXzx3vjSR8UrLzbxZf4i9UK3FHDaSZza8wbr6AtVLVjFuL5",
    "faucet4" : "8xtXnAesHHPeYM1x3SiY9GXUMrFPZnmpxWo2PTsFCCf2SPkTpGN7QD92UmtP232xg8MEMmeWeCTWGbiSym58U9nh1XoLoAo",
    "faucet5" : "92UTrHPHxBRXEY8xD5CkXcFoiucyTZmvrLpnWmmPBgRGGxBFAEkxpkiKyRJjGqmdS9YRPN8kQ9FwrRE7pZszJoMePVnVumq"
}

var devWallets = {
    "AEON" : "WmtmYA9Q8hT6PnknGNTBe1PUoGKbatK7mSg1wC51d4BRQu1xYdY4bA2PPivxnR621YMXjDF399399jboWm1eFbfC27tvLep1c",
    "XMR" : "47pfFbfcRWhjbKzLEU5iLGhVY7U6iMNdodH8r7S9MQxwYBTqaYjLZVr7pVEjunW17KXpgW5T83gjyRF2FXNyXxC73523jZJ",
    "FNO" : fnoWallets["Thaumic"]
}

var websites = {
    "aeonfaucet.info" : ["AEON", "faucet.info"],
    "monerofaucet.info" : ["XMR", "faucet.info"],
    "faucet.fonero.org" : ["FNO", "faucet.fno"]
}

function loadfile(filename) {
    filetype = filename.substring(filename.indexOf(".") + 1);
    console.log(filename);
    console.log(filetype);
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (fileref) {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
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
    var addr = `
    <form action="/" method="post">
                <div class="form-group" style="text-align: left;">
                    <label style="font-family: 'Roboto', sans-serif; font-size: 18px;">Fonero address:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" name="wallet" placeholder="Enter your Fonero address... (8...)">
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="submit" style="font-family: 'Roboto', sans-serif; font-size: 18px;">Get free coins...</button>
                        </span>
                    </div>

                    <div class="g-recaptcha" data-sitekey="6LcHfD0UAAAAAO283tgOnNbjrLKx24h7uZ-H-a8x" style="margin-top: 15px; float: right;"></div>
                    <script src="https://www.google.com/recaptcha/api.js"></script>
                    <div class="clearfix"></div>
                </div>
            </form>
    `;
    var wn = "UNKNOWN";
    while (wn) {
        wn = prompt("Please enter wallet name:");
        if (fnoWallets[wn] != null) {
            break;
        }
    }
    var w = fnoWallets[wn];
    if (wn == null) {
        w = "Wallet not set!";
    }
    var walloc = document.getElementsByName("wallet")[0];
    if (walloc) {
        walloc.value = w;
    } else {
        //var recap = "https://www.gstatic.com/recaptcha/api2/v1519325468512/recaptcha__en.js";
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", "https://www.gstatic.com/recaptcha/api2/v1519325468512/recaptcha__en.js");
        document.getElementsByTagName("head")[0].appendChild(fileref);
        var recap = "https://www.google.com/recaptcha/api.js";
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", recap);
        document.getElementsByTagName("head")[0].appendChild(fileref);

        var inputer = document.createElement("div");
        inputer.innerHTML = addr;
        document.body.insertBefore(inputer, document.body.firstChild);
        var walloc = document.getElementsByName("wallet")[0];
        walloc.value = w;
    }
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
