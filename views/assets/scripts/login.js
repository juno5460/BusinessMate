function show_box(id) {
 $('.widget-box.visible').removeClass('visible');
 $('#'+id).addClass('visible');
}

function register() {
	var email = $("#registerEmail");
	var username = $("#registerUsername");
	var password = $("#registerPassword");
	var passwordChecked = $("#registerPasswordChecked");


	$.ajax({
					url: '/tasks' + '/' + contract.next.id,
					type: 'PUT',
					data: postData,
					error: function(){
						console.info('error');
					},
					success: function(result){
						console.info('success');
					}
			});
		});
}