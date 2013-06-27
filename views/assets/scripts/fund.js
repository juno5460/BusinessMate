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

			var test = "<div class='easy-pie-chart percentage easyPieChart' data-size='30' data-color='#ECCB71' data-percent='42' style='width: 30px; height: 30px; line-height: 30px;'>"+
															"	<span class='percent'>42</span>%" +
															"<canvas width='30' height='30'></canvas></div>";
			var template1 = "<tr><td>{{name}}</td><td class='hidden-480'>{{partyA}}</td><td class='hidden-480'>{{partyB}}</td><td>{{amount}}</td><td>{{returnAmount}}</td><td class='hidden-phone'>"+test+"</td><td class='hidden-480'>{{lastReturnDate}}</td></tr>";

			var html1 = Mustache.to_html(template1, t1data);
			$('#table1').append(html1);



			$('.easy-pie-chart.percentage').each(function(){

					var barColor = $(this).data('color') ;
					var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
					var size = parseInt($(this).data('size')) || 50;
					$(this).easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: parseInt(size/10),
						animate: false,
						size: size
					});
				})
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