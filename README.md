# Google Maps AMD Loader
Module to load Google Maps JavaScript API as asynchronous module definition (AMD).

## Usage with Require.js

```javascript
define([
	"GoogleMapsLoader"
], function(GoogleMapsLoader) {

	GoogleMapsLoader.key = "my_api_key";
	GoogleMapsLoader.version = "3.2";
	
	GoogleMapsLoader
		.load()
		.done(function(GoogleMaps) {
			const map = new GoogleMaps.Map();
		})

});
```
