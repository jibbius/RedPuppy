iConnect Plus ( Codename "RedPuppy" )
======================================
A chrome extension for DST Bluedoor employees, for use on the DST intranet.
This is an independent initiative.

The plugin enhances the base offering of the portal, with the following additional features:

- Syntax highlighting for posted code snippets
- Ability to edit posts as plaintext (HTML), rather that via the WYSIWYG
- Ability to specify a different "sort preference" when viewing content (i.e. forum posts... etc).
  - If "No preference" then iConnect usually sorts content alphabetically
  - This prefence can be overriden to "By most recent" via iConnect Plus
- Ability to specify custom CSS, to be injected on page load
- Ability to select a "theme", and have a completely different UI experience


## Screenshot

![iConnect Plus Screenshot][screenshot]

## Webstore Link

The plugin is available from the Chrome Webstore, [here](https://chrome.google.com/webstore/detail/iconnectplus-bluedoor/gaipmclnjcnaepijeohadnbpmejeiiii).


## Building from source - Prerequisites

If attempting to build from source, you will require:

- Git
- NodeJS + NPM
- (Optional) MS Powershell

## Troubleshooting

- If behind a corporate firewall you may need to configure git to use https (instead of git://), which is done via the following command;
    git config --global url."https://".insteadOf git://


## Build steps

- npm install
- bower install


## Distribution steps

These steps assume you have been added as an Admin to the Chrome Webstore project.

- Ensure that the version number in `src/manifest.json` has been incremented
- Ensure `CHANGELOG.MD` is updated to itemise the updates/changes
- Run `PrepForWebstore.bat`, or if Powershell is unavailable (required for zip command) then zip the `src` folder to be uploaded to the Chrome Webstore.
- Login to the Chrome Webstore
- Follow the prompts to upload the new `dist.zip` and copy the content from `CHANGELOG.MD` when publishing
- Tag the build applicable **release vers id** within git, such that the release version can later be determined.


## Contributing

Contributions are most welcome.
Either submit an issue or pull request, or reach out and chat to me.


[screenshot]: webstore-assets/screenshot_800x610_border.png  "Options page"