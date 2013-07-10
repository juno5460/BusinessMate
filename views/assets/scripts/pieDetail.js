$(function() {
	var airline = $('#pieID').val();
	console.info(airline);

	function stringToHex(str) {
		var val = "";
		for (var i = 0; i < str.length; i++) {
			if (val == "")
				val = str.charCodeAt(i).toString(16);
			else
				val += "," + str.charCodeAt(i).toString(16);
		}
		return val;
	}

	$.get("/api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
			//这里找出id的所有合同并添加
			if (stringToHex(contract.partyA) == airline) {
				var tdata = {
					name: contract.name,
					partyA: contract.partyA,
					partyB: contract.partyB,
					amount: contract.amount,
					state: contract.state
				};

				$("#detailValue").html(contract.partyA);
				var template = "<tr><td class='center span3'>{{name}}</td><td class='center span2'>{{partyA}}</td><td class='center span2'>{{partyB}}</td><td class='center span2'>{{amount}}</td><td class='center span2'>{{state}}</td></tr>";

				var html = Mustache.to_html(template, tdata);
				$('#pieTable').append(html);
			}else if (stringToHex(contract.partyB) == airline) {
				var tdata = {
					name: contract.name,
					partyA: contract.partyA,
					partyB: contract.partyB,
					amount: contract.amount,
					state: contract.state
				};

				$("#detailValue").html(contract.partyB);
				var template = "<tr><td class='center span3'>{{name}}</td><td class='center span2'>{{partyA}}</td><td class='center span2'>{{partyB}}</td><td class='center span2'>{{amount}}</td><td class='center span2'>{{state}}</td></tr>";

				var html = Mustache.to_html(template, tdata);
				$('#pieTable').append(html);
			}

		});
	});

});