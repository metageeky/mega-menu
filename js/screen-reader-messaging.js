var ScreenReaderMessenger = (function() {
	var singleton;
 
	function createMessenger() {
		let srm = new Object();
		srm.globalTimer = null;
		srm.speakRegion = null;
		
		srm.say = function(msg) {
			// delay the say for 100 milliseconds to allow for other messages to get through
			setTimeout( ()=> {
				srm.actuallySay(msg);
			}, 100);
		};
		
		srm.actuallySay = function(msg) {
			// How many milliseconds until the message is erased from the speaking region
			ERASE_DELAY = 5000;

			if(srm.speakRegion === null) {
				if(document.getElementById('sr_messenger'))
					srm.speakRegion = document.getElementById('sr_messenger');
				else
					srm.speakRegion = createSpeakRegion(msg);
			}
			//reset the global timer
			srm.globalTimer = clearTimeout(srm.globalTimer); 
			//clear the live region's value
			if(srm.speakRegion.innerText .length != 0)
				srm.speakRegion.innerText = '';
			//add message text
			srm.speakRegion.innerText = msg
			//and remove after predefined time.
			srm.globalTimer = setTimeout(()=> {
				srm.speakRegion.innerText = '';
			}, ERASE_DELAY);
		};
		
		return srm;
	}
	
	function createSpeakRegion() {
		let e = document.createElement('DIV');
		// CSS is standard offscreen placement for screen readers only
		// All values are set to !important to reduce the chance of being
		// accidentally overridden. 
		e.style.cssText = 'position: absolute !important; clip: rect(1px, 1px, 1px, 1px) !important; padding: 0 !important; border: 0 !important; height: 1px !important; width: 1px !important; overflow: hidden !important;'
		// make the div a live region
		e.setAttribute('aria-live','polite');
		e.setAttribute('aria-atomic','true');
		// this is admittedly the default but just in case standards change
		e.setAttribute('aria-relevant','additions text');
		e.id = 'sr_messenger';
		e.innerText = '';
		document.body.appendChild(e);
		return e;
	}

	return {
		getMessenger: function() {
			if (!singleton) {
				singleton = createMessenger();
			}
			return singleton;
		}
	};
})();

// initiate the messenger singleton on page load to give time
// for the aria-live region to be registered
window.addEventListener('load', function(event) { 
	// initiate the messenger
	let srm = ScreenReaderMessenger.getMessenger();
});