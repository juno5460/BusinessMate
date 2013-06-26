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

	// //事件数组
	// var $eventsArray = [];

	var customEventTmp 	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder=''></span></div><div class='widget-toolbar event-date'><span class='celltitle'>执行时间：</span><span><input id='date{{id}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remark' class='span12 cellremark' placeholder='请输入备注信息'></textarea></div></div></div>";
	var priceEventTmp	= "<div id='eventCell' class='widget-box'><div class='widget-header widget-header-flat widget-header-small'><div class='event-name'><span class='celltitle'>事件名称：</span><span><input  id='title' class='hiddenInput' placeholder=''></span></div><div class='widget-toolbar event-date'><span class='celltitle'>回款金额：</span><span><input id='price' class='hiddenInput' id='price'></span><span class='celltitle'>执行时间：</span><span><input id='date{{id}}' class='hiddenInput' id='completedTime' data-date-format='yyyy-mm-dd'></span><button class='btn btn-danger btn-mini' id='delete'><i class='icon-remove  bigger-120 icon-only'>&nbsp;删除</i></button></div></div><div class='widget-body'><div class='widget-main'><textarea id='remak' class='span12 cellremark' placeholder='请输入备注信息'></textarea></div></div></div>";

	//添加自定义事件
	$("#customEventBtn").click(function(){

		//消除事件列表空白的警告
		$("#blankWarn").remove();

		var datePickerID = generateID();

		var $cellHtlm = $(Mustache.to_html(customEventTmp, {id:datePickerID}));

		$cellHtlm.find("#delete").click(function(){
			$cellHtlm.remove();
			// $cellID = $cellHtlm.find("#cellID");
			// $eventsArray.each(function(index,element){
			// 	if(element.cellID == $cellID){
			// 		$eventsArray.splice(index,1);
			// 		return false;
			// 	}
			// });
			// console.info($eventsArray);

		});
		$('#eventsList').append($cellHtlm);
		$('#date' + datePickerID).datepicker();
		$('#date' + datePickerID).datepicker().on('changeDate',function(env){
			$('#date' + datePickerID).datepicker('hide');
		});
		scrollToBottom();
	});
	// 添加回款事件
	$("#priceEventBtn").click(function(){

		//消除事件列表空白的警告
		$("#blankWarn").remove();


		var datePickerID = generateID();

		var $cellHtlm = $(Mustache.to_html(priceEventTmp, {id:datePickerID}));

		$cellHtlm.find("#delete").click(function(){

			$cellHtlm.remove();
			// $cellID = $cellHtlm.find("#cellID");
			// $eventsArray.each(function(index,element){
			// 	if(element.cellID == $cellID){
			// 		$eventsArray.splice(index,1);
			// 		return false;
			// 	}
			// });

			// console.info($eventsArray);
	});
		$('#eventsList').append($cellHtlm);
		$('#date' + datePickerID).datepicker();
		$('#date' + datePickerID).datepicker().on('changeDate',function(env){
			$('#date' + datePickerID).datepicker('hide');
		});

		scrollToBottom();
	});


	//保存按钮点击时
	$("#saveBtn").click(function(){
		var item = buildModel();
		console.info(item);
		$.post("http://10.108.1.65:3000/api/contracts", item, function(data,status){
			console.info("Post State:",status);
			console.info(data);
			if(status == 'success'){
				window.location.href = "contracts";
				console.info(data);
			} else {
				alert("新建合同失败");
			}
		});
	});

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
			$event.id 		= generateID();
			$event.type 	= $(element).find("#price").val() == null ? 1 : 2;//判断事件类型
			$event.title 	= $(element).find("#title").val();
			$event.date 	= $(element).find("input[id^='date']").val();
			$event.price 	= $(element).find("#price").val() == null ? -1 : $(element).find("#price").val();
			$event.remark 	= $(element).find("#remark").val();

			$event = {
			'id'	:$event.id,
			'type'	:$event.type,
			'title'	:$event.title,
			'date'	:$event.date,
			'price'	:$event.price,
			'remark':$event.remark,
			'completed':false,
		};
			$eventsArray.push($event);
		});

		return $eventsArray;
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

