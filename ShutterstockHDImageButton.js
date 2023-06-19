// ==UserScript==
// @name         Shutterstock Useful Download
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/danilluzin/TampermonkeyScripts
// @version      0.1
// @description  Adds an actually usefull download buttin to shutterstock
// @author       Danil Luzin
// @match        https://www.shutterstock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shutterstock.com
// @grant        GM_addStyle
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function log(txt) {
	var verbose = false;
	if (verbose) {
		console.log(txt);
	}
}

log("start");

//Main:
//waitForKeyElements(".mui-138rf2f-mainContainer", injectMainImage); //old wrong but universal
//waitForKeyElements(".mui-1xwj085-mainContainer-editedImageContainer", injectMainImage); //main 1
//waitForKeyElements(".mui-520h9p-mainContainer-editedImageContainer", injectMainImage); //main 2
waitForKeyElements("[class$='-mainContainer-editedImageContainer']", injectMainImage); //main new universal regex

waitForKeyElements(".mui-b5j3lh-item-sstkGridItem-item", injectMainGrid); //maingrid
waitForKeyElements(".mui-1p72qfc-item-sstkGridItem", injectMainGrid); //related/recomended grid
waitForKeyElements(".mui-16bnujj-gridItemContainer", injectSmallGrid); //small grid under main image





$("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`);
$("head").append(
	`<style>
     .hide {
       display: none;
     }

    .injected:hover .hide {
      display: block;
      color: red;
    }
    .mui-1jaljxv-iconButtonDarkBackground{
      visibility:hidden;
    }
     </style>
    `
);

function injectMainGrid(jNode) {
	//    injector(jNode,$(jNode).children('.mui-t7xql4-a-inherit-link').eq(0));
	injector(jNode, "mainGrid");
}

function injectSmallGrid(jNode) {
	// injector(jNode,$(jNode).children('.mui-toql9c-assetWrapper').eq(0).children('.mui-16jifdb-a-inherit-link').eq(0));
	injector(jNode, "smallGrid");
}

function injectMainImage(jNode) {
	log("injecting main")
	//var urlChild = $(jNode).closest('.mui-1t9dezy-root-blurredImageBackground-backgroundWithActions').children('img').eq(0);
	injector(jNode, "mainImage");
	log("done injecting");
}


function injector(jNode, type) {
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

			var urlChild;

			//TEST fix similar images case where "the child is not loaded yet => cant pass it as an object into this callback. have to generate it here"
			switch (type) {
				case "mainGrid":
					urlChild = $(this).children('.mui-t7xql4-a-inherit-link').eq(0)
					break;
				case "smallGrid":
					urlChild = $(this).children('.mui-toql9c-assetWrapper').eq(0).children('.mui-16jifdb-a-inherit-link').eq(0);
					break;
				case "mainImage":
					urlChild = $(this).closest('.mui-1t9dezy-root-blurredImageBackground-backgroundWithActions').children('img').eq(0);
					break;
			}


			var targetUrl = $(urlChild).attr('href');
			log("targetUrl= " + targetUrl + " from:" + $(urlChild).attr('aria-label'));
			if (targetUrl === undefined || targetUrl === false) {
				targetUrl = $(urlChild).attr('src');
			}

			if (targetUrl === undefined) {
				log("gotout 2");
				return;
			}

			var imageName = targetUrl.substring(targetUrl.lastIndexOf('/') + 1);
			imageName = imageName.split('.')[0];
			var imageID = imageName.split('-').slice(-1)[0];
			var hdlink = document.createElement("a");
			var hdlinkUrl = "https://www.shutterstock.com/shutterstock/photos/" + imageID + "/display_1500/" + imageName + ".jpg";
			hdlink.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`;
			hdlink.setAttribute('href', hdlinkUrl);
			hdlink.setAttribute('target', "_blank");
			hdlink.setAttribute('download', '');
			$(hdlink).addClass("hide");

			var style = ` z-index: 1000000;
                          position: absolute;
                          right:5pt;

                          padding: 8pt;
                          border-radius: 10pt;
                          font-size:12pt;
                          //background: rgba(0,0,0,0.4);
                          background: rgba(252, 52, 65,1);
                          `;

			if (type === "mainImage") {
				style += `top:40pt;`
			} else {
				style += `bottom:5pt;`
			}

			hdlink.style = style;

			this.appendChild(hdlink);
			$(this).attr('injected', "injected");
			$(this).addClass("injected");

			log("returning button: " + hdlink)
		});
}


/*
(function() {
    'use strict';

    $("body").append ( `
    <div id="gmSomeID">
        <p>wot</p>
        etc.
    </div>
` );

})();
*/