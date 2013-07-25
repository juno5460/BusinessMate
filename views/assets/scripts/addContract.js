$(function() {

	$('#signPicker').datepicker({
		todayBtn:true,
		autoclose:true,
	});
	$('#signPicker').datepicker().on('changeDate', function(env) {
		$('#signPicker').datepicker('hide');
		$('#signPicker').blur()
	});
	$('#beginPicker').datepicker({
		todayBtn:true,
		autoclose:true,
	});
	$('#beginPicker').datepicker().on('changeDate', function(env) {
		$('#beginPicker').blur()
	});
	$('#endPicker').datepicker({
		todayBtn:true,
		autoclose:true,
	});
	$('#endPicker').datepicker().on('changeDate', function(env) {
		$('#endPicker').blur()
	});

	var uploadFilesInfo = new Array();
	//上传控件代码
	$('#file_upload').uploadifive({
				'uploadScript' 	: '/files/upload',
				'buttonClass' 	: 'btn btn-small',
				'buttonText' 	: '添加附件',
				'auto' 			: true,
				'fileSizeLimit'	: (1024 * 5),
				'onUploadComplete' : function(file,data) {
					data = JSON.parse(data);
					uploadFilesInfo.push(data);
					console.info(data);
        		},
        		'onCancel' : function(file){
        			console.info("remove",file.name);
        			for(var i = 0;i < uploadFilesInfo.length;i++){
						if (file.name == uploadFilesInfo[i].name) {
							uploadFilesInfo.splice(i, i + 1);
						}
        			}
        		}
			});




	isTemplateMode = false;

	//初始化弹出框样式
	$._messengerDefaults = {
		extraClasses: 'messenger-fixed messenger-theme-block messenger-on-bottom'
	};

	// //事件数组
	// var $eventsArray = [];

	var customEventTmp 	= "<li id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}'></span></div><div class='widget-toolbar event-date'><span class='celltitle'>执行时间：</span><span><input id='date{{dateID}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd' value='{{date}}' readonly='true'></span><i id='delete' class='icon-remove  bigger-120 icon-only'></i></div></div><div class='widget-body'><div id='newBody' class='widget-main'><textarea id='remark' class='span12 cellremark' placeholder='请输入备注信息'>{{remark}}</textarea><input type='hidden' id='completed' value={{completed}}></div></div></li>";
	var priceEventTmp	= "<li id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}'></span></div><div class='widget-toolbar event-date'><span class='celltitle'>发票日期：</span><span><input class='hiddenInput2' id='invoiceDate{{dateID}}' data-date-format='yyyy-mm-dd' value='{{invoiceDate}}' readonly='true'></span><span class='celltitle'>完成时间：</span><span><input id='date{{dateID}}'  class='hiddenInput2' data-date-format='yyyy-mm-dd' value='{{date}}' readonly='true'></span><span class='celltitle'>回款金额：</span><span><input id='price' class='hiddenInput2'  value='{{price}}'></span><i id='delete' class='icon-remove  bigger-120 icon-only'></i></div></div><div class='widget-body'><div id='newBody' class='widget-main'><textarea id='remark' class='span12 cellremark' placeholder='请输入备注信息'>{{remark}}</textarea><input type='hidden' id='completed' value={{completed}}></div></div></li>";

	//添加自定义事件
	$("#customEventBtn").click(function() {
		addCustomEvent(null,'add');
		scrollToBottom();
	});
	// 添加回款事件
	$("#priceEventBtn").click(function() {
		addPriceEvent(null,'add');
		scrollToBottom();
	});


	var templateTmp = "<li><a hre='#' title='{{templateName}}'>{{templateName}}</a><i id='deleteTemp' class='icon-remove'></i></li>";

	$("#templateBtn").click(function() {
		$.get("/api/templates", function(data, status) {
			if (status == 'success') {

				var $templates = $(data);
				$("#templateList").html('');

				$templates.each(function(index, item) {

					var $cellHtml = $(Mustache.to_html(templateTmp, {
						templateName: item.tName
					}));

					$cellHtml.find("#deleteTemp").click(function(){
						$.ajax({
							type:'DELETE',
							url:'/api/templates/' + item._id,
							success: function(result){
								$cellHtml.slideUp();
							}
						});
					});

					$cellHtml.click(function() {

						loadTempalteAndRenderToHtml(item._id);

					});

					$("#templateList").append($cellHtml);
				});

				if ($('#templateList').text() == "") {
					var tmp = "<li><a hre='#' title='{{templateName}}'>{{templateName}}</a></li>";
					$('#templateList').append($(Mustache.to_html(tmp, {
						templateName: '当前无可用模板'
					})));
				}
			}
		});
	});

	var loadTempalteAndRenderToHtml = function(id) {
		$.get("/api/templates/" + id, function(data, status) {
			if (status == "success") {

				$("#myId").val(data.myId);
				$("#name").val(data.name);
				$("#partyA").val(data.partyA);
				$("#partyAabbr").val(data.partyAabbr);
				$("#partyADept").val(data.partyADept);
				$("#partyB").val(data.partyB);
				$("#partyBabbr").val(data.partyBabbr);
				$("#partyBDept").val(data.partyBDept);
				$("#signPicker").val(data.signDate);
				$("#beginPicker").val(data.beginDate);
				$("#endPicker").val(data.endDate);
				$("#amount").val(data.amount);
				$("#state").val(data.state);

				var $events = $(data.events);
				if ($events.length != null) {

					$("#eventsList").html("");

					$events.each(function(index, item) {
						console.info(item);
						if (item.price == -1) {
							addCustomEvent(item,'template');
						} else {
							addPriceEvent(item,'template');
						}
					});
				}

			} else {
				alert("获取模板失败！");
			}
		});
	}

//点击保存模板按钮时
	$("#saveAsTemplateBtn").click(function(){

		//模板保存时的弹出框
		bootbox.prompt("请填写模板名", function(result) {
			
			if(result === null)
				return;

			//
			$.get("/api/templates", function(data, status) {
				if (status == 'success') {

					var $templates = $(data);
					var isExist = false;
					$templates.each(function(index, item) {
						if (item.tName == result) {
							showAlert("当前模板命名已存在，请重新命名!","error",3);
							isExist = true;
							return false;
						}
					});

					if (!isExist) {

						isTemplateMode 	= true;//标记当前创建model为模板模式
						var item 		= buildModel();

						if(item)
							isTemplateMode 	= false;

						item.tName 		= result;
						item.amount 	= '';						
						delete item._id;

						$.ajax({
							url: '/api/templates',
							type: 'POST',
							data: item,
							success: function(result) {
								showAlert("模板保存成功","success",2);
							},
							error: function(result) {
								showAlert("模板保存失败","error",2);
							}
						});
					}
				}
			});
			//
		});
	

	});

	//保存按钮点击时
	$("#saveBtn").click(function(){
		// 对表单做出校验，校验通过则上传数据
		if($('#validateForm').valid()) {
			var item = buildModel();
			console.info(item);

			$.ajax({
				url: '/api/contracts',
				type: 'POST',
				data: item,
				success: function(result) {
					console.info(result);
					showAlert("合同添加成功","success",2,
						doActionAfterSecond(function() {
						window.location.href = "/contracts";
					}, 1));
				},
				error: function(result) {
					showAlert("合同添加失败","error",2);
				}
			});
		} else {
			showAlert("合同数据有误，请确认后重新保存。","error",4);
			scrollToTop();
		}

	});

	//获取页面上的数据，并构建一个合同模型
	var buildModel = function() {
		//从网页中提取已经输入的数据
		var $myId 		= $("#myId").val();
		var $name 		= isTemplateMode ? '' : $("#name").val();
		var $partyA 		= $("#partyA").val();
		var $partyAabbr		= $("#partyAabbr").val();
		var $partyADept		= $("#partyADept").val();
		var $partyB 		= $("#partyB").val();
		var $partyBabbr		= $("#partyBabbr").val();
		var $partyBDept		= $("#partyBDept").val();
		var $signDate 	= $("#signPicker").val();
		var $beginDate 	= $("#beginPicker").val();
		var $endDate 	= $("#endPicker").val();
		var $amount 	= isTemplateMode ? '' : $("#amount").val();
		var $state 		= $("#state").val();

		var model 		= {};
		model.myId 		= $myId;
		model.name 		= $name;
		model.partyA 	= $partyA;
		model.partyAabbr = $partyAabbr;
		model.partyADept = $partyADept;
		model.partyB 	 = $partyB;
		model.partyBabbr = $partyBabbr;
		model.partyBDept = $partyBDept;
		model.signDate 	= $signDate;
		model.beginDate = $beginDate;
		model.endDate 	= $endDate;
		model.amount 	= $amount;
		model.state 	= $state;

		model.file 	= uploadFilesInfo;

		model.events 	= buildEventsModel();

		return model;
	}

	var buildEventsModel = function() {

		var $eventsArray 	= [];
		var $cellList 		= $("#eventsList").find(".widget-box");

		$cellList.each(function(index, element) {
			var $event  	= [];
			$cell 			= $(element);
			$event.id   	= generateID();
			$event.type 	= $cell .find("#price").val() == null ? 1 : 2; //判断事件类型
			$event.title 	= $cell .find("#title").val();
			$event.date 	= $cell .find("input[id^='date']").val();
			var tPrice 		=  0;
			if(isTemplateMode){
				if ($event.type == 1)
					tPrice = -1;
				else 
					tPrice = '';
			}
			$event.price 	= isTemplateMode ? tPrice : $cell .find("#price").val() == null ? -1 : $(element).find("#price").val();
			$event.remark 	= $cell .find("#remark").val();
			var $invoiceDate = $cell.find("input[id^='invoiceDate']").val();
			
			$event = {
				'id' 		: $event.id,
				'type' 		: $event.type,
				'title' 	: $event.title,
				'date' 		: $event.date,
				'price' 	: $event.price,
				'remark' 	: $event.remark,
				'completed' : false,
			};

			if ($event.type == 1) {

			} else {
				$event.invoiceDate = isTemplateMode ? '' : $invoiceDate;
				$event.date = isTemplateMode ? '' : $invoiceDate;
				$event.priceDate = isTemplateMode ? '' : $cell.find("input[id^='date']").val();
				$event.invoiceDone = false;
			};

			$eventsArray.push($event);
		});

		return $eventsArray;
	}

	var addCustomEvent = function(data,type) {

		data = data == null ? [] : data;

		//消除事件列表空白的警告
		$("#blankWarn").slideUp();

		var datePickerID = generateID();

		var $cellHtml = $(Mustache.to_html(customEventTmp, {
			id 		: generateID() ,
			title 	: data.title,
			date 	: data.date,
			price 	: data.price,
			remark 	: data.remark,
			dateID 	: datePickerID
		}));

		$cellHtml.find("#delete").click(function() {
			//$cellHtml.animate({opacity: '0'});
			$cellHtml.slideUp();
			 doActionAfterSecond(function(){
			 	$cellHtml.remove();
			 	var $cellList = $("#eventsList").find(".widget-box");
				if ($cellList.length == 0)
					$("#blankWarn").slideDown();
			 },0.4);
		});


		$cellHtml.hide();
		$('#eventsList').append($cellHtml);
		$cellHtml.slideDown();
		
		$('#date' + datePickerID).datepicker({
			autoclose:true,
		});
	}

	var addPriceEvent = function(data,type) {

		data = data == null ? [] : data;

		//消除事件列表空白的警告
		$("#blankWarn").slideUp();


		var datePickerID = generateID();

		var $cellHtml = $(Mustache.to_html(priceEventTmp, {
			id 		: generateID(),
			title 	: data.title,
			date 	: data.priceDate,
			invoiceDate : data.invoiceDate,
			invoiceDone : false,
			price 	: data.price,
			remark 	: data.remark,
			dateID 	: datePickerID
		}));

		$cellHtml.find("#delete").click(function() {

			$cellHtml.slideUp();

			doActionAfterSecond(function(){
				$cellHtml.remove();
				var $cellList = $("#eventsList").find(".widget-box");
				if ($cellList.length == 0)
					$("#blankWarn").slideDown();
			},.4);

		});
		$cellHtml.hide();
		$('#eventsList').append($cellHtml);
		$cellHtml.slideDown();
		$('#date' + datePickerID).datepicker({
			autoclose:true,
		});
		$('#invoiceDate' + datePickerID).datepicker({
			autoclose:true,
		});
	}

	var scrollToBottom = function() {
		$('html, body, .container').animate({
			scrollTop: $(document).height()
		}, 600);
	}

	var scrollToTop = function() {
		$('html, body, .container').animate({
			scrollTop: 0
		}, 600);
	}

	var generateID = function() {

		//生成唯一ID号
		return new UUID().toString();
	}

	var doActionAfterSecond = function(func,delay){
		var t = setTimeout(function(){
			 	func();
			 	clearTimeout(t);	
			 },delay * 1000);
	}

	 //弹出底部提示框
	var showAlert = function(message,type,delay,callback){
		$.globalMessenger().post({
			message: message,
			hideAfter: delay,
			type: type,
		});

		if(callback) {
			callback();
		}
	}


	// //校验测试代码
	// $('#saveBtn').click(function(){
	// 	console.info($('#validateForm').valid());
	// });
	
	$('#validateForm').validate({
					errorElement: 'span',
					errorClass: 'help-inline warn-tip',
					focusInvalid: false,
					rules:{
						myId: {
							required:true,
							minlength: 5,
							maxlength: 20,
						},
						name: {
							required:true,
						},
						partyA: {
							required:true,
						},
						partyB: {
							required:true,
						},
						signPicker: {
							required:true,
							date:true,
						},
						beginPicker: {
							required:true,
							date:true,
						},
						endPicker: {
							required:true,
							date:true,
						},
						amount: {
							required:true,
							digits:true,
						},
						state: {
							required:true,
						}
					},
					highlight: function (e) {
						$(e).closest('.control-group').removeClass('success').addClass('error');
					},
			
					success: function (e) {
						$(e).closest('.control-group').removeClass('error').addClass('success');
						$(e).remove();
					},
			
					errorPlacement: function (error, element) {
						if(element.is(':checkbox') || element.is(':radio')) {
							var controls = element.closest('.controls');
							if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
							else error.insertAfter(element.nextAll('.lbl').eq(0));
						} 
						else if(element.is('.chzn-select')) {
							console.info(element);
							error.insertAfter(element.nextAll('[class*="chzn-container"]').eq(0));
						}
						else {error.insertAfter(element);}
					},

					messages: {
						myId: {
							required: "合同编号不能为空.",
							minlength: "合同编号长度小于5."
						},
						name: {
							required: "合同名称不能为空.",
						},
						partyA: {
							required: "甲方信息不能为空.",
						},
						partyB: {
							required: "乙方信息不能为空.",
						},
						signPicker: {
							required: "请选定具体日期.",
							date: "请选定具体日期."
						},
						beginPicker: {
							required: "请选定具体日期.",
							date: "请选定具体日期."
						},
						endPicker: {
							required: "请选定具体日期.",
							date: "请输入合同编号."
						},
						state: {
							required: "合同状态不能为空.",
						},
						amount: {
							required: "请输入合同总金额.",
							digits: "请输入正确的金额数."
						},
				},
		});


	///

});