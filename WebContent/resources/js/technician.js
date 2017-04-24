// load jqeury from page scripts instead.
module.exports = function(mountId){
	 this.DailyController = function(){
		 console.log("Daily Controller being constructed");
		// initialize validator
		$("#am-tab-form").parsley().on('field:validated', function(){
			var ok = $('.parsley-error').length === 0;
			if(ok === true) {
				console.log("valid");
			}
			else{
				console.log("not valid");
			}
		}).on('form:submit', function() {
			alert('submiting form are you sure.');
			return false;
		});
		
		function sendData(){
			
		}
		console.log("Daily Controller done constructing");
		return this;
	};
	
	this.BedCheck = function(){
		// initialize validator
		$("#pm-tab-form").parsley().on('field:validated', function(){
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
		
		function sendData(){
			
		}
	}
};