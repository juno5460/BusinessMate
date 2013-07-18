$(function() {
	//计算各航空的合同数目
	var partyA = new Array(),
		partyB = new Array();
	var contractsCount = 0;
	var isChecked = false;

	//代办任务初始化变量

	//为代办任务中添加的每一个checkbox动态添加id
	var checkboxId = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
		'l', 'm', 'n', 'o', 'p');
	var idIndex = 0;

	//为过期任务中添加的每一个checkbox动态添加id
	var checkboxId1 = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P');
	var idIndex1 = 0;

	//已完成任务索引
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
				margin: [-40, 50]
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		//定义颜色数组
		var color = new Array("#00CCFF",  "#88FF7A", "#F27AFF", "#47FF47", 
			"#FF0066", "#FF33CC", "#85FFFF","#FF8FB4", "#8BFF52",  "#FFF27A",
			"#FF4747", "#47A3FF", "#4DFF00","#F63AFF","#F18BDD","#FF85FF");

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
				color: color[i + 2]
			});
		}

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
			'width': '90%',
			'min-height': '150px'
		});
		$.plot(placeholder1, pieData1, optionPie);
		placeholder1.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

		var placeholder2 = $('#placeholder2').css({
			'width': '90%',
			'min-height': '150px',
			'margin-left': '10px'
		});
		$.plot(placeholder2, pieData2, optionPie);
		placeholder2.bind("plotclick", function(event, pos, obj) {
			var labelName = obj.series.label;
			window.location.href = "/desktop" + '/' + stringToHex(labelName);
		});

	});


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
			"S": this.getMilliseconds()
			// millisecond  
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

		$.each(data, function(i, contract) {

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
			var t1, t2, t3, t4, template;
			t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex] + "'><label class='inline taskcell'>";
			t2 = "<input type='checkbox' id='" + checkboxId[idIndex] + "'><span class='lbl'><span class='lbl'><a href='" + "/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
			t4 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span id='dName' class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label></li></ul>";

			if (contract.next.title == 0) {
				template = null;
			} else if (!contract.next.invoiceDone && contract.next.price > 0) {
				t3 = "<span style='color:red'>开发票</span>";
				template = t1 + t2 + t3 + t4;
			} else {
				template = t1 + t2 + t4;
			}

			$('#taskToFinish').append(template);

			idIndex++;
			if (idIndex >= 15)
				idIndex = 0;

			var tempIDValue = checkboxId[idIndex - 1];
			var tempID;

			//获取当前插入的代办任务中checkbox的id
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

			var conName = contract.name;
			var undoneLength = contract.undone.length;
			tempID.bind('click',{cname:conName,unLen:undoneLength},function(e) {

				//首先判断该合同是否有过期事件
				var title = tempID.parent().parent().parent().parent().find('#dName').attr('title');
			
				if (e.data.cname == title && (e.data.unLen!= 0)) {
					tempID.click(function() {
						alert("该合同有过期事件未完成,请先完成!!");
						return;
					});
					tempID.prop("checked", false);
					return;
				} else {

					var tID = this.id;
					var dom = document.getElementById(tID);
					var checkValue = dom.checked;
					var remark = null;
					var $taskObj = $(this);

					if (checkValue) {
						bootbox.prompt("提示（备注信息）", function(result) {
							if (result == null) {
								$taskObj.prop("checked", false);
								return;
							}

							isChecked = true;
							checkValue = true;
							remark = result;
							// $taskObj.closest('li').addClass('selected');

							var postData = {
								_id: contract._id,
								id: contract.next.id,
								title: tdata.title,
								completed: checkValue,
								remark: remark
							};
							// console.info(postData);
							console.info(contract.next.id);
							$.ajax({
								url: '/api/tasks/' + contract.next.id,
								type: 'put',
								data: postData,
								error: function() {
									console.info('error');
								},
								success: function(result) {
									console.info("success");
								}
							});
							$taskObj.prop("checked", true);
							parent.location.reload();
						}); <!--bootbox-->
					} <!--if-->
				}
			}); <!--tempID-->
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

		function isBlank() {
			//判断是否有过期任务
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

			var t1, t2, t3, t4, template;

			for (var j = 0; j < contract.undone.length; j++) {

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
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex1] + "'><label id='" + contract.undone[j].id + "'class='inline taskcell'>";
				t2 = "<input type='checkbox' id='" + checkboxId1[idIndex1] + "'><span class='lbl'><span class='lbl'><a href='/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t4 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span><span style='color:red'>*</span></span></label></li></ul>";
				if (!contract.undone[j].invoiceDone) {
					t3 = "<span style='color:red'>开发票</span>";
					template = t1 + t2 + t3 + t4;
				} else
					template = t1 + t2 + t4;

				$('#outOfDate').append(template);

				idIndex1++;
				if (idIndex1 >= 15)
					idIndex1 = 0;

				var tempIDValue = checkboxId1[idIndex1 - 1];
				var tempID;

				//获取当前插入的代办任务中checkbox的id
				if (tempIDValue == 'A')
					tempID = $("#A");
				else if (tempIDValue == 'B')
					tempID = $("#B");
				else if (tempIDValue == 'C')
					tempID = $("#C");
				else if (tempIDValue == 'D')
					tempID = $("#D");
				else if (tempIDValue == 'E')
					tempID = $("#E");
				else if (tempIDValue == 'F')
					tempID = $("#F");
				else if (tempIDValue == 'G')
					tempID = $("#G");
				else if (tempIDValue == 'H')
					tempID = $("#H");
				else if (tempIDValue == 'I')
					tempID = $("#I");
				else if (tempIDValue == 'J')
					tempID = $("#J");
				else if (tempIDValue == 'K')
					tempID = $("#K");
				else if (tempIDValue == 'L')
					tempID = $("#L");
				else if (tempIDValue == 'M')
					tempID = $("#M");
				else if (tempIDValue == 'N')
					tempID = $("#N");
				else if (tempIDValue == 'O')
					tempID = $("#O");
				else if (tempIDValue == 'P')
					tempID = $("#P");

				tempID.click(function() {

					var tID = this.id;
					var dom = document.getElementById(tID);
					var checkValue = dom.checked;
					var remark = null;
					var $taskObj = $(this);

					if (checkValue) {
						bootbox.prompt("提示（备注信息）", function(result) {
							if (result == null) {
								$taskObj.prop("checked", false);
								return;
							}

							isChecked = true;
							checkValue = true;
							remark = result;
							$taskObj.closest('li').addClass('selected');
							var undoneID = $taskObj.parent().attr('id');
							var postData = {
								_id: contract._id,
								id: undoneID,
								title: tdata.title,
								completed: checkValue,
								remark: remark
							};
							// console.info(postData);
							$.ajax({
								url: '/api/tasks/' + undoneID,
								type: 'put',
								data: postData,
								error: function() {
									console.info('error');
								},
								success: function(result) {
									console.info("success");
								}
							});
							$taskObj.prop("checked", true);
							$taskObj.parent().parent().parent().remove();
							parent.location.reload();
							isBlank();
						}); <!--bootbox-->

					} <!--if-->
				}); <!--tempID-->
			}
		}); <!--each-->

		isBlank();
	}); <!--get-->

	//已完成任务
	$.get('/api/dones', function(data, status) {

		$.each(data, function(i, contract) {

			var t1, t2, t3, template;

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
				t1 = "<ul style='height:100%' class='item-list'><li class='" + liColor[idIndex2] + "'><label>";
				t2 = "<span class='lbl'><span class='lbl'><a href='/contracts/" + tdata.id + "/edit' class='lbl' style='color:black'>" + tdata.title;
				t4 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.date + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label></li></ul>";
				// if(contract.done[j].completed && contract.done[j].invoiceDone) {
				// 	t3 = "<span style='color:red'>开发票</span>";
				// 	t4 = "</a></span>&nbsp;&nbsp;<span class='lbl' style='color:silver'>" + tdata.invoiceDate + "</span>&nbsp;&nbsp;<span class='lbl' style='color:silver' title='" + tdata.name + "'>【" + dataName + "】</span></span></label></li></ul>";
				// 	template = t1 + t2 + t3 + t4;
				// } else 
				template = t1 + t2 + t4;
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