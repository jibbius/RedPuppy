/* Fix issue where this file gets loaded twice */
if (typeof iCP_Theme_Loaded === 'undefined') {
    var iCP_Theme_Loaded = true;

    chrome.storage.sync.get(
        {
          iCP_Theme: false,
          customCssEnabled: false,
          customCssContent: ''
        },
        function(items) {
            if(items.iCP_Theme == 'timberTheme'){
              // Timber Theme
                var cssId = 'timberTheme';  // you could encode the css path itself to generate id..
                if (!document.getElementById(cssId))
                {
                    var head  = document.getElementsByTagName('head')[0];
                    var link  = document.createElement('link');
                    link.id   = cssId;
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = chrome.extension.getURL('themes/timber/timber.css');
                    link.media = 'all';
                    head.appendChild(link);
                }

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
