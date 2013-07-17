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

					var t2data = {
						name						: 	contract.name,
						partyA					: 	contract.partyA,
						partyB					: 	contract.partyB,
						amount          : 	contract.amount,
						returnAmount		: 	data1.unreturnCount,
						returnRatio 		: 	data1.returnRatio,
						applicantDate  	: 	data1.applicantDate,
						remark					: 	contract.state
					};

					var curRatio2 = changeTwoDecimal((t2data.returnRatio)*100);
					if(!curRatio2)
						curRatio2 = 0;
					var easypieRatio2 = "<div style='margin:0px;padding:1px' class='progress' data-percent='"+curRatio2+"%'><div class='bar' style='width:"+curRatio2+"%;'></div></div>";
					var template2 = "<tr><td class='center' style='width:200px'>{{name}}</td><td class='hidden-480 center'>{{partyA}}</td><td class='hidden-480 center'>{{partyB}}</td><td class='center'>{{amount}}</td><td  class='center'>{{returnAmount}}</td><td class='hidden-phone center'>"+easypieRatio2+"</td><td class='hidden-phone center'>{{applicantDate}}</td><td  class='center'>{{remark}}</td></tr>";

					var html2 = Mustache.to_html(template2, t2data);
					$('#table2').append(html2);

					var oldie = $.browser.msie && $.browser.version < 9;
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

					
			});
		});
	});
});