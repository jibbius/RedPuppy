function main() {
  // Get the notifactions (returned as HTML)
  jQuery.get('http://iconnect.bluedoor.local/ajax/applicationtoolbar/notifications').then(
      function(responseData) {
        
        // Append the HTML to a div within popup.html:
        jQuery('#notifications').append(responseData);

        /*
        We need to replace all links with their fully-qualified equivalents.
        Otherwise <a href='/content/example'> will attempt to resolve to Chrome://iConnectExtension/content/example (resulting in a 404).
        */
        jQuery("a").attr('target','_blank').attr('href',function(){
          return this.href.replace(/.*content/, 'http://iconnect.bluedoor.local/content');
        });
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});