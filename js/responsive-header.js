window.addEventListener('load', function(event) { 
	let e;
	let megamenu = document.querySelector('.mega-menu');
	let responsiveWidth = parseInt(megamenu.getAttribute('data-responsive-width'));

	// make the search skip link put focus in the search and that search is visible
	e = document.getElementById('search_skip_link');
	e.addEventListener('click', function(evt) {
		evt.preventDefault();
		// check the search hours toggle
		let s_h_toggle = document.getElementById('search_hours_toggle');
		if(s_h_toggle.getAttribute('aria-expanded') == 'false')
			s_h_toggle.click();
		// check the responsive search toggle
		let r_s_toggle = document.getElementById('responsive_search_toggle');
		if(r_s_toggle.getAttribute('aria-expanded') == 'false')
			r_s_toggle.click();
		
		window.location = "#bento_search";
		document.getElementById('bento_search').focus();
	});
	
	// make the chat skip link put focus in the search
	e = document.getElementById('chat_skip_link');
	e.addEventListener('click', function(evt) {
		evt.preventDefault();
		window.location = "#chat_trigger";
		document.getElementById('chat_trigger').focus();
	});
	
	// hamburger-toggle for responsive view
	let hamburger = document.querySelector('#main_nav_hamburger');
	hamburger.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
		}
	});
	
	// toggle for search box in responsive mode 
	e = document.querySelector('#search_box h2 + button');
	e.addEventListener('click', function(evt) {
		// open search box
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
		}
		// close search box
		else {
			evt.target.setAttribute('aria-expanded', 'false');
		}
		document.getElementById('search_box').classList.toggle('collapsed');
	});
	
	// toggle button for audience menu
	e = document.querySelector('#audience_nav button.nav-toggle');
	e.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
			// close other toggle menus
			let open_menus = document.querySelectorAll('#top_nav button.nav-toggle[aria-expanded="true"]');
			for(f of open_menus) {
				if(f != evt.target)
					f.setAttribute('aria-expanded', 'false');
			}
			megamenu.setAttribute('data-menu-state', 'closed');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
		}
	});
	
	// toggle button for user/usage menu
	e = document.querySelector('#user_nav button.nav-toggle');
	e.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			console.log('open user menu');
			evt.target.setAttribute('aria-expanded', 'true');
			// close other toggle menus
			let open_menus = document.querySelectorAll('#top_nav button.nav-toggle[aria-expanded="true"]');
			for(f of open_menus) {
				if(f != evt.target)
					f.setAttribute('aria-expanded', 'false');
			}
			megamenu.setAttribute('data-menu-state', 'closed');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
		}
	});
	
	e = document.querySelector('#search_hours_toggle');
	e.addEventListener('click', function(evt) {
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
			document.querySelector('#search_hours_container').classList.toggle('collapsed');
		}
		else {
			evt.target.setAttribute('aria-expanded', 'false');
			document.querySelector('#search_hours_container').classList.toggle('collapsed');
		}
	});
	
	// events for the top-level menu buttons for dropdowns
	let mega_menu_toggles = megamenu.querySelectorAll('button.nav-toggle');
	for(e of mega_menu_toggles) {
		
		// click events for the top-level menu buttons for dropdowns
		e.addEventListener('click', function(evt) {
			let opened_menu = megamenu.querySelector('.mega-menu button.nav-toggle[aria-expanded="true"]');
			// in the case of hover open, a click just switches the state to focus open
			// only happens in non-responsive mode
			if(megamenu.getAttribute('data-menu-state') == 'hover') {
				megamenu.setAttribute('data-menu-state', 'focus');
				hamburger.setAttribute('aria-expanded', 'true');
				evt.target.focus();
				return;
			}

			// close any sub menus opened previously
			if(opened_menu != null && evt.target != opened_menu) {
				// close other opened_menu
				opened_menu.setAttribute('aria-expanded', 'false');
			}
			
			// open menu
			if(evt.target.getAttribute('aria-expanded') == 'false') {
				evt.target.setAttribute('aria-expanded', 'true');
				megamenu.setAttribute('data-menu-state', 'focus');
				/* make sure the audience and user navs are closed */
				document.querySelector('#audience_nav .nav-toggle').setAttribute('aria-expanded', 'false');
				document.querySelector('#user_nav .nav-toggle').setAttribute('aria-expanded', 'false');
				hamburger.setAttribute('aria-expanded', 'true');
			}
			// close menu
			else {
				evt.target.setAttribute('aria-expanded', 'false');
				megamenu.setAttribute('data-menu-state', 'closed');
				if(document.body.offsetWidth > responsiveWidth)
					hamburger.setAttribute('aria-expanded','false');
			}
		});
		
		// hover over the mega menu dropdown buttons
		hoverintent(e, 
			function(evt) {
				if(document.body.offsetWidth <= responsiveWidth)
					return;
				// ignore hover effects if menu has been opened by focus
				if(megamenu.getAttribute('data-menu-state') == 'focus')
					return;
				megamenu.setAttribute('data-menu-state', 'hover');
				evt.target.setAttribute('aria-expanded', 'true');
			},
			function(evt) {
				if(document.body.offsetWidth <= responsiveWidth)
					return;
				// if a focus in the menu has happened, take precedent
				if(megamenu.getAttribute('data-menu-state') == 'focus')
					return;
				// if relatedTarget is an open mega-sub-menu, don't close
				if(evt.relatedTarget != null && evt.relatedTarget.classList.contains('mega-sub-menu'))
					return;
		
				
				megamenu.setAttribute('data-menu-state', 'closed');
				evt.target.setAttribute('aria-expanded', 'false');
		}).options({timeout: 200, interval: 50, });
	}
	
	// blur used to detect if focus has moved out of the mega menu
	let focusables = megamenu.querySelectorAll('.mega-sub-menu a, button.nav-toggle');
	for(e of focusables) {
		e.addEventListener('blur', function(evt) {
			if(megamenu.getAttribute('data-menu-state') != 'focus')
				return;
			// detect window change and don't close things
			if(document.activeElement === this)
				return;

			// if click on non-clickable, close the menu
			if(evt.relatedTarget == null) {
				megamenu.setAttribute('data-menu-state', 'closed');
				megamenu.querySelector('.nav-toggle[aria-expanded="true"]').setAttribute('aria-expanded', 'false');
				hamburger.setAttribute('aria-expanded', 'false');
			}
			// focus moved to another focusable element not in the mega menu	
			else if(evt.relatedTarget != null && evt.relatedTarget.closest('.mega-menu') == null) {
				megamenu.setAttribute('data-menu-state', 'closed');
				megamenu.querySelector('.nav-toggle[aria-expanded="true"]').setAttribute('aria-expanded', 'false');
				hamburger.setAttribute('aria-expanded', 'false');
			}
		});
	}
	
	// handle clicks on the sub-menu when hover or focus
	let subs = megamenu.querySelectorAll('div.mega-sub-menu');
	for(e of subs) {
		e.addEventListener('focus', function(evt) {
			// if in hover state and click on the opened menu, switch to focus with focus on toggle
			if(megamenu.getAttribute('data-menu-state') == 'hover') {
				megamenu.setAttribute('data-menu-state', 'focus');
				evt.target.previousElementSibling.focus();
			}
			// move the focus back to whatever what lost focus when the sub-menu was clicked
			else if(megamenu.getAttribute('data-menu-state') == 'focus' && evt.relatedTarget != null) {
				evt.relatedTarget.focus();
			}
		});
	}
	
	// blur events off of a sub-menu opened via hover
	let submenus = megamenu.querySelectorAll('div.mega-sub-menu');
	for(e of submenus) {
		// handle hovering moving from opened sub-menu to the toggle button that controls it
		e.addEventListener('mouseleave', function(evt) {
			if(document.body.offsetWidth <= responsiveWidth)
				return;
			if(megamenu.getAttribute('data-menu-state') == 'focus')
				return;
			// target is the div.sub-menu, related target is the toggle button before it
			if(evt.relatedTarget != null && evt.relatedTarget == evt.target.previousElementSibling)
				return;
			
			megamenu.setAttribute('data-menu-state', 'closed');
			let open_toggle_button = document.querySelector('.mega-menu button[aria-expanded="true"]');
			if(open_toggle_button)
				open_toggle_button.setAttribute('aria-expanded','false');
		});
	}
	
	// link gets a focus when sub-menu opened by hover
	let menuLinks = megamenu.querySelectorAll('div.mega-sub-menu a');
	for(e of menuLinks) {
		e.addEventListener('focus', function(evt) {
			// if already having focus in the mega menu, not an issue
			if(megamenu.getAttribute('data-menu-state') == 'focus')
				return;
			// set focus state
			megamenu.setAttribute('data-menu-state', 'focus');
			hamburger.setAttribute('aria-expanded', 'true');
		});
	}
	
	// escape closes opened window
	document.addEventListener('keydown', function(event){
		if(event.key === 'Escape') {
			let menu = document.querySelector('.mega-menu');
			hamburger.setAttribute('aria-expanded', 'false');

			if(document.body.offsetWidth <= responsiveWidth) {
				// responsive mode
				// if there is a focused element, reset focus to hamburger toggle
				if(	document.activeElement != null && 
					document.activeElement != document.body && 
					document.activeElement.closest('.mega-menu') !== null
				) {
					hamburger.focus();
				}
				
				// set all things to close
				for(b of menu.querySelectorAll('button[aria-expanded="true"]')) 
					b.setAttribute('aria-expanded','false');
			}
			else {
				// desktop mode
				// hovering open
				if(menu.getAttribute('data-menu-state') == 'hover') {
					let b = menu.querySelector('button[aria-expanded="true"]');
					b.setAttribute('aria-expanded','false');
					menu.setAttribute('data-hover-open', 'false');
				}
				// focused open
				else if(menu.getAttribute('data-menu-state') == 'focus') {
					let b = menu.querySelector('button[aria-expanded="true"]');
					// move keyboard focus if it is internal to the mega menu and a link
					if(	document.activeElement != null && 
						document.activeElement != document.body && 
						document.activeElement.nodeName == 'A' && 
						menu.contains(document.activeElement)
					) {
						b.focus();
					}
					
					b.setAttribute('aria-expanded','false');
				}
				menu.setAttribute('data-menu-state', 'closed');
			}
		}
	});
	
});



/*	Below is the hoverintent.js code from https://github.com/tristen/hoverintent
	Shared under the MIT License
	Copyright (c) Tristen Brown

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

!function(e,t){if("function"==typeof define&&define.amd)define("hoverintent",["module"],t);else if("undefined"!=typeof exports)t(module);else{var n={exports:{}};t(n),e.hoverintent=n.exports}}(this,function(e){"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};e.exports=function(e,n,o){function i(e,t){return y&&(y=clearTimeout(y)),b=0,p?void 0:o.call(e,t)}function r(e){m=e.clientX,d=e.clientY}function u(e,t){if(y&&(y=clearTimeout(y)),Math.abs(h-m)+Math.abs(E-d)<x.sensitivity)return b=1,p?void 0:n.call(e,t);h=m,E=d,y=setTimeout(function(){u(e,t)},x.interval)}function s(t){return L=!0,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1!==b&&(h=t.clientX,E=t.clientY,e.addEventListener("mousemove",r,!1),y=setTimeout(function(){u(e,t)},x.interval)),this}function c(t){return L=!1,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1===b&&(y=setTimeout(function(){i(e,t)},x.timeout)),this}function v(t){L||(p=!0,n.call(e,t))}function a(t){!L&&p&&(p=!1,o.call(e,t))}function f(){e.addEventListener("focus",v,!1),e.addEventListener("blur",a,!1)}function l(){e.removeEventListener("focus",v,!1),e.removeEventListener("blur",a,!1)}var m,d,h,E,L=!1,p=!1,T={},b=0,y=0,x={sensitivity:7,interval:100,timeout:0,handleFocus:!1};return T.options=function(e){var n=e.handleFocus!==x.handleFocus;return x=t({},x,e),n&&(x.handleFocus?f():l()),T},T.remove=function(){e&&(e.removeEventListener("mouseover",s,!1),e.removeEventListener("mouseout",c,!1),l())},e&&(e.addEventListener("mouseover",s,!1),e.addEventListener("mouseout",c,!1)),T}});