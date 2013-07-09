var show_box = function show_box(id) {
	$('.widget-box.visible').removeClass('visible');
	$('#' + id).addClass('visible');
};

$(function() {
	$('#loginForm').validate({
					errorElement: 'span',
					errorClass: 'block input-icon input-icon-right',
					focusInvalid: false,
					rules:{
						username: {
							required:true,
							minlength: 5,
							maxlength: 20,
						},
						password: {
							required:true,
						}
					},
					highlight: function (e) {
						$(e).closest('.loginGroup').removeClass('success').addClass('error');
					},
			
					success: function (e) {
						$(e).closest('.loginGroup').removeClass('error').addClass('success');
						$(e).remove();
					},
			
					errorPlacement: function (error, element) {
						 if(element.is('#loadUsername') || element.is('#loadPassword')) {
							console.info(element);
							// element.append(error);
							error.insertAfter(element.next('[id="loadUsername"]'));
						}
						else {error.insertAfter(element.parent());}
					},

					messages: {
						username: {
							required: "合同编号不能为空.",
							minlength: "合同编号长度小于5."
						},
						password: {
							required: "合同名称不能为空.",
						}
				},
		});


});