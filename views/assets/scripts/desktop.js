$(function() {

	//计算各航空的合同数目
	var partyA = new Array(),
		partyB = new Array();
	var contractsCount = 0;
	$.get("api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
			partyA[contractsCount] = contract.partyA;
			partyB[contractsCount] = contract.partyB;
			contractsCount++;


			<!--动态添加表格-->
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
				name: contract.name,
				partyA: contract.partyA,
				partyB: contract.partyB,
				amount: contract.amount,
				returnAmount: contract.returnAmount,
				returnRatio: contract.returnRatio,
				lastReturnDate: contract.lastReturnDate
			};

			var template2 = "<tr><td>{{name}}</td><td class='hidden-480'>{{partyA}}</td><td class='hidden-480'>{{partyB}}</td><td>{{amount}}</td><td>{{returnAmount}}</td><td class='hidden-phone'>{{returnRatio}}</td><td class='hidden-phone'>{{lastReturnDate}}</td></tr>";

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

		var placeholder1 = $('#placeholder1').css({
			'width': '90%',
			'min-height': '150px'
		});

		var optionPie = {

			series: {
				pie: {
					show: true,
					highlight: {
						opacity: 0.25
					},
					stroke: {
						color: '#fff',
						width: 2
					},
					//startAngle: 2,
					radius:100,
					label: {
						show: true,
						radius: 1,
						formatter: function(label, slice) {
							return '<div style="font-size:x-small;text-align:center;padding:2px;color:' + slice.color + ';">' + '<br/>' + Math.round(slice.percent) + '%</div>';
						},
						background: {
							opacity: 0,
							color: null
						}
					}
				}
			},
			legend: {
				show: true,
				position: "ne",
				labelBoxBorderColor: null,
				margin: [-10, 60]
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		//定义颜色数组
		var color = new Array("#FF0033", "#3300FF", "#00CCFF", "#FF00FF", "#FF3300",
			"#00CC99", "#33FF66", "#66FF00", "#00FFFF", "#CC6666", "#3399FF",
			"#00FF33", "#CCFF99", "#FFCC66", "#CC3300", "#FF33CC", "#FF0066");

		var pieData1 = new Array(),
			pieData2 = new Array();

		for (var i = 0; i < contractsCount; i++) {
			if (partyA[i] == null)
				continue;
			var countA = 1;
			for (var j = i + 1; j < contractsCount; j++) {
				if ((partyA[j] != null) && (partyA[j] == partyA[i])) {
					countA++;
					partyA[j] = null;
				}
			}

			pieData1.push({
				label: partyA[i],
				data: countA,
				color: color[i]
			});
		}

		for (var i = 0; i < contractsCount; i++) {
			if (partyB[i] == null)
				continue;
			var countB = 1;
			for (var j = i + 1; j < contractsCount; j++) {
				if ((partyB[j] != null) && (partyB[j] == partyB[i])) {
					countB++;
					partyB[j] = null;
				}
			}

			pieData2.push({
				label: partyB[i],
				data: countB,
				color: color[i + 4]
			});
		}


		$.plot(placeholder1, pieData1, optionPie);
		placeholder1.bind("plotclick", function(event, pos, obj) {
			window.location.href = "http://localhost:3000/#pieDetial" + '/' + obj.series.label;
		});

		var placeholder2 = $('#placeholder2').css({
			'width': '90%',
			'min-height': '150px'
		});
		$.plot(placeholder2, pieData2, optionPie);
		placeholder2.bind("plotclick", function(event, pos, obj) {
			window.location.href = "http://localhost:3000/#pieDetial" + '/' + obj.series.label;
		});


	});
});