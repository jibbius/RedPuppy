/* Fix issue where this file gets loaded twice */
if (typeof iCPLoaded === 'undefined') {
    var iCPLoaded = true;


    chrome.storage.sync.get(
    	{
            preferredSort: false,
    		prismDisabled: false,
    		customCssEnabled: false,
    		customCssContent: ''
    	},
    	function(items) {
            var list = $("#list-directory");
    		if( items.preferredSort
                && items.preferredSort != "false"
                // This nested (exists?) check, is to ensure we don't log console errors related to undefined.
                && list
                && list.data( "options" )
                && list.data( "options" ).Url // TODO: May be a better way to do this?
            ){
    			if(
    				// A directory page, that matches our current URL
    				window.location.pathname === list.data( "options" ).Url
    				// There is no sort currently in place
    				&& !window.location.search
    			){
    				// Redirect to the desired sort parameter
    				self.location=(window.location.pathname).concat("?sort=").concat(items.preferredSort);
    			}
    		}

    		if(!items.prismDisabled){

			    /*
				I tend to use inline styles as a fallback (i.e. for users without the iConnect+ chrome extension)
				e.g. <pre class="code" style="[hack]">
					
				Given the user has the iConnect+ plugin installed, we can strip out any inline styles:
			    */
				jQuery("pre.code").removeAttr('style');

				/*
				Because of the way we are loading Prism, the default event listener will not be triggered (i.e.
				we've missed DOMContentLoaded).
				
				For this reason, we need to call the function explicity:
				*/
				Prism.highlightAll();

    		}

    		if(items.customCssEnabled){

				var css = items.customCssContent,
				    head = document.head || document.getElementsByTagName('head')[0],
				    style = document.createElement('style');

				style.type = 'text/css';
				if (style.styleSheet){
				  style.styleSheet.cssText = css;
				} else {
				  style.appendChild(document.createTextNode(css));
				}

				head.appendChild(style);

    		}



  		}
  	);

}
