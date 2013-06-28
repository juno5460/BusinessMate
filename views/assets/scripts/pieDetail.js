$(function() {
		var airline = $('#pieID').val();
		console.info(airline);

		$.get("/api/contracts", function(data, status) {

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

						var template = "<tr><td class='center'>{{name}}</td><td class='center'>{{partyA}}</td><td class='center'>{{partyB}}</td><td class='center'>{{amount}}</td><td class='center'>{{state}}</td></tr>";

						var html = Mustache.to_html(template, tdata);
						$('#pieTable').append(html);
				}

			});
		});

});