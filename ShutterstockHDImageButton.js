// ==UserScript==
// @name         Shutterstock Useful Download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.shutterstock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shutterstock.com
// @grant        GM_addStyle
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
console.log("start");

waitForKeyElements(".mui-b5j3lh-item-sstkGridItem-item", injector);
waitForKeyElements(".mui-1p72qfc-item-sstkGridItem", injector);

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

function injectMainGrid(jNode) {}

function injectMainImage(jNode) {

}

function injectSmallGrid(jNode) {

}

function injector(jNode) {
	console.log("waited for :3");
	$(jNode).hover(
		function (e) {
			console.log("hover");
			var isInjected = $(this).attr('injected');
			console.log("injected = " + isInjected);
			if (isInjected !== undefined && isInjected === "injected") {
				console.log("gotout");
				return;
			}
			console.log("injecting");
			$(this).attr('injected', "injected");
			$(this).addClass("injected");
			var targetUrl = $(this).children('.mui-t7xql4-a-inherit-link').attr('href');
			if (targetUrl === undefined) {
				return;
			}
			//var targetUrl = "uuuurl";
			//            targetUrl = "https://www.shutterstock.com/shutterstock/photos/1326079727/display_1500/stock-photo-ancient-stonework-in-the-night-1326079727.jpg"
			// we get - https://www.shutterstock.com/image-photo/ancient-stonework-night-1326079727
			var imageName = targetUrl.substring(targetUrl.lastIndexOf('/') + 1);
			var imageID = imageName.split('-').slice(-1)[0];
			var hdlink = document.createElement("a");
			$(hdlink).addClass("hide");
			var hdlinkUrl = "https://www.shutterstock.com/shutterstock/photos/" + imageID + "/display_1500/" + imageName + ".jpg";
			//         hdlink.innerHTML = "id="+imageID+" name="+imageName;
			hdlink.innerHTML = `<i class="fa-regular fa-file-image fa-xl" style="color: #ffffff;"></i>`;
			//         hdlink.innerHTML =`<i class="fa-solid fa-file-arrow-down fa-xl" style="color: #ffffff;"></i>`;
			hdlink.setAttribute('href', hdlinkUrl);
			hdlink.setAttribute('target', "_blank");
			hdlink.setAttribute('download', '');
			hdlink.style = ` z-index: 1000000;
                          position: absolute;
                          bottom:5pt;
                          right:5pt;

                          padding: 8pt;
                          border-radius: 10pt;
                          font-size:12pt;
                          //background: rgba(0,0,0,0.4);
                          background: rgba(252, 52, 65,1);
                          `;

			this.appendChild(hdlink);
		});
}


function injectIntoMain() {
	//".mui-1t9dezy-root-blurredImageBackground-backgroundWithActions"
	$(".mui-1t9dezy-root-blurredImageBackground-backgroundWithActions").append(`
    <div id="gmSomeID">
        <p>wot</p>
        etc.
    </div>
`);
}



(function () {
	'use strict';

	$("body").append(`
    <div id="gmSomeID">
        <p>wot</p>
        etc.
    </div>
`);

})();