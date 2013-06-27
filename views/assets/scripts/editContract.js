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

	var customEventTmp 	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}''></span></div><div class='widget-toolbar event-date'><span class='celltitle'>执行时间：</span><span><input id='date{{dateID}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd' value='{{date}}'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remark' class='span12 cellremark' placeholder='请输入备注信息' value='{{remark}}'></textarea></div></div></div>";
	var priceEventTmp	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder='' value='{{title}}'></span></div><div class='widget-toolbar event-date'><span class='celltitle'>回款金额：</span><span><input id='price' class='hiddenInput' id='price' value='{{price}}'></span><span class='celltitle'>执行时间：</span><span><input id='date{{dateID}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd' value='{{date}}'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remak' class='span12 cellremark' placeholder='请输入备注信息' value='{{remark}}'></textarea></div></div></div>";

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

					var $cellHtlm = $(Mustache.to_html(templateTmp, {templateName:item.tName}));

					$cellHtlm.click(function(){

						loadTempalteAndRenderToHtml(item._id);

					});

					$("#templateList").append($cellHtlm);
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
		var item = buildModel();
		item.tName = item.name;
		delete item._id;
		$.ajax({
			url: '/api/templates',
			type: 'POST',
			data: item,
			success: function(result) {
				console.info(result);
			},
			error: function(result){
				alert("保存合同模板失败！");
			}
		});
	});

	//保存按钮点击时
	$("#saveBtn").click(function(){
		var item = buildModel();
		console.info(item);

		$.ajax({
			url: '/api/contracts/' + getItemID(),
			type: 'PUT',
			data: item,
			success: function(result) {
				window.location.href = "/contracts";
				console.info(result);
			},
			error: function(result){
				alert("新建合同失败");
			}
		});
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
				alert("删除合同失败");
			}
		});
	});

	var addCustomEvent = function(data){

		data = data == null ? [] : data;

		//消除事件列表空白的警告
		$("#blankWarn").remove();

		var datePickerID = generateID();

		var $cellHtlm = $(Mustache.to_html(customEventTmp, {
			id:data.id,
			title:data.title,
			date:data.date,
			price:data.price,
			remark:data.remark,
			dateID:datePickerID}));

		$cellHtlm.find("#delete").click(function(){
			$cellHtlm.animate({opacity: '0'});

			 var t = setTimeout(function(){
			 	$cellHtlm.remove();
			 	clearTimeout(t);	
			 },400);
		});
		$('#eventsList').append($cellHtlm);
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

		var $cellHtlm = $(Mustache.to_html(priceEventTmp, 
			{id:data.id,
			title:data.title,
			date:data.date,
			price:data.price,
			remark:data.remark,
			dateID:datePickerID}));

		$cellHtlm.find("#delete").click(function(){
			$cellHtlm.animate({opacity: '0'});

			 var t = setTimeout(function(){
			 	$cellHtlm.remove();
			 	clearTimeout(t);	
			 },400);
			
	});
		$('#eventsList').append($cellHtlm);
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

	var scrollToBottom = function(){
			$('html, body, .container').animate({scrollTop: $(document).height()}, 600); 
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

});

