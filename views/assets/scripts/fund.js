$(function() {

	$.get("api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
		
			var t1data = {
				name: contract.name,
				partyA: contract.partyA,
				partyB: contract.partyB,
				amount: contract.amount,
				returnAmount: contract.returnAmount,
				returnRatio: contract.returnRatio,
				lastReturnDate: contract.lastReturnDate
			};

			var template1 = "<tr><td>{{name}}</td><td class='hidden-480'>{{partyA}}</td><td class='hidden-480'>{{partyB}}</td><td>{{amount}}</td><td>{{returnAmount}}</td><td class='hidden-phone'>{{returnRatio}}</td><td class='hidden-480'>{{lastReturnDate}}</td></tr>";

			var html1 = Mustache.to_html(template1, t1data);
			$('#table1').append(html1);

			var t2data = {
				name						: contract.name,
				partyA					: contract.partyA,
				partyB					: contract.partyB,
				amount          : contract.amount,
				returnAmount		: contract.returnAmount,
				returnRatio			: contract.returnRatio,
				lastReturnDate	: contract.lastReturnDate,
				remark					: contract.remark
			};

			var template2 = "<tr><td>{{name}}</td><td class='hidden-480'>{{partyA}}</td><td class='hidden-480'>{{partyB}}</td><td>{{amount}}</td><td>{{returnAmount}}</td><td class='hidden-phone'>{{returnRatio}}</td><td class='hidden-phone'>{{lastReturnDate}}</td><td>{{remark}}</td></tr>";

			var html2 = Mustache.to_html(template2, t2data);
			$('#table2').append(html2);

			var t3data = {
				name: contract.name,
				partyA: contract.partyA,
				partyB: contract.partyB,
				amount: contract.amount,
				returnAmount: contract.returnAmount,
				returnRatio: contract.returnRatio,
				lastReturnDate: contract.lastReturnDate
			};

			var template3 = "<tr><td>{{name}}</td><td class='hidden-480'>{{partyA}}</td><td class='hidden-480'>{{partyB}}</td><td>{{amount}}</td><td>{{returnAmount}}</td><td class='hidden-phone'>{{returnRatio}}</td><td>{{lastReturnDate}}</td></tr>";

			var html3 = Mustache.to_html(template3, t3data);
			$('#table3').append(html3);
		});
	});

});