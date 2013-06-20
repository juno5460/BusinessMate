<<<<<<< HEAD
define([], function() {

	var server = "localhost:3000";

	return {
		Server: function(path){
			return "http://" + server + "/" + path;
		}
	}
=======
define([], function() {

	var server = "10.108.1.67:3000";

	return {
		Server: function(path){
			return "http://" + server + "/" + path;
		}
	}
>>>>>>> d08139fb3bf03e503d143658aa425674d283a4c4
});