$(function(){



	$('#signPicker').datepicker();
	$('#signPicker').datepicker().on('changeDate',function(env){
	$('#signPicker').datepicker('hide');
	});
	$('#beginPicker').datepicker();
	$('#beginPicker').datepicker().on('changeDate',function(env){
			$('#beginPicker').datepicker('hide');
	});
	$('#endPicker').datepicker();
	$('#endPicker').datepicker().on('changeDate',function(env){
	$('#endPicker').datepicker('hide');
	});

	//初始化弹出框样式
	$._messengerDefaults = {
	extraClasses: 'messenger-fixed messenger-theme-block messenger-on-bottom'
	};


	var initialize = function(){
		var id = $("#contractID").val();
		console.info(id);
		$.get("/api/contracts/" + id,function(data,status){
			console.info(data);
			if(status == 'success') {

				$("#myId").val(data.myId);
				$("#name").val(data.name);
				$("#partyA").val(data.partyA);
				$("#partyB").val(data.partyB);
				$("#signPicker").val(data.signDate);
				$("#beginPicker").val(data.beginDate);
				$("#endPicker").val(data.endDate);
				$("#amount").val(data.amount);
				$("#state").val(data.state);

				var $events = $(data.events);
				$events.each(function(index,item){
					if(item.price == -1){
						addCustomEvent(item);
					} else {
						addPriceEvent(item);
					}
				});

			} else {
				alert("拉取合同信息失败.");
			}
		});
	}

	//从服务器拉取数据并初始化网页数据
	initialize();

	var customEventTmp 	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}''></span></div><div class='widget-toolbar event-date'><span class='celltitle'>执行时间：</span><span><input id='date{{dateID}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd' value='{{date}}' readonly='true'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remark' class='span12 cellremark' placeholder='请输入备注信息' value='{{remark}}'></textarea></div></div></div>";
	var priceEventTmp	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}'></span></div><div class='widget-toolbar event-date'><span class='celltitle'>回款金额：</span><span><input id='price' class='hiddenInput' id='price' value='{{price}}'></span><span class='celltitle'>执行时间：</span><span><input id='date{{dateID}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd' value='{{date}}' readonly='true'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remak' class='span12 cellremark' placeholder='请输入备注信息' value='{{remark}}'></textarea></div></div></div>";

	//添加自定义事件
	$("#customEventBtn").click(function(){
		addCustomEvent();
		scrollToBottom();
	});
	// 添加回款事件
	$("#priceEventBtn").click(function(){
		addPriceEvent();
		scrollToBottom();
	});

	var templateTmp = "<li><a hre='#'>{{templateName}}</a></li>";

	$("#templateBtn").click(function(){
		$.get("/api/templates",function(data,status){
			if(status == 'success') {

				var $templates = $(data);

				$("#templateList").html('');

				$templates.each(function(index,item){

					var $cellHtml = $(Mustache.to_html(templateTmp, {templateName:item.tName}));

					$cellHtml.click(function(){

						loadTempalteAndRenderToHtml(item._id);

					});

					$("#templateList").append($cellHtml);
				});
			}
		});
	});

	var loadTempalteAndRenderToHtml = function(id){
		$.get("/api/templates/" + id,function(data,status){
			if(status == "success") {

				$("#myId").val(data.myId);
				$("#name").val(data.name);
				$("#partyA").val(data.partyA);
				$("#partyB").val(data.partyB);
				$("#signPicker").val(data.signDate);
				$("#beginPicker").val(data.beginDate);
				$("#endPicker").val(data.endDate);
				$("#amount").val(data.amount);
				$("#state").val(data.state);

				var $events = $(data.events);
				if ($events.length != null) {

					$("#eventsList").html("");

					$events.each(function(index, item) {
						if (item.price == -1) {
							addCustomEvent(item);
						} else {
							addPriceEvent(item);
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
						var item = buildModel();
						item.tName = result;
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
		if ($('#validateForm').valid()) {
			var item = buildModel();
			console.info(item);

			$.ajax({
				url: '/api/contracts/' + getItemID(),
				type: 'PUT',
				data: item,
				success: function(result) {
					console.info(result);
					showAlert("合同修改成功","success",2,
						doActionAferSecond(function() {
						window.location.href = "/contracts";
					}, 1));
				},
				error: function(result) {
					showAlert("编辑合同失败","err",2);
				}
			});
		} else {
			showAlert("合同数据有误，请确认后重新保存。","error",4);
			scrollToTop();
		}
	});

	$("#deleteContractBtn").click(function(){
			$.ajax({
			url: '/api/contracts/' + getItemID(),
			type: 'DELETE',
			success: function(result) {
				window.location.href = "/contracts";
				console.info(result);
			},
			error: function(result){
				showAlert("删除合同失败","error",2);
			}
		});

	});

	var addCustomEvent = function(data){

		data = data == null ? [] : data;

		//消除事件列表空白的警告
		$("#blankWarn").remove();

		var datePickerID = generateID();

		var $cellHtml = $(Mustache.to_html(customEventTmp, {
			id:data.id,
			title:data.title,
			date:data.date,
			price:data.price,
			remark:data.remark,
			dateID:datePickerID}));

		$cellHtml.find("#delete").click(function() {
			$cellHtml.animate({
				opacity: '0'
			});
			doActionAfterSecond(function() {
				$cellHtml.remove();
			}, 0.4);
		});

		$('#eventsList').append($cellHtml);
		$('#date' + datePickerID).datepicker();
		$('#date' + datePickerID).datepicker().on('changeDate',function(env){
			$('#date' + datePickerID).datepicker('hide');
		});
	}

	var addPriceEvent = function(data){

		data = data == null ? [] : data;

		//消除事件列表空白的警告
		$("#blankWarn").remove();


		var datePickerID = generateID();

		var $cellHtml = $(Mustache.to_html(priceEventTmp, 
			{id:data.id,
			title:data.title,
			date:data.date,
			price:data.price,
			remark:data.remark,
			dateID:datePickerID}));

		$cellHtml.find("#delete").click(function() {
			$cellHtml.animate({
				opacity: '0'
			});
			doActionAfterSecond(function() {
				$cellHtml.remove();
			}, 0.4);
		});

		$('#eventsList').append($cellHtml);
		$('#date' + datePickerID).datepicker();
		$('#date' + datePickerID).datepicker().on('changeDate',function(env){
			$('#date' + datePickerID).datepicker('hide');
		});
	}

	//获取页面上的数据，并构建一个合同模型
	var buildModel =  function() {
		//从网页中提取已经输入的数据
		var $myId 			= $("#myId").val();
		var $name 			= $("#name").val();
		var $partyA 		= $("#partyA").val();
		var $partyB 		= $("#partyB").val();
		var $signDate 		= $("#signPicker").val();
		var $beginDate 		= $("#beginPicker").val();
		var $endDate 		= $("#endPicker").val();
		var $amount 		= $("#amount").val();
		var $state	 		= $("#state").val();

		var model 		= {};
		model._id 		= getItemID();
		model.myId 		= $myId;
		model.name 		= $name;
		model.partyA 	= $partyA;
		model.partyB 	= $partyB;
		model.signDate 	= $signDate;
		model.beginDate = $beginDate;
		model.endDate 	= $endDate;
		model.amount 	= $amount;
		model.state 	= $state;

		model.events 	= buildEventsModel();

		return model;
	}

	var buildEventsModel = function() {
		var $eventsArray = [];
		var $cellList 	= $("#eventsList").find(".widget-box");
		$cellList.each(function(index,element){
			var $event 		= [];
			$event.id 		=  generateID();
			$event.title 	= $(element).find("#title").val();
			$event.date 	= $(element).find("input[id^='date']").val();
			$event.price 	= $(element).find("#price").val() == null ? -1 : $(element).find("#price").val();
			$event.remark 	= $(element).find("#remark").val();

			$event = {
			'id'	:$event.id,
			'title'	:$event.title,
			'date'	:$event.date,
			'price'	:$event.price,
			'remark':$event.remark,
			'completed':$event.completed
		};
			$eventsArray.push($event);
		});

		return $eventsArray;
	}

	var getItemID = function(){
		return $("#contractID").val();
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
			var date 		= new Date();
			var times1970 	= date.getTime();
			var times 		= date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
			var encrypt 	= times * times1970;
			if (arguments.length == 1) {
				return arguments[0] + encrypt;
			} else {
				return encrypt;
			}
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
	// 	$('#validateForm').valid();
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
						else {error.insertAfter(element.parent());}
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

});

