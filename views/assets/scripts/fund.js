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

					//合同名称过长则进行省略处理
					var contractName = contract.name;
					if (contractName.length > 20) {
						contractName = contractName.substring(0, 20) + "...";
					}

					var t1data = {
						name 						: 	contractName,
						partyA 					: 	contract.partyAabbr,
						partyB 					: 	contract.partyBabbr,
						amount 					: 	contract.amount,
						returnAmount 		: 	data1.returnCount,
						returnRatio 		: 	data1.returnRatio,
						lastReturnDate 	: 	data1.lastDate
					};

					var curRatio1 = changeTwoDecimal((t1data.returnRatio)*100);
					if(!curRatio1)
						curRatio1 = 0;
					console.info(curRatio1);
					var easypieRatio1 = "<div style='margin:0px;padding:1px' class='progress' data-percent='"+curRatio1+"%'><div class='bar' style='width:"+curRatio1+"%;'></div></div>";
					var template1 = "<tr><td class='center' style='width:200px' title="+contract.name+">{{name}}</td><td class='hidden-480 center '>{{partyA}}</td><td class='hidden-480 center '>{{partyB}}</td><td  class='center '>{{amount}}</td><td class='center '>{{returnAmount}}</td><td class='hidden-phone center '>"+easypieRatio1+"</td><td class='hidden-480 center '>{{lastReturnDate}}</td></tr>";

					var $html = $(Mustache.to_html(template1, t1data));
					$html.click(function(){
						window.location.href = "/contracts/" + contract._id + "/edit";
					});
					$('#table1').append($html);

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
			});
		});		
	});
});