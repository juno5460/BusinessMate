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

			var curRatio1 = (t1data.returnRatio)*100;
			var easypieRatio1 = "<div class='pull-middle easy-pie-chart1 percentage easyPieChart' data-size='30' data-color='#ECCB71' data-percent='42' style='width: 30px; height: 30px; line-height: 30px;'>"+
															"	<span class='percent'>"+curRatio1+"</span>%<canvas width='30' height='30'></canvas></div>";
			var template1 = "<tr><td class='center'>{{name}}</td><td class='hidden-480 center'>{{partyA}}</td><td class='hidden-480 center'>{{partyB}}</td><td  class='center'>{{amount}}</td><td class='center'>{{returnAmount}}</td><td class='hidden-phone center'>"+easypieRatio1+"</td><td class='hidden-480 center'>{{lastReturnDate}}</td></tr>";

			var html1 = Mustache.to_html(template1, t1data);
			$('#table1').append(html1);


			var oldie = $.browser.msie && $.browser.version < 9;
			$('.easy-pie-chart1.percentage').each(function(){
				var barColor = $(this).data('color') ;
				var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
				var size = parseInt($(this).data('size')) || 50;
				$(this).easyPieChart({
					barColor: barColor,
					trackColor: trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: parseInt(size/10),
					animate: oldie ? false : 1000,
					size: size
				});
			});

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

			var curRatio2 = (t2data.returnRatio)*100;
			var easypieRatio2 = "<div class='pull-middle easy-pie-chart2 percentage easyPieChart' data-size='40' data-color='#ECCB71' data-percent='42' style='width: 30px; height: 30px; line-height: 30px;'>"+
															"	<span class='percent'>"+curRatio2+"</span>%<canvas width='30' height='30'></canvas></div>";
			var template2 = "<tr><td class='center'>{{name}}</td><td class='hidden-480 center'>{{partyA}}</td><td class='hidden-480 center'>{{partyB}}</td><td class='center'>{{amount}}</td><td  class='center'>{{returnAmount}}</td><td class='hidden-phone center'>"+easypieRatio2+"</td><td class='hidden-phone center'>{{lastReturnDate}}</td><td  class='center'>{{remark}}</td></tr>";

			var html2 = Mustache.to_html(template2, t2data);
			$('#table2').append(html2);

			$('.easy-pie-chart2.percentage').each(function(){
				var barColor = $(this).data('color') ;
				var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
				var size = parseInt($(this).data('size')) || 50;
				$(this).easyPieChart({
					barColor: barColor,
					trackColor: trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: parseInt(size/10),
					animate: oldie ? false : 1000,
					size: size
				});
			});

			var t3data = {
				name: contract.name,
				partyA: contract.partyA,
				partyB: contract.partyB,
				amount: contract.amount,
				returnAmount: contract.returnAmount,
				returnRatio: contract.returnRatio,
				lastReturnDate: contract.lastReturnDate
			};

			var curRatio3 = (t3data.returnRatio)*100;
			var easypieRatio3 = "<div class='pull-middle easy-pie-chart3 percentage easyPieChart' data-size='30' data-color='#ECCB71' data-percent='42' style='width: 30px; height: 30px; line-height: 30px;'>"+
															"	<span class='percent'>"+curRatio3+"</span>%<canvas width='30' height='30'></canvas></div>";
			var template3 = "<tr><td  class='center'>{{name}}</td><td class='hidden-480 center'>{{partyA}}</td><td class='hidden-480 center'>{{partyB}}</td><td class='center'>{{amount}}</td><td class='center'>{{returnAmount}}</td><td class='hidden-phone center'>"+easypieRatio3+"</td><td  class='center'>{{lastReturnDate}}</td></tr>";

			var html3 = Mustache.to_html(template3, t3data);
			$('#table3').append(html3);

			$('.easy-pie-chart3.percentage').each(function(){
				var barColor = $(this).data('color') ;
				var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
				var size = parseInt($(this).data('size')) || 50;
				$(this).easyPieChart({
					barColor: barColor,
					trackColor: trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: parseInt(size/10),
					animate: oldie ? false : 1000,
					size: size
				});
			});
		});
	});

});