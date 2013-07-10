$(function(){

	var today = new Date();
	var mounth = (today.getMonth() + 1)  < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
	var day = today.getDate()  < 10 ? "0" + today.getDate() : today.getDate();
	var todayFormat = today.getFullYear() + "-" + mounth  + "-" + day;
	console.info(todayFormat);
	$('#beginDate').datepicker({
		autoclose:true,
		todayBtn:true,
	});
	$('#endDate').datepicker({
		autoclose:true,
		todayBtn:true,
	});

	$('#endDate').val(todayFormat);

	var isDropDown = false;

	$("#addContractBtn").click(function(){
		
	});

	$("#keyword").keypress(function(event){
		if(event.keyCode==13) {
			onSearch();
		}
	});

	$('#search_keyword').keypress(function(event){
		if(event.keyCode==13) {
			onCustomSearch();
		}
	});

	$("#searchBtn").click(function(){
		onSearch();
	});

	$("#search_btn").click(function(){
		onCustomSearch();
	});


	$("#drowdown").click(function(){
		if(!isDropDown){
			isDropDown = true;
			$("#custom_search_panel").css("display","block");
		} else {
			isDropDown = false;
			$("#custom_search_panel").css("display","none");
		}
		
	});

	$("#removeBtn").click(function(){
		$("#custom_search_panel").css("display","none");
		isDropDown = false;
	});



	$.get('/api/contracts',function(data, status){
			$('#contractsTbody').html("");
			showList(data);
		});

	$("#thisYear_btn").click(function(){
		var date = new Date();
		var bDate = date.getFullYear() + "-01-01";
		var eDate = date.getFullYear() + "-12-31";
		onCustomSearch({
			beginDate : bDate,
			endDate : eDate
		});
		console.info(bDate + ' ' + eDate);
	});

	$("#lastYear_btn").click(function(){
		var date = new Date();
		var bDate = date.getFullYear() - 1 + "-01-01";
		var eDate = date.getFullYear() - 1 + "-12-31";
		onCustomSearch({
			beginDate : bDate,
			endDate : eDate
		});
		console.info(bDate + ' ' + eDate);
	});

	var onSearch = function(){

		var $keyword = $("#keyword").val();

		var $postJson  			= {};
		$postJson.id 			= true;
		$postJson.name 			= true;
		$postJson.remark 		= true;
		$postJson.keyword   	= $keyword;
		$postJson.beginDate  	= '';
		$postJson.endDate 		= '';

		$.get('/api/contracts/' + JSON.stringify($postJson),function(data, status){
			$('#contractsTbody').html("");
			showList(data);
		});
	}

	var onCustomSearch = function(date){

		var checkId  	= $("#search_check_id").is(':checked');
		var checkName 	= $("#search_check_name").is(':checked');
		var checkPartyA = $("#search_check_partyA").is(':checked');
		var checkPartyB = $("#search_check_partyB").is(':checked');

		var $postJson  			= {};
		$postJson.id 			= checkId;
		$postJson.name 			= checkName;
		$postJson.partyA 		= checkPartyA;
		$postJson.partyB 		= checkPartyB;
		$postJson.keyword   	= $("#search_keyword").val();
		$postJson.beginDate  	= date == null ? $("#beginDate").val() : date.beginDate;
		$postJson.endDate 		= date == null ? $("#endDate").val() : date.endDate;


		$.get('/api/contracts/' + JSON.stringify($postJson), function(data, status) {
			$('#contractsTbody').html("");
			showList(data);
		});
	}


	var showList = function(data) {
		console.info(data);

		if(data == "") {
			$('#tip').html("<div class='alert alert-warning'>未能搜索到相关合同信息</div>");
			$('#table_bug_report').css('display','none');
			return;
		} else {
			$('#tip').html("");
			$('#table_bug_report').css('display','table');
		}

		//判断data是单个元素还是多个元素，不然后面的遍历操作会将单个元素的对象所有属性遍历出来。
		if(!isArray(data)) {
			data = [data];
		}

		$('#contractsTbody').html("");
		$.each(data,function(index,item){
			var trTemplate = "<tr><td class='center hidden-480'>{{myId}}</td><td class='center'>{{name}}</td><td class='center'>{{partyA}}</td><td class='center'>{{partyB}}</td><td class='center'>{{beginDate}}</td><td class='center'>{{endDate}}</td><td class='center hidden-480'>{{signDate}}</td><td class='center'>{{amount}}</td><td class='center'>{{state}}</td></tr>";
			console.info(index,item);
			var $trHtlm = $(Mustache.to_html(trTemplate, item));
			$trHtlm.click(function(){
				console.info(item._id);
				window.location.href = "/contracts/" + item._id + "/edit";
			});
			$('#contractsTbody').append($trHtlm);
		});
	}

	var isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
});
