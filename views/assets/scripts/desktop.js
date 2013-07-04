$(function() {
	//计算各航空的合同数目
	var partyA = new Array(),
		partyB = new Array();
	var contractsCount = 0;

	//代办任务初始化变量

	//为代办任务中添加的每一个checkbox动态添加id
	var checkboxId = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
		'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't');
	var idIndex = 0;

	var liColor = new Array('item-orange', 'item-red', 'item-default', 'item-blue',
		'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink');

	$.get("/api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
			partyA[contractsCount] = contract.partyA;
			partyB[contractsCount] = contract.partyB;
			contractsCount++;
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
					// startAngle: 2,
					radius: 100,
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
		var color = new Array("#00CCFF", "#4DFF00", "#FF4747", "#47A3FF", "#FF0066",
			"#FF85FF", "#47FF47", "#FF8FB4", "#8BFF52", "#FF85FF", "#FFF27A",
			"#F27AFF", "#88FF7A", "#F27AFF", "#F27AFF", "#FF33CC", "#85FFFF");

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
			window.location.href = "/desktop" + '/' + obj.series.label;
		});

		var placeholder2 = $('#placeholder2').css({
			'width': '90%',
			'min-height': '150px'
		});
		$.plot(placeholder2, pieData2, optionPie);
		placeholder2.bind("plotclick", function(event, pos, obj) {
			window.location.href = "/desktop" + '/' + obj.series.label;
		});

	});

	//代办任务
	$.get("/api/tasks", function(data, status) {

		$.each(data, function(i, contract) {
			
			var tdata = {
				name: contract.name,
				title: contract.next.title,
				date: contract.next.date
			};

			var t1,t2,t3,t4,template;
			t1 = "<tr><td><ul style='height:100%' class='item-list ui-sortable'><li class='" + liColor[idIndex] + "'><label class='inline taskcell'>";
			t2 = "<input class='test' type='checkbox' id='" + checkboxId[idIndex] + "'>";
			console.info(contract.next.title);
			if(contract.next.title == 0) {
				 t3 = "<span class='lbl'>" + "<span class='lbl label arrowed-right'>"+tdata.name+"</span>";
				 t4 = "<span class='lbl label label-success arrowed-in'>"+ "合同已完成" +"</span>" +"</span></label></li></ul></td></tr>";
				 // template = null;
				 // template = t1 + t2 + t3 + t4;
				 // $('#taskToFinish').append(template);

			}else {
				 t3 = "<span class='lbl'>" + "<span class='lbl label arrowed-right'>"+tdata.name+"</span>"+ "<span class='lbl label label-info arrowed-right arrowed-in'>"+ tdata.date+"</span>";
				 t4 = "<span class='lbl label label-success arrowed-in'>"+ tdata.title +"</span>" +"</span></label></li></ul></td></tr>";
			}
			
			template = t1 + t2 + t3 + t4;
			$('#taskToFinish').append(template);
			idIndex++;

			var tempIDValue = checkboxId[idIndex - 1];
			var tempID;

			if (tempIDValue == 'a')
				tempID = $("#a");
			else if (tempIDValue == 'b')
				tempID = $("#b");
			else if (tempIDValue == 'c')
				tempID = $("#c");
			else if (tempIDValue == 'd')
				tempID = $("#d");
			else if (tempIDValue == 'e')
				tempID = $("#e");
			else if (tempIDValue == 'f')
				tempID = $("#f");
			else if (tempIDValue == 'g')
				tempID = $("#g");
			else if (tempIDValue == 'h')
				tempID = $("#h");
			else if (tempIDValue == 'i')
				tempID = $("#i");
			else if (tempIDValue == 'j')
				tempID = $("#j");
			else if (tempIDValue == 'k')
				tempID = $("#k");
			else if (tempIDValue == 'l')
				tempID = $("#l");
			else if (tempIDValue == 'm')
				tempID = $("#m");
			else if (tempIDValue == 'n')
				tempID = $("#n");
			else if (tempIDValue == 'o')
				tempID = $("#o");
			else if (tempIDValue == 'p')
				tempID = $("#p");
			else if (tempIDValue == 'q')
				tempID = $("#q");
			else if (tempIDValue == 'r')
				tempID = $("#r");
			else if (tempIDValue == 's')
				tempID = $("#s");
			else if (tempIDValue == 't')
				tempID = $("#t");

			tempID.bind("click", function() {

				var tID = this.id;
				var dom = document.getElementById(tID);
				var checkValue = dom.checked;
				var remark = null;
				var $taskObj = $(this);

				if(checkValue) {
					bootbox.prompt("提示（备注信息）", function(result) {
						if(result == null) {
							$taskObj.prop("checked", false);
							return;
						}

						checkValue = true;
						remark = result;
						$taskObj.closest('li').addClass('selected');

						var postData = {
							_id: contract._id,
							id: contract.next.id,
							title: tdata.title,
							completed: checkValue,
							remark: remark
						};
						console.info(postData);

						$.ajax({
								url: '/api/tasks/'+ contract.next.id,
								type: 'put',
								data: postData,
								error: function(){
									console.info('error');
								},
								success: function(result){
									console.info('success');
								}
						});
					});
				}
				$taskObj.prop("checked", true);
			});
		});
	});
});
