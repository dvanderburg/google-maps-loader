/**
	Wrapper library for the Google Maps JavaScript API
	Attaches the API to the DOM with a script tag and returns a promise which will be resolved when the Google Maps library is loaded
	
	Any success callbacks attached to the promise will be passed the GoogleMaps library as an argument when executed
	
	Example:
	
		// configure the loader
		GoogleMapsLoader.key = "your_api_key";
		GoogleMapsLoader.version = "3.2";

		// load the google maps library and run a callback when complete
		GoogleMapsLoader
			.load()
			.done(function(GoogleMaps) {
				
				var map = new GoogleMaps.Map();
			
			})
	
*/
(function(root, factory) {
	
	// amd support
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);

	// commonjs support
	} else if (typeof module === "object" && exports) {		
		module.exports = factory(require("jquery"));

	// no module support, attach module to window
	} else {
		root.myModule = factory(root.$);

	}
	
})(this, function($) {
	
	return {
		
		// google api key, should be set when implementing the loader
		key: null,
		
		// the version of google maps library to load, defaults to 3 (was most recent major version at time of writing this loader)
		version: "3",
		
		// boolean indicating if the library has been loaded
		isLoaded: false,
		
		/**
			Loads the Google Maps API
			
			@return	deferred		The deferred object will be resolved when the library has loaded
		*/
		load: function() {

			// deferred object to resolve when the library has been loaded
			var deferred = $.Deferred();
			
			// if the library has already been loaded, immediately resolve the promise
			//	immediately return to not load the library a second time
			if (this.isLoaded) {
				deferred.resolve(google.maps);
				return;
			}
			
			// scope for closures
			var that = this;
			
			// load the google API
			$.getScript("https://www.google.com/jsapi", function() {
				
				// load the maps api
				google.load("maps", that.version, {
					other_params: "libraries=places&key="+that.key,
					callback: function() {
						
						// set that the library has been loaded
						that.isLoaded = true;
						
						// when the maps api is loaded, resolve the promise and pass the google maps object
						deferred.resolve(google.maps);

					}
				});
				
			});
			
			// promise represents when the google maps api is loaded
			return deferred.promise();

		}
		
	};
	
});
