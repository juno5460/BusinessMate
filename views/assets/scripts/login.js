var show_box = function show_box(id) {
	$('.widget-box.visible').removeClass('visible');
	$('#' + id).addClass('visible');
};


$('#loginForm').validate({
	errorElement: 'div',
	errorClass: 'errClass',
	focusInvalid: false,
	rules: {
		username: {
			required: true,
			minlength: 5,
			maxlength: 20,
		},
		password: {
			required: true,
		}
	},
	highlight: function(e) {
		console.info($(e).closest('.errClass'));
		$(e).closest('.errClass').removeClass('success').addClass('error');
	},

	success: function(e) {
		$(e).closest('.errClass').removeClass('error').addClass('success');
		$(e).remove();
	},

	errorPlacement: function(error, element) {
		error.appendTo(element.parent());
	},

	messages: {
		username: {
			required: "用户名不能为空.",
			minlength: "用户名长度小于3.",
		},
		password: {
			required: "密码不能为空.",
		}
	}
});

$("#registerForm").validate({
	rules: {
		email : {
			required: true,
		},
		username : {
			required: true,
			minlength: 3,
			remote: { 
				url: "/username", //url地址 
				type: "post", //发送方式 
				dataType: "json", //数据格式 
				data: { //要传递的数据 
						username: function() { 
						return $("#username").val(); 
					}
				}
			} 
		},
		password: {
			required: true,
			minlength: 5
		},
		password2: {
			required: true,
			minlength: 5,
			// equalTo: "#password"
		}
	},

	errorPlacement: function(error, element) {
		error.appendTo(element.parent());
	},

	messages: {
		email: "邮箱不能为空",
		username: {
			required: "用户名不能为空",
			minlength: "用户名长度小于3",
			remote: "用户已存在"
		},
		password: {
			required: "密码不能为空",
			minlength: "密码长度小于5"
		},
		password2: {
			required: "没有确认密码",
			minlength: "确认密码不能小于5个字符"
			// equalTo: "两次输入密码不一致"
		}
	}

});