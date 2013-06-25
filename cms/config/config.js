define([], function() {

	var server = "http://10.108.1.65:3000";//"http://localhost:3000";

	return {
		Server: function(path) {
			return server + "/" + path;
		}
	};

});