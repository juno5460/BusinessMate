define([], function() {

	var server = "10.108.1.67:3000";

	return {
		Server: function(path){
			return "http://" + server + "/" + path;
		}
	}
});