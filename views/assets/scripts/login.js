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

	$('#loadForm').validate({
					// errorElement: 'span',
					// errorClass: 'help-inline warn-tip',
					focusInvalid: false,
					rules:{
						loadUsername: {
							required:true,
							minlength: 5,
							maxlength: 20
						},
						loadPassword: {
							required:true
						}
					},
					highlight: function (e) {
						// $(e).closest('.control-group').removeClass('success').addClass('error');
					},
			
					success: function (e) {
						// $(e).closest('.control-group').removeClass('error').addClass('success');
						// $(e).remove();
					},
			
					errorPlacement: function (error, element) {
						// if(element.is(':checkbox') || element.is(':radio')) {
						// 	var controls = element.closest('.controls');
						// 	if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
						// 	else error.insertAfter(element.nextAll('.lbl').eq(0));
						// } 
						// else if(element.is('.chzn-select')) {
						// 	console.info(element);
						// 	error.insertAfter(element.nextAll('[class*="chzn-container"]').eq(0));
						// }
						// else {error.insertAfter(element.parent());}
					},

					messages: {
						loadUsername: {
							required: "用户名不能为空.",
							minlength: "用户名长度小于5."
						},
						loadPassword: {
							required: "登录密码不能为空.",
						}
				},
		});
	
	$('#retrieveForm').validate({
				
					focusInvalid: false,
					rules:{
					
					},
					highlight: function (e) {
					
					},
			
					success: function (e) {
				
					},
			
					errorPlacement: function (error, element) {
					
					},

					messages: {
					
				},
		});

			$('#registerForm').validate({
					// errorElement: 'span',
					// errorClass: 'help-inline warn-tip',
					focusInvalid: false,
					rules:{
						registerEmail: {
							required:true
						},
						registerUsername: {
							required:true,
							minlength: 5,
							maxlength: 20
						},
						registerPassword: {
							required:true
						},
						registerPasswordChecked: {
							required:true
						}
					},
					highlight: function (e) {
					
					},
			
					success: function (e) {
						
					},
			
					errorPlacement: function (error, element) {
						
					},

					messages: {
						registerEmail: {
							required: "注册邮箱不能为空.",
						},
						registerUsername: {
							required: "用户名不能为空.",
							minlength: "用户名长度小于5."
						},
						registerPassword: {
							required: "密码不能为空.",
						},
						registerPasswordChecked: {
							required: "确认密码不能为空.",
						}
				},
		});
