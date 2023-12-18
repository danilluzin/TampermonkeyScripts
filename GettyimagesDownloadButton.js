// ==UserScript==
// @name         Getty Usefull Download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Danil Luzin
// @match        https://www.gettyimages.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gettyimages.com
// @grant        GM_addStyle
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// test

function log(txt) {
	var verbose = true;
	if (verbose) {
		console.log(txt);
	}
}

log("hero:");
var hero = $("[data-testid='hero-picture']");
var innerSrc = $(hero).find('source');
log($(hero));
log($(innerSrc));

log("start");

//waitForKeyElements(".vItTTzk8rQvUIXjdVfi4", injectMainGrid); //main new universal regex
waitForKeyElements(".pfUuJlGKhrwpbHvJvrfA", injectRelatedGrid); //main new universal regex
waitForKeyElements(".a58rsU9bXPi2pCXFikur", injectBigImage); //main new universal regex

waitForKeyElements(".vItTTzk8rQvUIXjdVfi4", injectGetter); //main v2 universal regex

function injectGetter(jNode) {
    log("new getter injecting");
	var linkElement = $(jNode).find("a").eq(0);
	var detailsUrl = $(linkElement).attr('href');
	injectorV2(jNode, detailsUrl);
}

function injectorV2(jNode, detailsUrl){

	$(jNode).hover(
		function (e) {
             log("new injector v2");
			var isInjected = $(this).attr('injectedGetter');
			if (isInjected !== undefined && isInjected === "injectedGetter") {
				return;
			}
			log("injecting");

            var getterButton = document.createElement("button");
            $(getterButton).html("Get me :3");
			$(getterButton).on( "click", function() {
                $.get(detailsUrl, function(html) {
                    var pictures = $(html).find("[data-testid='hero-picture']");
                    var heroImage = $(pictures).find('source[type$="image/jpeg"]').not('[media]');
                    var targetUrl = $(heroImage).attr("srcset");
                    log("img:")
                    log(targetUrl);

                    $(getterButton).html("Got me :O");
                });
            })

            var style = ` z-index: 1000000;
                          position: absolute;
                          right:5pt;
                          top:5pt;`
            getterButton.style = style;
            this.appendChild(getterButton);

            $(this).attr('injectedGetter', "injectedGetter");
			$(this).addClass("injectedGetter");
        });
}


waitForKeyElements(".l_Ijq5YofuqlByyenqi_", function (Node) {
	$(Node).remove()
});


$("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`);
$("head").append(
	`<style>
     .hide {
       display: none;
     }

    .newDownloadButton:hover{
       filter: brightness(75%);
    }

    .injected:hover .hide {
      display: block;
      color: red;
    }
    .mui-1jaljxv-iconButtonDarkBackground{
      visibility:hidden;
    }

    .pCzloUkHud83IJ4WJPY0{
     z-index: 10000000 !important;
    }

    .qXIz9HQQsxR9_z5UBK18{
    visibility:hidden;
    }

    .PBcpM01Hnm0c52IadBw0{
    display:block !important;
    min-height:0pt !important;
    }

    ._Tj7QQ4piUcSAS3V_RFb{
    max-width: calc(100% - 60pt) !important;
    }

    .nCeRtxREyjkRRC74jjNk{
    display:none !important;
    }
     </style>
    `
);


function injectMainGrid(jNode) {
	var imageID = $(jNode).attr('data-asset-id');
	var linkElement = $(jNode).find("a").eq(0);
	var detailsUrl = $(linkElement).attr('href');
	injector(jNode, imageID, detailsUrl);
}

function injectRelatedGrid(jNode) {
	var detailsUrl = $(jNode).attr('href');
	var imageID = detailsUrl.split('/').slice(-1)[0];
	injector(jNode, imageID, detailsUrl);
}

function injectBigImage(jNode) {
	var detailsUrl = $(jNode).attr('src');
	var imageID = detailsUrl.split('/')[4];
	injector(jNode, imageID, undefined);
}



function injector(jNode, ID, detailsUrl) {
	log("waited for :3");
	$(jNode).hover(
		function (e) {
			log("hover");
			var isInjected = $(this).attr('injected');
			log("injected = " + isInjected);
			if (isInjected !== undefined && isInjected === "injected") {
				log("gotout");
				return;
			}
			log("injecting");

			var imageURL;
			imageURL = `https://media.gettyimages.com/photos/-id${ID}?s=2048x2048&w=5`

			var hdlink = document.createElement("a");
			$(hdlink).addClass("newDownloadButton");
			hdlink.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`;
			hdlink.setAttribute('href', imageURL);
			hdlink.setAttribute('target', "_blank");
			hdlink.setAttribute('download', '');
			$(hdlink).addClass("hide");

			var style = ` z-index: 1000000;
                          position: absolute;
                          right:5pt;
                          top:5pt;

                          padding: 8pt;
                          border-radius: 10pt;
                          font-size:12pt;
                          //background: rgba(0,0,0,0.4);
                          background: rgba(252, 52, 65,1);
                          `;

			hdlink.style = style;

			$(this).attr('injected', "injected");
			$(this).addClass("injected");

			if (detailsUrl == undefined) {
				$(hdlink).removeClass("hide");
				style += `top:20px`;
				hdlink.style = style;
				$(this).parent().append(hdlink);
				return;
			} else {
				this.appendChild(hdlink);
			}

			var clickBlocker = document.createElement("a");

			clickBlocker.setAttribute('href', detailsUrl);
			var blockerStyle = `
            width:100%;
            height:100%;
            background:green;
            z-index: 999999;
            position: absolute;
            bottom:0pt;
            opacity:20%;
            `
			$(clickBlocker).addClass("hide");
			clickBlocker.style = blockerStyle;
			log("returning button: " + hdlink);
			this.appendChild(clickBlocker);
		});
}