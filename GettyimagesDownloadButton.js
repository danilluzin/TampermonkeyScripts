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


function waitRemove(jNode) {
	function removeMe(node) {
		$(node).remove()
	}
	waitForKeyElements(jNode, removeMe);
}

//hero image AI buttons
//now  hiding them in CSS just to make it load invisible. Should be faster as well
//waitRemove("[data-testid='ai-remove-background-button']")
//waitRemove("[data-testid='modify-with-ai-button-no-generations']")

//Side hero image price etc
//waitRemove("[data-testid='assetAcquisitionCardContainer']")
waitForKeyElements("[data-testid='assetAcquisitionCardContainer']", function (Node) {
	$(Node).parent().remove()
});
//nuke detail siblings (proce etc) as well so they dont load
waitForKeyElements("[data-testid='details']", function (Node) {
	$(Node).parent().attr("id", "detailsParent");
	$(Node).siblings().remove()
});




//waitForKeyElements(".vItTTzk8rQvUIXjdVfi4", injectMainGrid); //main new universal regex
//waitForKeyElements(".pfUuJlGKhrwpbHvJvrfA", injectRelatedGrid); //main new universal regex
//waitForKeyElements(".a58rsU9bXPi2pCXFikur", injectBigImage); //main new universal regex


//waitForKeyElements(".vItTTzk8rQvUIXjdVfi4", injectGetterMain); // v2 main grid // OUTDATED
//waitForKeyElements(".pfUuJlGKhrwpbHvJvrfA", injectGetterRelatedGrid); // v2 related grid
waitForKeyElements("[data-testid='hero-picture']", injectGetterBigImage); //v2 big image TODO:actually do something;

waitForKeyElements("[data-testid='galleryMosaicAsset']", injectGetterMain); // v3 main grid // DEC 2024
waitForKeyElements("[data-testid='mosaic-grid-asset']", injectGetterRelatedGrid); // v3 related grid // DEC 2024


function injectGetterMain(jNode) {
	var linkElement = $(jNode).find("a").eq(0);
	var detailsUrl = $(linkElement).attr('href');
	injectorV2(jNode, detailsUrl);
}

function injectGetterRelatedGrid(jNode) {
	var detailsUrl = $(jNode).attr('href');
	injectorV2(jNode, detailsUrl);
}

function injectorV2(jNode, detailsUrl) {

	$(jNode).hover(
		function (e) {
			log("new injector v2");
			var isInjected = $(this).attr('injectedGetter');
			if (isInjected !== undefined && isInjected === "injectedGetter") {
				return;
			}
			log("injecting");

			var getterButton = document.createElement("a");
			$(getterButton).addClass("getterButton");
			getterButton.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`
			$(getterButton).one("mouseenter", function () {
				log("getting...")
				getterButton.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="color: #ffffff;"></i>`
				$.get(detailsUrl, function (html) {
					var pictures = $(html).find("[data-testid='hero-picture']");
					var heroImage = $(pictures).find('source[type$="image/jpeg"]').not('[media]');
					var targetUrl = $(heroImage).attr("srcset");
					log(targetUrl);
					getterButton.setAttribute('href', targetUrl);
					$(getterButton).addClass("loaded");
					getterButton.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`
				});
			})

			getterButton.setAttribute('target', "_blank");
			getterButton.setAttribute('download', '');
			$(getterButton).addClass("hide");

			this.appendChild(getterButton);

			$(this).attr('injectedGetter', "injectedGetter");
			$(this).addClass("injectedGetter");


			log("adding curtain");
			var clickBlocker = document.createElement("a");

			clickBlocker.setAttribute('href', detailsUrl);
			var blockerStyle = `
            width:100%;
            height:100%;
            background:green;
            z-index: 9000;
            position: absolute;
            bottom:0pt;
            opacity:0%;
            `
			//			$(clickBlocker).addClass("hide");
			clickBlocker.style = blockerStyle;
			this.appendChild(clickBlocker);


			// add button protector
			var buttonProtector = document.createElement("div");
			$(buttonProtector).addClass("buttonProtector");
			this.appendChild(buttonProtector);

		});
}

function injectGetterBigImage(jNode) {
	var targetUrl = $(jNode).attr('src');

	var getterButton = document.createElement("a");
	//  $(getterButton).addClass("getterButton");
	//    $(getterButton).addClass("loaded");

	getterButton.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`;

	getterButton.setAttribute('href', targetUrl);
	getterButton.setAttribute('target', "_blank");
	getterButton.setAttribute('download', '');

	$(jNode).append(getterButton);

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

     .getterButton{
        z-index: 1000000;
        position: absolute;
        width: 31pt;
        height: 31pt;
        text-align:center;
        right:5pt;
        margin 1pt;
        top:5pt;
        padding: 8pt;
        border-radius: 10pt;
        border: 1pt solid hsla(0,0%,40%,.7);
        font-size:12pt;
        background-color: rgba(8, 8, 8, 0.6);
     }

     .getterButton.loaded{
        background: rgba(252, 52, 65,1);
        border-color: rgba(252, 52, 65,1);
     }

     .buttonProtector{
        z-index: 100000;
        position: absolute;
        width: 35pt;
        height: 35pt;
        right:3pt;
        top:3pt;
        background-color: rgba(100, 255, 40, 0);
     }

    .newDownloadButton:hover{
       filter: brightness(75%);
    }

    .injected:hover .hide {
      display: block;
      color: red;
    }

    .injectedGetter:hover .hide {
      display: block;
      color: red;
    }

    .mui-1jaljxv-iconButtonDarkBackground{
      visibility:hidden;
    }

    .pCzloUkHud83IJ4WJPY0{
     z-index: 10000000 !important;
    }

    .zzrXKgDp1QibIF96tq9A.iO0EbbdtrpK_wal5Jsgx{
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

    /* hero image side price */
    [data-testid='assetAcquisitionCardContainer']{
    display:none !important;
    }

    /* Ai ads in the main grid, nav button, footer*/
    [data-testid="ai-mods-merch-tile"],
    [data-testid="ai-mods-merch-banner"],
    [data-testid="AIGenerator"]
    {
    display:none !important;
    }

	/* AI hero image buttons removal*/
	[data-testid='ai-remove-background-button'],
	[data-testid='modify-with-ai-button-no-generations']{
	display: none!important;
	}

    /*put hero image deatils at the top*/
    [data-testid="details"]{
     align-items: flex-start !important;
    }

	/* my custom Id for details*/
  	#detailsParent{
     display:block !important;
  	 min-height: 0px;
  	}

	/* image buttons "Similar", "save" etc not to fight with my blocker*/
   /* [data-testid="asset-overlay"]>div:nth-child(2){
        z-index: 100000 !important;
     }
     older solution that breaks in editorial tab where buttons are a third child*/

 /* image buttons "Similar", "save" etc not to fight with my blocker*/
   [data-testid="asset-overlay"]>div:has(button){
        z-index: 100000 !important;
     }

     [data-testid="addToCartButton"]{
     display:none !important;
     }


	 /* modals fightitng with the image buttons*/
     [data-testid="modal-backdrop"]{
        z-index:1000000 !important;
     }


     </style>
    `
);

//OLD
/*
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
            opacity:0%;
            `
			$(clickBlocker).addClass("hide");
			clickBlocker.style = blockerStyle;
			log("returning button: " + hdlink);
			this.appendChild(clickBlocker);
		});
}
*/