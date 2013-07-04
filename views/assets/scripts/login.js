function show_box(id) {
 $('.widget-box.visible').removeClass('visible');
 $('#'+id).addClass('visible');
};


function loadCount() {
	// window.document.href = "http://localhost:3000/desktop";
	var userName = $("#loadUsername").val();
	var password = $("#loadPassword").val();

	$.get("http://10.108.1.67:3000/users", function(data, status) {

		$.each(data, function(i, user) {
	alert("hello");
		});
	});
};

function register() {
	var email = $("#registerEmail").val();
	var userName = $("#registerUsername").val();
	var password = $("#registerPassword").val();
	var passwordChecked = $("#registerPasswordChecked").val();

	var postData = {
				email  			: 	email,
				userName 		: 	userName,
				password 		: 	password
			};

	console.info(postData);

	$.ajax({
					url: 'http://10.108.1.67:3000/users',
					type: 'post',
					data: postData,
					error: function(){
						console.info('error');
					},
					success: function(result){
						console.info('success');
					}
			});
};


