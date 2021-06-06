window.addEventListener('load', function(event) { 
	// REWRITE NAV TO BE CLOSEST megamenu
	let nav = document.querySelector('.mega-menu');
	let minWidth = parseInt(nav.getAttribute('data-responsive-width'));
	
	// toggle button for the responsive menu
	let responsive = nav.querySelector('button.responsive-toggle');
	responsive.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
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
			if(nav.getAttribute('data-hover-open') == 'true') {
				nav.setAttribute('data-focus-open', 'true');
				nav.setAttribute('data-hover-open', 'false');
				evt.target.focus();
				return;
			}

			// close any sub menus opened previously only if in desktop mode
			if(document.body.offsetWidth > minWidth && opened_menu != null && evt.target != opened_menu) {
				// close other opened_menu
				opened_menu.setAttribute('aria-expanded', 'false');
			}
			
			// open menu
			if(evt.target.getAttribute('aria-expanded') == 'false') {
				evt.target.setAttribute('aria-expanded', 'true');
				nav.setAttribute('data-focus-open', 'true');
			}
			// close menu
			else {
				evt.target.setAttribute('aria-expanded', 'false');
				// in the case of responsive mode, multiple may be open so don't always set data-focus-open to false
				if(nav.querySelector('.mega-menu .mega-menu-toggle[aria-expanded="true"]') === null)
					nav.setAttribute('data-focus-open', 'false');
			}
		});
		
		// hover
		e.addEventListener('mouseenter', function(evt) {
			if(document.body.offsetWidth <= minWidth)
				return;
			if(nav.getAttribute('data-focus-open') == 'true')
				return;
			nav.setAttribute('data-hover-open', 'true');
			let trigger = evt.target;
			trigger.setAttribute('aria-expanded', 'true');
		});
		e.addEventListener('mouseleave', function(evt) {
			if(document.body.offsetWidth <= minWidth)
				return;
			// if a focus in the menu has happened, take precedent
			if(nav.getAttribute('data-focus-open') == 'true')
				return;
			// if relatedTarget is an open mega-sub-menu, don't close
			if(evt.relatedTarget.classList.contains('mega-sub-menu'))
				return;
			nav.setAttribute('data-hover-open', 'false');

			evt.target.setAttribute('aria-expanded', 'false');
		});
	}
		
	let submenus = document.querySelectorAll('button.mega-menu-toggle + div.mega-sub-menu');
	for(e of submenus) {
		// click events for the top-level menu buttons for dropdowns
		e.addEventListener('mouseleave', function(evt) {
			if(document.body.offsetWidth <= minWidth)
				return;
			if(nav.getAttribute('data-focus-open') == 'true')
				return;
			nav.setAttribute('data-hover-open', 'false');
			let open_toggle_button = document.querySelector('nav.mega-menu button[aria-expanded="true"]');
			if(open_toggle_button)
				open_toggle_button.setAttribute('aria-expanded','false');
		});
	}
	
	let menuLinks = document.querySelectorAll('button.mega-menu-toggle + div.mega-sub-menu a');
	for(e of menuLinks) {
		e.addEventListener('focus', function(evt) {
			// if already having focus in the nav menu, not an issue
			if(nav.getAttribute('data-focus-open') == 'true')
				return;
			// set to non-hover and make focus
			nav.setAttribute('data-focus-open', 'true');
			nav.setAttribute('data-hover-open', 'false');
		});
	}
	
	document.addEventListener('keydown', function(event){
		if(event.key === 'Escape') {
			let menu = document.querySelector('.mega-menu');

			if(document.body.offsetWidth <= minWidth) {
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
				menu.setAttribute('data-focus-open', 'false');
			}
			else {
				// desktop mode
				// hovering open
				if(menu.getAttribute('data-hover-open') == 'true') {
					let b = menu.querySelector('button[aria-expanded="true"]');
					b.setAttribute('aria-expanded','false');
					menu.setAttribute('data-hover-open', 'false');
				}
				// focused open
				else if(menu.getAttribute('data-focus-open') == 'true') {
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
					menu.setAttribute('data-focus-open', 'false');
				}
			}
		}
	});
});


