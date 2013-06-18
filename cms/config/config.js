define([], function() {

	var server = "127.0.0.1:3000";

	return {
		Server: function(path){
			return server + "/" + path;
		}
	}
});