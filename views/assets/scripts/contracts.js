$(function(){

	$("#addContractBtn").click(function(){
		
	});

	$("#searchBtn").click(function(){

		var $keyword = $("#keyword").val();

		$.get('/api/contracts/' + $keyword,function(data, status){
			$('#contractsTbody').html("");
			showList(data);
		});

	});

	$.get('/api/contracts',function(data, status){
		showList(data);
	});


	var showList = function(data) {
		console.info(data);

		//判断data是单个元素还是多个元素，不然后面的遍历操作会将单个元素的对象所有属性遍历出来。
		if(!isArray(data)) {
			data = [data];
		}

		$('#contractsTbody').html("");
		$.each(data,function(index,item){
			var trTemplate = "<tr><td class='center'>{{myId}}</td><td class='center'>{{name}}</td><td class='center'>{{partyA}}</td><td class='center'>{{partyB}}</td><td class='center'>{{beginDate}}</td><td class='center'>{{endDate}}</td><td class='center'>{{signDate}}</td><td class='center'>{{amount}}</td><td class='center'>{{state}}</td></tr>";
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
