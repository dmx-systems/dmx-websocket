# DMX 5 WebSocket

## Version History

**2.0** -- Dec 30, 2020

* BREAKING CHANGES
    * Make use of `dmx-api` 2.0
    * Various `dm5` -> `dmx` renamings
* Chore:
    * Less console logging
    * Adapt URLs to `github.com/dmx-systems`
    * Code run through `eslint`

**1.0.1** -- Aug 5, 2020

* Fix imports

**1.0** -- Aug 4, 2020

* Rename this package `dm5-websocket` -> `dmx-websocket`

**0.5** -- Mar 30, 2020

* Handles "Client ID" cookie

**0.4** -- Jul 22, 2019

* Change license to `AGPL-3.0`

**0.3** -- Jan 29, 2019

* Change license to `GPL-3.0-or-later`

**0.2** -- Jul 31, 2018

* Send idle messages to keep connection open
* Properties of a `DM5WebSocket` instance:
    * `url` - url of the WebSocket server
    * `ws`  - the native WebSocket object
* Change type URI prefixes `dm4` -> `dmx`
* Add GitLab CI/CD

**0.1** -- Jun 14, 2017

------------
Jörg Richter  
Dec 30, 2020
