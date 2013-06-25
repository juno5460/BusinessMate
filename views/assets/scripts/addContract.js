$(function(){

	$('#signPicker').datepicker();
	$('#signPicker').datepicker().on('changeDate',function(env){
	$('#signPicker').datepicker('hide');
	});
	$('#beginPicker').datepicker();
	$('#beginPicker').datepicker().on('changeDate',function(env){
			$('#beginPicker').datepicker('hide');
	});
	$('#endPicker').datepicker();
	$('#endPicker').datepicker().on('changeDate',function(env){
			$('#endPicker').datepicker('hide');
	});

	$("#saveBtn").click(function(){
		var item = buildModel();
		$.post("http://10.108.1.65:3000/contracts",item,function(data,state){

		});
	});

	//获取页面上的数据，并构建一个合同模型
	var buildModel =  function() {
		//从网页中提取已经输入的数据
		var $myId 			= $("#myId").val();
		var $name 			= $("#name").val();
		var $partyA 		= $("#partyA").val();
		var $partyB 		= $("#partyB").val();
		var $signDate 		= $("#signPicker").val();
		var $beginDate 		= $("#beginPicker").val();
		var $endDate 		= $("#endPicker").val();
		var $amount 		= $("#amount").val();
		var $state	 		= $("#state").val();

		var model = {};
		model.myId 		= $myId;
		model.name 		= $name;
		model.partyA 	= $partyA;
		model.partyB 	= $partyB;
		model.signDate 	= $signDate;
		model.beginDate = $beginDate;
		model.endDate 	= $endDate;
		model.amount 	= $amount;
		model.state 	= $state;

		return model;
	}

});

