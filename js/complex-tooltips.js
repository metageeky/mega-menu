function showTooltip(elem) {
	// reset position of tooltip to above link
	elem.style.bottom = 'calc(100% + 0.75rem)';
	elem.style.top = 'auto';
	

	if(elem.getBoundingClientRect().y < 4) {
		elem.style.bottom = 'auto';
		elem.style.top = 'calc(100% + 0.75rem)';
	}
	elem.style.visibility = 'visible';
	elem.style.opacity = '1';
}

function hideTooltip(elem) {
	elem.style.visibility = 'hidden';
	elem.style.opacity = '0';
}

function resetTooltipZIndex() {
	var tips = document.querySelectorAll('[has-complex-tooltip] + div.complex-tooltip'); 
	for(e of tips) {
		e.style.zIndex = 'auto';
	}
}

window.addEventListener('load', function(evt) { 
	var links = document.querySelectorAll('[has-complex-tooltip]'); 
	
	for(e of links) {
		e.addEventListener('focusin', function(evt) {
			var tooltip = evt.target.nextElementSibling;
			resetTooltipZIndex();
			tooltip.style.zIndex = '5';
			if(tooltip.classList.contains('complex-tooltip'))
				showTooltip(tooltip);
		});
 
		e.addEventListener('focusout', function(evt) {
			var tooltip = evt.target.nextElementSibling;			
			if(tooltip.classList.contains('complex-tooltip'))
				hideTooltip(tooltip);
		});
		e.addEventListener('mouseenter', function(evt) {
			var tooltip = evt.target.nextElementSibling;
			resetTooltipZIndex();
			tooltip.style.zIndex = '5';			
			if(tooltip.classList.contains('complex-tooltip'))
				showTooltip(tooltip);
		});
 		e.addEventListener('mouseleave', function(evt) {
			var tooltip = evt.target.nextElementSibling;
			if(document.activeElement != evt.target && tooltip.classList.contains('complex-tooltip'))
				hideTooltip(tooltip);
		});
	/*
	        var helptext = $(this).closest('li').find('.helpinfotext:first');
        $(helptext).css( { 'z-index': '15' } );
        showTooltip(helptext[0]);
    $('.resource-list li .helpinfo').on('mouseout', function() {
        var helptext = $(this).closest('li').find('.helpinfotext:first');
        $(helptext).css( { 'z-index': '10' } );
        if(document.activeElement == this) {
            return;
        }
        hideTooltip(helptext[0]);
    });
	*/
	}
});