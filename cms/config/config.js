define([], function() {

	var server = "localhost:3000";

	return {
		Server: function(path) {
			return "http://" + server + "/" + path;
		}
	}

});