$(function(){

	$('#beginDate').datepicker();
	$('#beginDate').datepicker().on('changeDate', function(env) {
		$('#beginDate').datepicker('hide');
	});
	$('#endDate').datepicker();
	$('#endDate').datepicker().on('changeDate', function(env) {
		$('#endDate').datepicker('hide');
	});

	var isDropDown = false;

	$("#addContractBtn").click(function(){
		
	});

	$("#keyword").keypress(function(event){
		if(event.keyCode==13) {
			onSearch();
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
			$("#customSearchPanel").css("display","block");
		} else {
			isDropDown = false;
			$("#customSearchPanel").css("display","none");
		}
		
	});

	$("#removeBtn").click(function(){
		$("#customSearchPanel").css("display","none");
		isDropDown = false;
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

	var onCustomSearch = function(){

		var checkId  	= $("#search_check_id").is(':checked');
		var checkName 	= $("#search_check_name").is(':checked');
		var checkRemark = $("#search_check_remark").is(':checked');

		var $postJson  			= {};
		$postJson.id 			= checkId;
		$postJson.name 			= checkName;
		$postJson.remark 		= checkRemark;
		$postJson.keyword   	= $("#search_keyword").val();
		$postJson.beginDate  	= $("#beginDate").val();
		$postJson.endDate 		= $("#endDate").val();

		console.info(JSON.stringify($postJson));

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
