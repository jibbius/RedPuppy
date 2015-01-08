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
            if(
                // Check if a sort preference specified
                items.preferredSort
                && items.preferredSort != "false"
                // and there is no sort already in place
                && location.search
            ){
                // Use jQuery to determine if required page elements are present
                var listDataOptions = $("#list-directory[data-options]");
                if(
                    // A directory page,
                    listDataOptions.length
                    // where the directory has an indicative Url
                    && listDataOptions.data( "options" ).Url
                    // that matches our current URL
                    && location.pathname === listDataOptions.data( "options" ).Url
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
