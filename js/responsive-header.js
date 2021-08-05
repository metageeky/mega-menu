window.addEventListener('load', function(event) { 
	let e;
	let megamenu = document.querySelector('.mega-menu');
	let responsiveWidth = parseInt(megamenu.getAttribute('data-responsive-width'));
	
	// toggle button for audience menu
	e = document.querySelector('#audience_nav button.nav-toggle');
	e.addEventListener('click', function(evt) {
		// open menu
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
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
			evt.target.setAttribute('aria-expanded', 'true');
		}
		// close menu
		else {
			evt.target.setAttribute('aria-expanded', 'false');
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
				// responsive.setAttribute('aria-expanded', 'true');
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
				// responsive.setAttribute('aria-expanded', 'true');
			}
			// close menu
			else {
				evt.target.setAttribute('aria-expanded', 'false');
				megamenu.setAttribute('data-menu-state', 'closed');
				//if(document.body.offsetWidth > responsiveWidth)
					// responsive.setAttribute('aria-expanded','false');
			}
		});
	}
	
	
});