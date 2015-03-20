/* Fix issue where this file gets loaded twice */
if (typeof iCP_Theme_Loaded === 'undefined') {
    var iCP_Theme_Loaded = true;

    chrome.storage.sync.get(
        {
          iCP_Theme: false,
          htmlEditor: false,
          customCssEnabled: false,
          customCssContent: ''
        },
        function(items) {
            if(items.iCP_Theme){
                var cssId = items.iCP_Theme, cssHref=false;
                switch(cssId){
                  case 'timberTheme':
                    cssHref = 'themes/timber/timber.css';
                    break;
                  case 'darkLeatherTheme':
                    cssHref = 'themes/darkLeather/darkLeather.css';
                    break;
                  default:
                    cssHref=false;
                }


                if (cssHref && !document.getElementById(cssId))
                {
                    var head  = document.getElementsByTagName('head')[0];
                    var link  = document.createElement('link');
                    link.id   = cssId;
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = chrome.extension.getURL(cssHref);
                    link.media = 'all';
                    head.appendChild(link);
                }

            }

            if(items.htmlEditor){
                /* if this ever stops working, consider: CKEDITOR.tools.callFunction(83) */
                var css = [
                            '/* Always display Source button */',
                            '.edit-content #cke_48, .content1 #cke_34{',
                            '  display: inline-block !important;',
                            '}'
                           ].join('\n'),
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
