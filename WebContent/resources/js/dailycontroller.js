module.exports =  function(){
	console.log("Daily Controller being constructed");
	var self = this;
	this.subjectData = [];
	$("#am-tab-form, #pm-tab-form, #bed-check-tab-form").on('submit', function(e){
		// an invalid form
		if (e.isDefaultPrevented){
			e.preventDefault();
			// everything looks good send data
			// show modal dialog
			//alert("About to send weekly data.");
			//alert("sending data.");
			// ok send data
			self.showDialog("You are about to modify records for this day. " +
							"If records don't exist they will be created otherwise previous records will be modified." +
							"Click to confirm or cancel.");
			return false;
		}
	});
	
	this.showDialog = function(msg){
		BootstrapDialog.show({
			title: 'Confirm Action',
			message: msg,
			buttons:[{
				label: 'Confirm',
				cssClass: 'btn-success',
				autospin: true,
				action: function(dref) {
					dref.enableButtons(false);
					// let sendData handle the closing
					self.sendData(function() {
						// before closing the dialog call growl
						$('.backdrop').notify("Record for this week was successfully added.", "success");
						dref.close();
					});
				}
			},{
				label: 'Cancel',
				cssClass: 'btn btn-default',
				action: function(dref){
					dref.close();
				}
			}]
		});
	}
	
	this.sendData = function(){
		var subjectRecord = {}; 
		
		// initialize node lists
		var nameNodes = $("#am-tab-form #am-tab-form-table input[type='hidden'][name='name']"),
		    idNodes = $("#am-tab-form #am-tab-form-table input[type='hidden'][name='id']");
		
		var amNodes = {
			feedEatenNodes : $("#am-tab-form #am-tab-form-table input[name='IOP']"),
			feedRefusedNodes : $("#am-tab-form #am-tab-form-table input[name='weight']"),
			bloodGlucoseLevelPerMeal : $("#am-tab-form #am-tab-form-table input[name='bloodGlucoseLevelPerMeal']"),
			bloodGlucoseLevelAfterMeal : $("#am-tab-form #am-tab-form-table input[name='bloodGlucoseLevelAfterMeal']"),
		}
		
		var pmNodes = {
			feedEatenNodes : $("#pm-tab-form #pm-tab-form-table input[name='IOP']"),
			feedRefusedNodes : $("#pm-tab-form #pm-tab-form-table input[name='weight']"),
			bloodGlucoseLevelPerMeal : $("#pm-tab-form #pm-tab-form-table input[name='bloodGlucoseLevelPerMeal']"),
			bloodGlucoseLevelAfterMeal : $("#pm-tab-form #pm-tab-form-table input[name='bloodGlucoseLevelAfterMeal']"),
		}
		
		$(idNodes).each(function(i, node) {
			var subjectRecord = {
					"dailyAm":{},
					"dailyPM":{},
			};
			// identifiers
			subjectRecord["id"] = $(node).val();
			subjectRecord["name"] = $(nameNodes[i]).val();
			// am nodes
			subjectRecord.dailyAM["feedEaten"] = $(amNodes.feedEatenNodes[i]).val();
			subjectRecord.dailyAM["feedRefused"] = $(amNodes.feedRefusedNodes[i]).val();
			subjectRecord.dailyAM["bloodGlucoseLevelPerMeal"] = $(amNodes.bloodGlucoseLevelPerMeal[i]).val();
			subjectRecord.dailyAM["bloodGlucoseLevelAfterMeal"] = $(amNodes.bloodGlucoseLevelAfterMeal[i]).val();
			// pm nodes
			subjectRecord.dailyPM["feedEaten"] = $(pmNodes.feedEatenNodes[i]).val();
			subjectRecord.dailyPM["feedRefused"] = $(pmNodes.feedRefusedNodes[i]).val();
			subjectRecord.dailyPM["bloodGlucoseLevelPerMeal"] = $(pmNodes.bloodGlucoseLevelPerMeal[i]).val();
			subjectRecord.dailyPM["bloodGlucoseLevelAfterMeal"] = $(pmNodes.bloodGlucoseLevelAfterMeal[i]).val();
			
			self.subjectData.push(subjectRecord);
		});
		
		$.ajax({
			url : "../rest/subject/daily/add",
		    type : "POST",
		    dataType : 'json',
		    contentType : 'application/json; charset=UTF-8',
		    data : JSON.stringify(self.subjectData),
		    success : function(response) {
	    		console.log(response);
	    		if (callback !== undefined) {
	    			callback();
	    		}
		    },
		    error: function(xhresponse) {
		    	console.log(xhresponse.status);
		    	// handle error in jquery version 2.2.4
		    	// where error handle is called even on success.
		    	if(xhresponse.status === 200) {
		    		//alert("success");
		    		this.success(xhresponse);
		    	}
		    	else {
		    		// this is truly an error so handle it here.
		    		alert("failed");
		    	}
		    }
		});
	}
	
	console.log("Daily Controller done constructing");
	return this;
};
	