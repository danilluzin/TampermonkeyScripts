// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.shutterstock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shutterstock.com
// @grant        GM_addStyle
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
	'use strict';
	//mui-18xza3-root
	//mui-b5j3lh-item-sstkGridItem-item
	$(".mui-b5j3lh-item-sstkGridItem-item").each(
		function (index) {
			//var targetUrl = $(this).children('.mui-t7xql4-a-inherit-link').attr('href');
			var targetUrl = "uuuurl";
			var button = document.createElement("Button");
			button.innerHTML = "me" + targetUrl;
			button.style = " z-index: 1000000;position: relative";
			this.appendChild(button);
			//var=

			//target url to reconstruct :https://www.shutterstock.com/shutterstock/photos/709438852/display_1500/f.jpg
			/*  this.append ( `
			  <div id="gmSomeID">
			  me: `+index +`
			  </div>
			  ` );
			  */

			/* this.append( `
    <div id="gmSomeID">
        <p>Some paragraph</p>
        etc.
    </div>
`);*/
		}
	);

	$("body").append(`
    <div id="gmSomeID">
        <p>u wot mate</p>
        etc.
    </div>
`);


	$(".mui-b5j3lh-item-sstkGridItem-item").each(function (index) {
		this.append(`
    <div id="gmSomeID">
        <p>wot</p>
        etc.
    </div>
`);
	});

})();



$('.mui-b5j3lh-item-sstkGridItem-item').hover(function (e) {
	console.log("hover");
	$(this).trigger('custom');
});

$(document).on('custom', function (e) {
	console.log('document is handling custom event triggered by ' + e.target.id);
});


console.log("start");

/* Define helper functions */
var processAnchor = function (a) {
	//if (a.hasAttribute('target')) {
	//    a.removeAttribute('target');
	//}
	//    a.setAttribute('target', '_self');
	console.log("modifed");

};

/* Define the observer for watching over inserted elements */
var insertedObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (m) {
		var inserted = [].slice.call(m.addedNodes);
		while (inserted.length > 0) {
			var elem = inserted.shift();
			[].slice.call(elem.children || []).forEach(function (el) {
				inserted.push(el);
			});
			if (elem.nodeName === 'A') {
				processAnchor(elem);
			}
		}
	});
});

/* Define the observer for watching over
 * modified attributes of anchor elements */
var modifiedObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (m) {
		if ((m.type === 'attributes') && (m.target.nodeName === 'A')) {
			processAnchor(m.target);
		}
	});
});

/* Start observing */
insertedObserver.observe(document.documentElement, {
	childList: true,
	subtree: true
});
modifiedObserver.observe(document.documentElement, {
	attributes: true,
	substree: true
});