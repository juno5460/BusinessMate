define([], function() {

	var server = "";//"http://localhost:3000";

	return {
		Server: function(path) {
			return server + "/" + path;
		}
	};

});