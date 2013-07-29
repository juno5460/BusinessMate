$(function() {
	$.get('/api/businesslog', function(data, status) {
		$.each(data, function(i, log) {
			var tdata = {
				time: log.time,
				cname: log.contractName,
				version: log.getNew,
				deptA: log.data.partADept,
				deptB: log.data.partBDept,
				state: log.data.state
			};
			console.info(tdata.state);
			var template = "<div id='blog' class='span12'><div id='box' class='widget-box collapsed'><div class='widget-header widget-header-small'><h6>{{time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{cname}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本:{{version}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{deptA}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{deptB}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{state}}</h6><div class='widget-toolbar'><a href='#' data-action='collapse'> <i id='iClick' class='icon-chevron-down'></i></a></div></div><div class='widget-body'><div class='widget-body-inner' style='display: block;'><div class='widget-main'><table style='width:100%'><thead><tr><th class='center'>事件名称</th><th class='center'>事件类型</th><th class='center'>发票日期</th><th class='center'>执行时间</th><th class='center'>回款金额</th></tr></thead><tbody></tbody></table></div></div></div></div></div>";
			var $templateHtml = $(Mustache.to_html(template, tdata));

			$("#userlog").append($templateHtml);
			$templateHtml.find("#iClick").click(
				function() {
					var iclass = $templateHtml.find("#iClick").attr("class");
					if (iclass == "icon-chevron-down") {
						$templateHtml.find("#iClick").removeClass("icon-chevron-down");
						$templateHtml.find("#iClick").addClass("icon-chevron-up");
						$templateHtml.find("#box").removeClass("collapsed");
					} else {
						$templateHtml.find("#iClick").removeClass("icon-chevron-up");
						$templateHtml.find("#iClick").addClass("icon-chevron-down");
						$templateHtml.find("#box").addClass("collapsed");
					}
				}
			);
	
			for(var i in log.data.events) {
				var eventType = log.data.events[i].type;
				var billDate = log.data.events[i].invoiceDate;
				var money = log.data.events[i].price;
				var date;
				if(eventType == "1") {
					eventType = "自定义事件";
					billDate = "";
					date = log.data.events[i].date;
					money = '';
				} else {
					eventType = "回款事件";
					date = log.data.events[i].priceDate;
				}
				var eventdata = {
					ename : log.data.events[i].title,
					type : eventType,
					billDate : billDate,
					date : date,
					money : money
				};
				var bodyTemp = "<tr><td class='center'>{{ename}}</td><td class='center'>{{type}}</td><td class='center'>{{billDate}}</td><td class='center'>{{date}}</td><td class='center'>{{money}}</td></tr>"
				var $bodyHtml = $(Mustache.to_html(bodyTemp, eventdata));
				$templateHtml.find("tbody").append($bodyHtml);
			}
		});
	});
});