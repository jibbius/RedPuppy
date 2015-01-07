// Saves options to chrome.storage
function save_options() {
  var prismDisabled = document.getElementById('prism-disabled').checked;
  var preferredSort = document.getElementById('preferred-sort').value;
  var customCssEnabled = document.getElementById('custom-css-enabled').checked;
  var customCssContent = document.getElementById('custom-css-content').value;
  chrome.storage.sync.set({
    prismDisabled: prismDisabled,
    preferredSort: preferredSort,
    customCssEnabled: customCssEnabled,
    customCssContent: customCssContent
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value prismDisabled = false.
  chrome.storage.sync.get({
    prismDisabled: false,
    preferredSort: false,
    customCssEnabled: false,
    customCssContent: [
    '/* use smaller employee spotlight image */',
    '.spotlight img {',
    '  max-height: 50px;',
    '}',
    '',
    '/* remove spacing below end of footer */',
    'body > br {',
    '  display: none;',
    '}'
   ].join('\n')

  }, function(items) {
    document.getElementById('prism-disabled').checked = items.prismDisabled;
    document.getElementById('preferred-sort').value = items.preferredSort;
    document.getElementById('custom-css-enabled').checked = items.customCssEnabled;
    document.getElementById('custom-css-content').value = items.customCssContent;

    // Determine (on load), whether to hide/show
    jQuery('.custom-css-conditional')[ items.customCssEnabled ? "show" : "hide"]();

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);


// Determine (on click), whether to hide/show
jQuery('#custom-css-enabled').click(function() {
  jQuery('.custom-css-conditional')[this.checked ? "show" : "hide"]();
});


// Tooltips and pop-overs
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});
$('[data-toggle="popover"]').popover({
    trigger: 'hover',
        'placement': 'top'
});