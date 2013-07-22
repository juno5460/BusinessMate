$(function() {
	//计算各航空的合同数目
	var partyA = new Array(),
		partyB = new Array();
	var contractsCount = 0;
	var isChecked = false;

	var idIndex = 0;
	var idIndex1 = 0;
	var idIndex2 = 0;

	var liColor = new Array('item-orange', 'item-red', 'item-default', 'item-blue',
		'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink');

	$.get("/api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
			partyA[contractsCount] = contract.partyA;
			partyB[contractsCount] = contract.partyB;
			contractsCount++;
		});

		var optionPie = {

			series: {
				pie: {
					show: true,
					highlight: {
						opacity: 0.2
					},
					stroke: {
						color: '#fff',
						width: 2
					},
					// startAngle: 2,
					radius: 70,
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
				margin: [-40, 20]
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		//定义颜色数组
		var color = new Array("#00CCFF", "#88FF7A", "#F27AFF", "#47FF47",
			"#FF0066", "#FF33CC", "#85FFFF", "#FF8FB4", "#8BFF52", "#FFF27A",
			"#FF4747", "#47A3FF", "#4DFF00", "#F63AFF", "#F18BDD", "#FF85FF");

		var pieData1 = new Array(),
			pieData2 = new Array();

		for (var i = 0; i < contractsCount; i++) {
			var amountA = 0; //甲方总金额
			var amountB = 0; //乙方总金额
			var toPushA = false;
			var toPushB = false;

			for (var j = i + 1; j < contractsCount; j++) {
				var fe = (partyA[j] == partyA[i]);
				if (partyA[j] == partyA[i])
					partyA[0] = null;
				
				if (partyB[j] == partyB[i])
					partyB[j] = null;
			}
		
			$.each(data, function(t, contract) {

				if (partyA[i] != null && contract.partyA == partyA[i]) {
					toPushA = true;
					amountA += contract.amount;
				}
				if (partyB[i] != null && contract.partyB == partyB[i]) {
					toPushB = true;
					amountB += contract.amount;
				}

			});

			if(toPushA) {
				pieData1.push({
					label: partyA[i],
					data: amountA,
					color: color[i]
				});
			}
			if(toPushB) {
				pieData2.push({
					label: partyB[i],
					data: amountB,
					color: color[i + 2]
				});
			}
		}


		//字符串转换成十六进制

		function stringToHex(str) {
			var val = "";
			for (var i = 0; i < str.length; i++) {
				if (val == "")
					val = str.charCodeAt(i).toString(16);
				else
					val += "," + str.charCodeAt(i).toString(16);
			}
			return val;
		}

		var placeholder1 = $('#placeholder1').css({
			'width': '40%',
			'min-height': '150px',
			'margin-left': '30px'
		});
		$.plot(placeholder1, pieData1, optionPie);
		placeholder1.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

		var placeholder2 = $('#placeholder2').css({
			'width': '40%',
			'min-height': '150px',
			'margin-left': '30px'
		});
		$.plot(placeholder2, pieData2, optionPie);
		placeholder2.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

		var placeholder3 = $('#placeholder3').css({
			'width': '90%',
			'min-height': '150px'
		});
		$.plot(placeholder3, pieData2, optionPie);

	});

	//格式化日期函数
	Date.prototype.format = function(format) {
		/* 
		 * eg:format="yyyy-MM-dd hh:mm:ss";
		 */
		var o = {
			"M+": this.getMonth() + 1, // month  
			"d+": this.getDate(), // day  
			"h+": this.getHours(), // hour  
			"m+": this.getMinutes(), // minute  
			"s+": this.getSeconds(), // second  
			"q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
			"S": this.getMilliseconds() // millisecond  
		}

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}

		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};

	//代办任务
	$.get("/api/tasks", function(data, status) {

		var ulIndex = -1; //ul标签索引，根据它可以find到checkbox，进而添加click
		var t1, t2, t3, template;
		var zeroTitle; //title是否为零标识，以此作为合同结束标志
		var remark = ''; //备注信息
		var taskIsBland = false;

		$.each(data, function(i, contract) {

			var templateModel = function(contract) {

				zeroTitle = false;

				//获取代办任务插入模版的数据
				var tdata = {
					id: contract._id,
					name: contract.name,
					title: contract.next.title,
					date: contract.next.date
				};

				//合同名称过长则进行省略处理
				var dataName = tdata.name;
				if (dataName.length > 8) {
					dataName = dataName.substring(0, 8) + "...";
				}

				//定义插入模版
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex] + "'><label class='inline taskcell'><input type='checkbox'><span class='lbl'><span class='lbl'><a href='" + "/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t3 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label><div class='pull-right'><button class='btn btn-mini btn-info'><i class='icon-edit bigger-123'></i></button></div></li></ul>";

				if (contract.next.title == 0) {
					template = null;
					zeroTitle = true;
				} else if (!contract.next.invoiceDone && contract.next.price > 0) {
					t2 = "<span style='color:red'>开发票</span>";
					template = t1 + t2 + t3;
					ulIndex++;
				} else {
					template = t1 + t3;
					ulIndex++;
				}

				if (taskIsBland)
					ulIndex--;
				idIndex++;
				if (idIndex >= 15)
					idIndex = 0;
			};

			var bindModel = function(ulIndex, contract) {

				var $buttonElement = $("#taskToFinish ul:eq(" + ulIndex + ")").find('button');
				$buttonElement.click(function() {
					bootbox.prompt("提示（填写备注信息）", function(result) {
						if (result == null)
							return;

						remark = result;
					});
				});

				var $inputElement = $("#taskToFinish ul:eq(" + ulIndex + ")").find('input');
				$inputElement.bind('click', {
					con: contract,
					uI: ulIndex
				}, function(e) {
					var $tempObj = $(this);
					var tempName = e.data.con.name;
					var checkValue = true;

					var postData = {
						_id: e.data.con._id,
						id: e.data.con.next.id,
						title: e.data.con.next.title,
						completed: checkValue,
						remark: remark
					};

					$.ajax({
						url: '/api/tasks/' + e.data.con.next.id,
						type: 'put',
						data: postData,
						error: function() {
							console.info('error');
						},
						success: function(result) {
							console.info('success');
							$.get("/api/tasks", function(data, status) {

								$.each(data, function(i, contract) {

									if (contract.name == tempName) {

										templateModel(contract);
										console.info(template);
										console.info(zeroTitle);
										if (zeroTitle) {

											$tempObj.parent().parent().parent().remove();
											taskIsBland = true;
											var html = $('#taskToFinish').html();
											if (html == "") {
												template = "<div id='blankTask' style='margin-top:100px'><ul class='center' style='font-size:16px'>没有需要待办的任务.</ul></div>";
												$('#taskToFinish').html(template);
											}

										} else {
											// $tempObj.parent().parent().parent().fadeOut(2000);
											$tempObj.parent().parent().parent().replaceWith(template);
											bindModel(e.data.uI, contract);
										}
									}
								});
							});
						}
					});
				});
			};

			templateModel(contract);
			$('#taskToFinish').append(template);
			bindModel(ulIndex, contract);

		}); <!--each-->

		//对待办任务部分为空的情况进行处理
		var html = $('#taskToFinish').html();
		if (html == "") {
			template = "<div id='blankTask' style='margin-top:100px'><ul class='center' style='font-size:16px'>没有需要待办的任务.</ul></div>";
			$('#taskToFinish').html(template);
			return;
		} else {
			if ($('#blankTask'))
				$('#blankTask').remove();
		}
	}); <!--get-->

	//过期任务
	$.get("/api/tasks", function(data, status) {

		var ulIndex = -1; //ul标签索引，根据它可以find到checkbox，进而添加click
		var t1, t2, t3, template;
		var remark = ''; //备注信息
		var idIndex = 0;

		//判断是否有过期任务

		function isBlank() {
			var html = $('#outOfDate').html();
			if (html == "") {
				template = "<div id='blankDate' style='margin-top:120px'><ul class='center' style='font-size:16px'>没有过期任务.</ul></div>";
				$('#outOfDate').html(template);
				return;
			} else {
				if ($('#blankDate'))
					$('#blankDate').remove();
			}
		};

		$.each(data, function(i, contract) {

			var templateModel = function(contract, j) {

				//获取代办任务插入模版的数据
				var tdata = {
					id: contract._id,
					name: contract.name,
					title: contract.undone[j].title,
					date: contract.undone[j].date,
				};

				//合同名称过长则进行省略处理
				var dataName = tdata.name;
				if (dataName.length > 8) {
					dataName = dataName.substring(0, 8) + "...";
				}

				//定义插入模版
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex] + "'><label id='" + contract.undone[j].id + "'class='inline taskcell'><input type='checkbox'><span class='lbl'><span class='lbl'><a href='" + "/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t3 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label><div class='pull-right'><button class='btn btn-mini btn-info'><i class='icon-edit bigger-123'></i></button></div></li></ul>";

				if (!contract.undone[j].invoiceDone) {
					t2 = "<span style='color:red'>开发票</span>";
					template = t1 + t2 + t3;
				} else
					template = t1 + t3;

				ulIndex++;

				idIndex++;
				if (idIndex >= 15)
					idIndex = 0;
			};

			var bindModel = function(ulIndex, contract, j) {

				// var $buttonElement = $("#outOfDate ul:eq(" + ulIndex + ")").find('button');
				// $buttonElement.click(function() {
				// 	bootbox.prompt("提示（填写备注信息）", function(result) {
				// 		if (result == null)
				// 			return;

				// 		remark = result;
				// 	});
				// });

				var $inputElement = $("#outOfDate ul:eq(" + ulIndex + ")").find('input');
				$inputElement.bind('click', {
					con: contract
				}, function(e) {
					console.info(ulIndex);
					var $tempObj = $(this);
					var tempName = e.data.con.name;
					var checkValue = true;
					var undoneID = $tempObj.parent().attr('id');

					var postData = {
						_id: e.data.con._id,
						id: undoneID,
						title: e.data.con.undone[j].title,
						completed: checkValue,
						remark: remark
					};

					$.ajax({
						url: '/api/tasks/' + undoneID,
						type: 'put',
						data: postData,
						error: function() {
							console.info('error');
						},
						success: function(result) {
							$tempObj.parent().parent().parent().remove();
							var html = $('#outOfDate').html();
							if (html == "") {
								template = "<div id='blankDate' style='margin-top:120px'><ul class='center' style='font-size:16px'>没有过期任务.</ul></div>";
								$('#outOfDate').html(template);
							}
						}
					});
				});
			};

			for (var j = 0; j < contract.undone.length; j++) {

				templateModel(contract, j);
				$('#outOfDate').append(template);
				bindModel(ulIndex, contract, j);

			}
		}); <!--each-->

		isBlank();
	}); <!--get-->

	//已完成任务
	$.get('/api/dones', function(data, status) {

		$.each(data, function(i, contract) {

			var t1, t2, template;

			for (var j = 0; j < contract.done.length; j++) {

				//获取代办任务插入模版的数据
				var tdata = {
					id: contract._id,
					name: contract.name,
					title: contract.done[j].title,
					date: contract.done[j].date,
					invoiceDate: contract.done[j].invoiceDate
				};

				//合同名称过长则进行省略处理
				var dataName = tdata.name;
				if (dataName.length > 8) {
					dataName = dataName.substring(0, 8) + "...";
				}

				//定义插入模版
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex2] + "'><label><span class='lbl'><span class='lbl'><a href='/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t2 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label></li></ul>";

				template = t1 + t2;
				$('#isFinished').append(template);

				idIndex2++;
				if (idIndex2 >= 15)
					idIndex2 = 0;
			}

		});

		//判断是否有完成任务
		var html = $('#isFinished').html();
		if (html == "") {
			template = "<div id='blankFinished' style='margin-top:100px'><ul class='center' style='font-size:16px'>没有已完成任务.</ul></div>";
			$('#isFinished').html(template);
			return;
		} else {
			if ($('#blankFinished'))
				$('#blankFinished').remove();
		}
	});
});