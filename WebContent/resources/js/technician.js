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
		var self = this;
		this.subjectData = [];
		console.log("Weekly Controller being constructed");
		$("#weekly-tab-form").on('submit', function(e){
			//alert("Aout to send weekly data.");
			// an invalid form
			if (e.isDefaultPrevented){
				e.preventDefault();
				// everything looks good send data
				// show modal dialog
				alert("About to send weekly data.");
				//alert("sending data.");
				// ok send data
				self.sendData();
				
				// cancel return false;
				setTimeout(() => {
					console.log();
				}, 2000);
				return false;
			}
		});
		
		this.sendData = function() {
			console.log("sending data...");
			var subjectRecord = {}; 
			var iopNodes = $("#weekly-tab-form #weekly-tab-form-table input[name='IOP']");
			var weightNodes = $("#weekly-tab-form #weekly-tab-form-table input[name='weight']");
			var nameNodes = $("#weekly-tab-form #weekly-tab-form-table input[type='hidden'][name='name']");
			var idNodes = $("#weekly-tab-form #weekly-tab-form-table input[type='hidden'][name='id']");
			
			// build objects
			$(idNodes).each(function(i, node) {
				var subjectRecord = {};
				subjectRecord["id"] = $(node).val();
				subjectRecord["name"] = $(nameNodes[i]).val();
				subjectRecord["iop"] = $(iopNodes[i]).val();
				subjectRecord["weight"] = $(weightNodes[i]).val();
//				alert(subjectRecord["id"] +" "+subjectRecord["name"]);
				self.subjectData.push(subjectRecord);
			});
			console.log(self.subjectData);
			
			$.ajax({
				url : "../rest/subject/weekly/add",
			    type : "POST",
			    dataType : 'json',
			    contentType : 'application/json; charset=UTF-8',
			    data : JSON.stringify(self.subjectData),
			    success : function(response) {
		    		console.log(response);
			    },
			    error: function(xhresponse) {
			    	console.log(xhresponse.status);
			    	// handle error in jquery version 2.2.4
			    	// where error handle is called even on success.
			    	if(xhresponse.status === 200) {
			    		alert("success");
			    		this.success(xhresponse);
			    	}
			    	else {
			    		// this is truly an error so handle it here.
			    		alert("failed");
			    	}
			    }
			});
			
			self.subjectData = [];
		}
		console.log("Weekly Controller done constructing");
		return this;
	}
};