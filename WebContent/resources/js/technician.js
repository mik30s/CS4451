// load jqeury from page scripts instead.
module.exports = function(mountId){
	 this.DailyController = function(){
		console.log("Daily Controller being constructed");
		$("#am-tab-form").on('submit', function(e){
			// an invalid form
			if (e.isDefaultPrevented){
				
			}
			else {
				// everything looks good send data
			}
		});
		
		
		function sendData(){
			
		}
		
		console.log("Daily Controller done constructing");
		return this;
	};
	
	this.WeeklyController = function() {
		console.log("Weekly Controller being constructed");
		$("#weekly-tab-form").on('submit', function(e){
			alert("Aout to send weekly data.");
			// an invalid form
			if (e.isDefaultPrevented){
				
			}
			else {
				// everything looks good send data
				// show modal dialog
				alert("About to send weekly data.");
				console.log("sending data.");
				// ok send data
				sendData();
				
				// cancel return false;
				setTimeout(() => {
					console.log();
				}, 2000);
				return false;
			}
		});
		
		function sendData() {
			var subjectData = [];
			var subjectRecord = {}; 
			var iopNodes = $("#weekly-tab-form\\:weekly-tab-form-table input[type='text'][name='IOP']");
			var weightNodes = $("#weekly-tab-form\\:weekly-tab-form-table input[type='text'][name='weight']");
			var nameNodes = $("#weekly-tab-form\\:weekly-tab-form-table input[type='hidden'][name='name']");
			var idNodes = $("#weekly-tab-form\\:weekly-tab-form-table input[type='hidden'][name='id']");

			// build objects
			idNodes.forEach(function(id, i, arr) {
				subjectRecord["id"] = id;
				subjectRecord["iopNodes"] = $(iopNodes[i]).val(); 
			});
			
			console.log(iopNodes);
		}
		console.log("Weekly Controller done constructing");
		return this;
	}
};