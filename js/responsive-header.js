window.addEventListener('load', function(event) { 
	let e;
	
	// toggle button for audience menu
	e = document.querySelector('#audience_nav button.nav-toggle-button');
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
	e = document.querySelector('#user_nav button.nav-toggle-button');
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
	
	
});