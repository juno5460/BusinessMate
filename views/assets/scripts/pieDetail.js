$(function() {
	var airline = $('#pieID').val();
	console.info(airline);

	function stringToHex(str) {
		var val = "";
		for (var i in str) {
			if (val == "")
				val = str.charCodeAt(i).toString(16);
			else
				val += "," + str.charCodeAt(i).toString(16);
		}
		return val;
	}

	$.get("/api/contracts", function(data, status) {
		console.info(data);
		$.each(data, function(i, contract) {

			//这里找出id的所有合同并添加
			if (stringToHex(contract.partyAabbr) == airline || stringToHex(contract.partyBabbr) == airline) {
				//合同名称过长则进行省略处理
				var contractName = contract.name;
				if (contractName.length > 20) {
					contractName = contractName.substring(0, 20) + "...";
				}

				var tdata = {
					name 		: 	contractName,
					partyA 		: 	contract.partyAabbr,
					partyB 		: 	contract.partyBabbr,
					amount 		: 	contract.amount,
					state 		: 	contract.state
				};
				
				if (stringToHex(contract.partyAabbr) == airline)
					$("#detailValue").html(contract.partyB);
				else 
					$("#detailValue").html(contract.partyA);

				var template = "<tr><td class='center span3' title="+contract.name+">{{name}}</td><td class='center span2'>{{partyA}}</td><td class='center span2'>{{partyB}}</td><td class='center span2'>{{amount}}</td><td class='center span2'>{{state}}</td></tr>";

				var $html = $(Mustache.to_html(template, tdata));
				$html.click(function(){
					window.location.href = "/contracts/" + contract._id + "/edit";
				});
				$('#pieTable').append($html);
				
			} 
		});
	});

});