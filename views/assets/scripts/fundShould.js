


$(function() {

	$.get("/api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
		
			$.get("/api/tasks/"+contract._id, function(data1, status) {
					console.info(data1);

					//定义取小数点后两位函数
					function changeTwoDecimal(x)  
					{  
						var f_x = parseFloat(x);  
						if (isNaN(f_x))   
							return false;  
						var f_x = Math.round(x*100)/100;  
						var s_x = f_x.toString();  
						var pos_decimal = s_x.indexOf('.');  
						if (pos_decimal < 0)  
						{  
							pos_decimal = s_x.length;  
							s_x += '.';  
						}  
						while (s_x.length <= pos_decimal + 2)  
						{  
						s_x += '0';  
						}  
						return s_x;  
					}  

					var t3data = {
						name: contract.name,
						partyA: contract.partyA,
						partyB: contract.partyB,
						amount: contract.amount,
						returnAmount: data1.oneAllCount,
						returnRatio: contract.returnRatio,
						remark	: contract.state
					};

					var curRatio3 = changeTwoDecimal((t3data.returnRatio)*100);
					curRatio3=100;
					var easypieRatio3 = "<div style='margin:0px;padding:1px' class='progress' data-percent='"+curRatio3+"%'><div class='bar' style='width:"+curRatio3+"%;'></div></div>";
					var template3 = "<tr><td  class='center span3'>{{name}}</td><td class='hidden-480 center span2'>{{partyA}}</td><td class='hidden-480 center span2'>{{partyB}}</td><td class='center span1'>{{amount}}</td><td class='center span1'>{{returnAmount}}</td><td class='hidden-phone center span1'>"+easypieRatio3+"</td><td  class='center span2'>{{remark}}</td></tr>";

					var html3 = Mustache.to_html(template3, t3data);
					$('#table3').append(html3);

					var oldie = $.browser.msie && $.browser.version < 9;
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
});