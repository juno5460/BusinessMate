var show_box = function show_box(id) {
	$('.widget-box.visible').removeClass('visible');
	$('#' + id).addClass('visible');
};

$(function() {
	$("#loadBtn").click(function() {
		var postData = {
			userName: $("#loadUsername").val(),
			password: $("#loadPassword").val(),
			provider: 'local'
		};
		console.info(postData);
		$.ajax({
			url: 'http://10.108.1.67:3000/users/session',
			type: 'post',
			data: postData,
			error: function(error) {
				console.info(error);
			},
			success: function(success) {
				console.info(success);
			}
		});

	});

	$("#registerBtn").click(function() {
		var email = $("#registerEmail").val();
		var userName = $("#registerUsername").val();
		var password = $("#registerPassword").val();
		var passwordChecked = $("#registerPasswordChecked").val();

		var postData = {
			email: email,
			userName: userName,
			password: password,
			provider: 'local'
		};

		console.info(postData);

		$.ajax({
			url: 'http://10.108.1.67:3000/users',
			type: 'post',
			data: postData,
			error: function() {
				console.info('error');
			},
			success: function(result) {
				console.info('success');
			}
		});
	});

});