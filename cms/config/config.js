
define([], function() {

	var server = "192.168.1.145:3000";

	return {
		Server: function(path){
			return "http://" + server + "/" + path;
		}
	}

});