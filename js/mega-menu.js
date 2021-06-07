window.addEventListener('load', function(event) { 
	// REWRITE NAV TO BE CLOSEST megamenu
	let nav = document.querySelector('.mega-menu');
	let responsiveWidth = parseInt(nav.getAttribute('data-responsive-width'));
	
	// toggle button for the responsive menu
	let responsive = nav.querySelector('button.responsive-toggle');
	responsive.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
			evt.target.setAttribute('data-menu-state', 'focus');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
			evt.target.setAttribute('data-menu-state', 'closed');
		}
	});
	
	// events for the top-level menu buttons for dropdowns
	let triggers = nav.querySelectorAll('button.mega-menu-toggle');
	for(e of triggers) {
		// click events for the top-level menu buttons for dropdowns
		e.addEventListener('click', function(evt) {
			let opened_menu = nav.querySelector('.mega-menu .mega-menu-toggle[aria-expanded="true"]');
			// in the case of hover open, a click just switches the state to focus open
			// only happens in non-responsive mode
			if(nav.getAttribute('data-menu-state') == 'hover') {
				nav.setAttribute('data-menu-state', 'focus');
				evt.target.focus();
				return;
			}

			// close any sub menus opened previously only if in desktop mode
			if(document.body.offsetWidth > responsiveWidth && opened_menu != null && evt.target != opened_menu) {
				// close other opened_menu
				opened_menu.setAttribute('aria-expanded', 'false');
			}
			
			// open menu
			if(evt.target.getAttribute('aria-expanded') == 'false') {
				evt.target.setAttribute('aria-expanded', 'true');
				nav.setAttribute('data-menu-state', 'focus');
			}
			// close menu
			else {
				evt.target.setAttribute('aria-expanded', 'false');
				// in the case of responsive mode, multiple may be open so don't always set data-focus-open to false
				if(nav.querySelector('.mega-menu .mega-menu-toggle[aria-expanded="true"]') === null)
					nav.setAttribute('data-menu-state', 'closed');
			}
		});
		
		// hover
		hoverintent(e, 
			function(evt) {
				if(document.body.offsetWidth <= responsiveWidth)
					return;
				// ignore hover effects if menu has been opened by focus
				if(nav.getAttribute('data-menu-state') == 'focus')
					return;
				nav.setAttribute('data-menu-state', 'hover');
				evt.target.setAttribute('aria-expanded', 'true');
			},
			function(evt) {
				if(document.body.offsetWidth <= responsiveWidth)
					return;
				// if a focus in the menu has happened, take precedent
				if(nav.getAttribute('data-menu-state') == 'focus')
					return;
				// if relatedTarget is an open mega-sub-menu, don't close
				if(evt.relatedTarget.classList.contains('mega-sub-menu'))
					return;
				nav.setAttribute('data-menu-state', 'closed');
				evt.target.setAttribute('aria-expanded', 'false');
		}).options({timeout: 200, interval: 50,});
			
	}
		
	let submenus = document.querySelectorAll('button.mega-menu-toggle + div.mega-sub-menu');
	for(e of submenus) {
		// click events for the top-level menu buttons for dropdowns
		e.addEventListener('mouseleave', function(evt) {
			if(document.body.offsetWidth <= responsiveWidth)
				return;
			if(nav.getAttribute('data-menu-state') == 'focus')
				return;
			if(evt.relatedTarget == evt.target.previousElementSibling)
				return;
			
			nav.setAttribute('data-menu-state', 'closed');
			let open_toggle_button = document.querySelector('nav.mega-menu button[aria-expanded="true"]');
			if(open_toggle_button)
				open_toggle_button.setAttribute('aria-expanded','false');
		});
	}
	
	let menuLinks = document.querySelectorAll('button.mega-menu-toggle + div.mega-sub-menu a');
	for(e of menuLinks) {
		e.addEventListener('focus', function(evt) {
			// if already having focus in the nav menu, not an issue
			if(nav.getAttribute('data-menu-state') == 'focus')
				return;
			// set focus state
			nav.setAttribute('data-menu-state', 'focus');
		});
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === 'Escape') {
			let menu = document.querySelector('.mega-menu');

			if(document.body.offsetWidth <= responsiveWidth) {
				// responsive mode
				// if there is a focused element, reset focus to responsive toggle
				if(	document.activeElement != null && 
					document.activeElement != document.body && 
					document.activeElement.closest('.mega-menu') !== null
				) {
					menu.querySelector('.responsive-toggle').focus();
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

window.addEventListener('resize', function(evt) {
	console.log(window.innerWidth);
	console.log('resize');
});


!function(e,t){if("function"==typeof define&&define.amd)define("hoverintent",["module"],t);else if("undefined"!=typeof exports)t(module);else{var n={exports:{}};t(n),e.hoverintent=n.exports}}(this,function(e){"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};e.exports=function(e,n,o){function i(e,t){return y&&(y=clearTimeout(y)),b=0,p?void 0:o.call(e,t)}function r(e){m=e.clientX,d=e.clientY}function u(e,t){if(y&&(y=clearTimeout(y)),Math.abs(h-m)+Math.abs(E-d)<x.sensitivity)return b=1,p?void 0:n.call(e,t);h=m,E=d,y=setTimeout(function(){u(e,t)},x.interval)}function s(t){return L=!0,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1!==b&&(h=t.clientX,E=t.clientY,e.addEventListener("mousemove",r,!1),y=setTimeout(function(){u(e,t)},x.interval)),this}function c(t){return L=!1,y&&(y=clearTimeout(y)),e.removeEventListener("mousemove",r,!1),1===b&&(y=setTimeout(function(){i(e,t)},x.timeout)),this}function v(t){L||(p=!0,n.call(e,t))}function a(t){!L&&p&&(p=!1,o.call(e,t))}function f(){e.addEventListener("focus",v,!1),e.addEventListener("blur",a,!1)}function l(){e.removeEventListener("focus",v,!1),e.removeEventListener("blur",a,!1)}var m,d,h,E,L=!1,p=!1,T={},b=0,y=0,x={sensitivity:7,interval:100,timeout:0,handleFocus:!1};return T.options=function(e){var n=e.handleFocus!==x.handleFocus;return x=t({},x,e),n&&(x.handleFocus?f():l()),T},T.remove=function(){e&&(e.removeEventListener("mouseover",s,!1),e.removeEventListener("mouseout",c,!1),l())},e&&(e.addEventListener("mouseover",s,!1),e.addEventListener("mouseout",c,!1)),T}});