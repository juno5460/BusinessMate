var show_box = function show_box(id) {
	$('.widget-box.visible').removeClass('visible');
	$('#' + id).addClass('visible');
};

$(function() {
	// $("#loadBtn").click(function() {
	// 	var postData = {
	// 		userName: $("#loadUsername").val(),
	// 		password: $("#loadPassword").val(),
	// 		provider: 'local'
	// 	};
	// 	console.info(postData);
	// 	// $.post({
	// 	// 	url: '/users/session',
	// 	// 	type: 'post',
	// 	// 	data: {userName:2,password:2,provider:'local'},
	// 	// 	error: function(error) {
	// 	// 		console.info(error);
	// 	// 	},
	// 	// 	success: function(success) {
	// 	// 		console.info(success);
	// 	// 	}
	// 	// });



	// });

$.post('/users/session',{username:2,password:2,provider:'local'},function(data,status){
		console.info(status);
		// if (data.redirectTo && data.msg == 'Just go there please') {
  //               window.location = data.redirectTo;
  //           }
  		console.info(data);
	});

// $.post('/users',{email:'2@2.com',userName:'2',password:'2',provider:'local'},function(data,status){
// 		console.info(status);
// 	});

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
			url: '/users',
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