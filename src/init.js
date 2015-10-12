/* Fix issue where this file gets loaded twice */
if (typeof iCPLoaded === 'undefined') {
    var iCPLoaded = true;

    chrome.storage.sync.get(
        {
          preferredSort: false,
          iCP_Theme: false
        },
        function(items) {

            if(
                // Check if a sort preference specified
                items.preferredSort
                && items.preferredSort != "false"
                // and there is no sort already in place
                && !location.search
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
                    self.location=(location.pathname).concat("?sort=").concat(items.preferredSort);
                }
            }

            if(items.iCP_Theme == 'darkLeatherTheme'){
                /*
                  Is this a dark theme?
                  If so, load the dark toolbar.
                */
                jQuery(".app-toolbar > div.light").removeClass("light").addClass("dark");
            }
           
        }
    );

}
