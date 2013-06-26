$(function() {
		var airline = $('#pieID').val();
		console.info(airline);

		$.get("http://10.108.1.65:3000/api/contracts", function(data, status) {

			$.each(data, function(i, contract) {
				//这里找出id的所有合同并添加
				if (contract.partyA == airline || contract.partyB == airline) {
						console.info(airline);
						var tdata = {
							name		: contract.name,
							partyA	: contract.partyA,
							partyB	: contract.partyB,
							amount  : contract.amount,
							state   : contract.state
						};

						var template = "<tr><td>{{name}}</td><td>{{partyA}}</td><td>{{partyB}}</td><td>{{amount}}</td><td>{{state}}</td></tr>";

						var html = Mustache.to_html(template, tdata);
						$('#pieTable').append(html);
				}

			});
		});

});