var $ = require('jquery');

module.exports = function(mountId){
	var vueInstance = new Vue({
		
	});
	
	var dailyAMModel = {
		id: "", 
		name: "",
		feedEaten: "",
		feedRefused: "",
	};
	
	$("#am-tab-form").parsley().on('field:validated', function(){
		var ok = $('.parsley-error').length === 0;
		if(ok === true){
			console.log("valid");
		}
		else{
			console.log("not valid");
		}
	}).on('form:submit', function(){
		alert('submiting form are you sure.');
	});

	return vueInstance;
};