$(function(){

	$("#addContractBtn").click(function(){
		
	});

	$.get('http://10.108.1.65:3000/api/contracts',function(data, status){
		console.info(data);
		$.each(data,function(index,item){
			var trTemplate = "<tr><td class='center'>{{myId}}</td><td class='center'>{{name}}</td><td class='center'>{{partyA}}</td><td class='center'>{{partyB}}</td><td class='center'>{{beginDate}}</td><td class='center'>{{endDate}}</td><td class='center'>{{signDate}}</td><td class='center'>{{amount}}</td><td class='center'>{{state}}</td></tr>";

			var $trHtlm = $(Mustache.to_html(trTemplate, item));
			$trHtlm.click(function(){
				console.info(item._id);
				window.location.href = "/editContract?id=" + item._id;
			});
			$('#contractsTbody').append($trHtlm);


		});
	});
});
