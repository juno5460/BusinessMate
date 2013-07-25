$(function() {

	//计算各航空的合同数目
	var partyAabbr = new Array(),
		partyBabbr = new Array();
	var contractsCount = 0;
	var isChecked = false;

	var idIndex = 0;
	var idIndex1 = 0;
	var idIndex2 = 0;

	//定义代办任务label边颜色
	var liColor = new Array('item-orange', 'item-red', 'item-default', 'item-blue',
		'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink', 'item-orange', 'item-red', 'item-default', 'item-blue', 'item-grey', 'item-green', 'item-pink');
	//定义饼图颜色数组
	var color = new Array("#68BC31", "#FEE074", "#d54c7e", "#2091CF", "#AF4E96", "#b74635", "#DA5430", "#f7d05b", "#8b9aa3", "#4f99c6", "#69aa46", "#d9d9d9", "#a069c3", "#629b58", "#b4c2cc");

	//字符串转换成十六进制

	function stringToHex(str) {
		var val = "";
		for (var i in str) {
			if (val == "")
				val = str.charCodeAt(i).toString(16);
			else
				val += "," + str.charCodeAt(i).toString(16);
		}
		return val;
	}

	//定义三种回款标识，并获得其值
	var allCount, allUncount, waitCount;
	$.get("/api/tasksGraph", function(data, status) {
		allCount = data.allReturnCount;
		allUncount = data.allUnreturnCount;
		waitCount = data.allWaitCount;
	});

	//桌面饼图部分
	$.get("/api/contracts", function(data, status) {

		$.each(data, function(i, contract) {
			partyAabbr[contractsCount] = contract.partyAabbr;
			partyBabbr[contractsCount] = contract.partyBabbr;
			contractsCount++;
		});

		var optionPie = {
			series: {
				pie: {
					show: true,
					radius: 1,
					highlight: {
						opacity: 0.3
					},
					label: {
						show: true,
						radius: 1 / 2,
						formatter: labelFormatter,
						background: {
							opacity: 0
						}
					}
				}
			},
			legend: {
				show: true,
				position: "ne",
				labelBoxBorderColor: null,
				margin: [10, 20]
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		//设置饼图标签格式，同时返回金额和百分比

		function labelFormatter(label, series) {
			var count = 0;
			if (label == "已回款")
				return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>￥" + allCount + "<br/>" + Math.round(series.percent) + "%</div>";
			else if (label == "应回款")
				return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>￥" + allUncount + "<br/>" + Math.round(series.percent) + "%</div>";
			else if (label == "待回款")
				return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>￥" + waitCount + "<br/>" + Math.round(series.percent) + "%</div>";
			else {
				$.each(data, function(i, contract) {
					if (contract.partyAabbr == label || contract.partyBabbr == label)
						count += contract.amount;
				});
				return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>￥" + count + "<br/>" + Math.round(series.percent) + "%</div>";
			}
		}

		var pieData1 = new Array(),
			pieData2 = new Array();

		//获得甲（乙）方各公司的总金额，并存入饼图数据中
		for (var i = 0; i < contractsCount; i++) {
			var amountA = 0; //甲方总金额
			var amountB = 0; //乙方总金额
			var toPushA = false;
			var toPushB = false;

			for (var j = i + 1; j < contractsCount; j++) {
				if (partyAabbr[j] == partyAabbr[i])
					partyAabbr[j] = null;

				if (partyBabbr[j] == partyBabbr[i])
					partyBabbr[j] = null;
			}

			$.each(data, function(t, contract) {

				if (partyAabbr[i] != null && contract.partyAabbr == partyAabbr[i]) {
					toPushA = true;
					amountA += contract.amount;
				}
				if (partyBabbr[i] != null && contract.partyBabbr == partyBabbr[i]) {
					toPushB = true;
					amountB += contract.amount;
				}

			});

			if (toPushA) {
				pieData1.push({
					label: partyAabbr[i],
					data: amountA,
					color: color[i]
				});
			}
			if (toPushB) {
				pieData2.push({
					label: partyBabbr[i],
					data: amountB,
					color: color[i + 3]
				});
			}
		}

		var placeholder1 = $('#placeholder1').css({
			'width': '100%',
			'min-height': '160px'
		});
		$.plot(placeholder1, pieData1, optionPie);
		placeholder1.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

		var placeholder2 = $('#placeholder2').css({
			'width': '100%',
			'min-height': '160px'
		});
		$.plot(placeholder2, pieData2, optionPie);
		placeholder2.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

		$.get("/api/tasksGraph", function(data, status) {
			var pieData3 = [];
			var data1 = {
				label: "已回款",
				data: data.allReturnCount,
				color: "#f89406"
			};
			var data2 = {
				label: "待回款",
				data: data.allWaitCount,
				color: "#b74635"
			};
			var data3 = {
				label: "应回款",
				data: data.allUnreturnCount,
				color: "#005580"
			};
			pieData3.push(data1);
			pieData3.push(data2);
			pieData3.push(data3);
			var placeholder3 = $('#placeholder3').css({
				'width': '100%',
				'min-height': '160px'
			});
			$.plot(placeholder3, pieData3, optionPie);
			placeholder3.bind("plotclick", function(event, pos, obj) {
				var labelName = obj.series.label;

				if (labelName == "已回款")
					window.location.href = "/fund";
				else if (labelName == "应回款")
					window.location.href = "/fundShould";
				else
					window.location.href = "/fundWait";
			});
		});

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
		var taskIsBlank = false;

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
				if (dataName.length > 5) {
					dataName = dataName.substring(0, 5) + "...";
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

				idIndex++;
				if (idIndex >= 15)
					idIndex = 0;
			};

			var bindModel = function(ulIndex, contract) {

				var $buttonElement = $("#taskToFinish ul:eq(" + ulIndex + ")").find('button');

				//对于button，绑定事件之前一定要先解除前一次的绑定，否则会出错
				$buttonElement.unbind("click");
				$buttonElement.click(function() {

					bootbox.prompt("提示（填写备注信息）", function(result) {
						if (result == null)
							return;

						remark = result;
					});
				});

				var $inputElement = $("#taskToFinish ul:eq(" + ulIndex + ")").find('input');
				$inputElement.unbind("click");
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

					bootbox.confirm("一经提交便无法修改，请确定是否提交！", function(result) {
						if (!result) {
							$tempObj.prop("checked", false);
							return;
						}

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
											// console.info(contract);
											if (zeroTitle) {
												$tempObj.parent().parent().parent().fadeOut(1000);

												var html = $('#taskToFinish').html();
												if (html == "") {
													template = "<div id='blankTask' style='margin-top:100px'><ul class='center' style='font-size:16px'>没有需要待办的任务.</ul></div>";
													$('#taskToFinish').html(template);
												}

											} else {
												$tempObj.parent().parent().parent().replaceWith(template).show(500);
												// console.info("rollIn");
												// console.info(e.data.uI);
												bindModel(e.data.uI, contract);
											}
										}
									}); <!--each-->
								}); <!--get-->
							}
						});

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
				if (dataName.length > 5) {
					dataName = dataName.substring(0, 5) + "...";
				}

				//定义插入模版
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex] + "'><label id='" + contract.undone[j].id + "'class='inline taskcell'><input type='checkbox'><span class='lbl'><span class='lbl'><a href='" + "/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t3 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label><span style=font-size:18px;color:red>*</span><div class='pull-right'><button class='btn btn-mini btn-info'><i class='icon-edit bigger-123'></i></button></div></li></ul>";

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

				var $buttonElement = $("#outOfDate ul:eq(" + ulIndex + ")").find('button');

				$buttonElement.unbind("click");
				$buttonElement.click(function() {
					bootbox.prompt("提示（填写备注信息）", function(result) {
						if (result == null)
							return;

						remark = result;
					});
				});

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

					bootbox.confirm("一经提交便无法修改，请确定是否提交！", function(result) {
						if (!result) {
							$tempObj.prop("checked", false);
							return;
						}

						$.ajax({
							url: '/api/tasks/' + undoneID,
							type: 'put',
							data: postData,
							error: function() {
								console.info('error');
							},
							success: function(result) {
								$tempObj.parent().parent().parent().fadeOut(1000);
								var html = $('#outOfDate').html();
								if (html == "") {
									template = "<div id='blankDate' style='margin-top:120px'><ul class='center' style='font-size:16px'>没有过期任务.</ul></div>";
									$('#outOfDate').html(template);
								}
							}
						});
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
				if (dataName.length > 5) {
					dataName = dataName.substring(0, 5) + "...";
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