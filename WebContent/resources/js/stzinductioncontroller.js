var Noty = require('noty');

module.exports =  function(){
	console.log("Daily Controller being constructed");
	var self = this;
	this.subjectData = [];
	$("#stz1-tab-form, #stz2-tab-form, #stz3-tab-form").on('submit', function(e){
		// an invalid form
		if (e.isDefaultPrevented){
			e.preventDefault();
			// everything looks good send data
			// show modal dialog
			//alert("About to send weekly data.");
			//alert("sending data.");
			// ok send data
			self.showDialog("You are about to modify STZ induction records for this day. " +
							"If records don't exist they will be created otherwise previous records will be modified." +
							"After this day you will not be able to modify the record" +
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
				draggable: true,
				action: function(dref) {
					dref.enableButtons(false);
					// let sendData handle the closing
					self.sendData(
						function(resp) {
							var sc = this; // reference to success call back
							// before closing the dialog call growl
							var noty = new Noty({
								text: resp["status"] + ", "+ resp["reason"] ,
								timeout: 2500,
								progressBar: true,
								closeWith: ['click', 'button'],
								//layout: 'topRight',
								theme: 'metroui',
								container: '#notification-holder',
								animation: {
									open: 'animated slideInDown',
									close: 'animated slideOutUp'
								},
								type: 'success'
							}).show();
							dref.close();
						}, 
						function(resp){
							var noty = new Noty({
								text: resp["status"] + ", "+ resp["reason"] ,
								timeout: 2500,
								progressBar: true,
								closeWith: ['click', 'button'],
								//layout: 'topRight',
								theme: 'metroui',
								container: '#notification-holder',
								animation: {
									open: 'animated slideInDown',
									close: 'animated slideOutUp'
								},
								type: 'error'
							}).show();
							dref.close();
						}
					);
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
	
	this.sendData = function(successCallback, errorCallback) {
		var subjectRecord = {}; 
		var _send_data = this;
		
		// initialize node lists
		var nameNodes = $("#stz1-tab-form #stz1-tab-form-table input[type='hidden'][name='name']");
		var idNodes = $("#stz1-tab-form #stz1-tab-form-table input[type='hidden'][name='id']");
		
		var amFeedEatenNodes = $("#stz1-tab-form #stz1-tab-form-table input[name='amFeedEaten']");
		var amFeedRefusedNodes = $("#am-tab-form #am-tab-form-table input[name='amFeedRefused']");
		var amBloodGlucoseLevelPerMeal = $("#am-tab-form #am-tab-form-table input[name='amBloodGlucoseLevelPerMeal']");
		var amBloodGlucoseLevelAfterMeal = $("#am-tab-form #am-tab-form-table input[name='amBloodGlucoseLevelAfterMeal']");
		
		var pmFeedEatenNodes = $("#pm-tab-form #pm-tab-form-table input[name='pmFeedEaten']");
		var pmFeedRefusedNodes = $("#pm-tab-form #pm-tab-form-table input[name='pmFeedRefused']");
		var pmBloodGlucoseLevelPerMeal = $("#pm-tab-form #pm-tab-form-table input[name='pmBloodGlucoseLevelPerMeal']");
		var pmBloodGlucoseLevelAfterMeal = $("#pm-tab-form #pm-tab-form-table input[name='pmBloodGlucoseLevelAfterMeal']");
		
		$(idNodes).each(function(i, node) {
			var subjectRecord = {
					dailyAM:{},
					dailyPM:{},
			};
			// identifiers
			subjectRecord["id"] = $(node).val();
			subjectRecord["name"] = $(nameNodes[i]).val();
			//console.log(JSON.stringify(_send_data.pmNodes));
			// am nodes
			subjectRecord.dailyAM["feedEaten"] = $(amFeedEatenNodes[i]).val();
			subjectRecord.dailyAM["feedRefused"] = $(amFeedRefusedNodes[i]).val();
			subjectRecord.dailyAM["bloodGlucoseLevelPerMeal"] = $(amBloodGlucoseLevelPerMeal[i]).val();
			subjectRecord.dailyAM["bloodGlucoseLevelPostMeal"] = $(amBloodGlucoseLevelAfterMeal[i]).val();
			subjectRecord.dailyAM["period"] = "AM";
			// pm nodes
			subjectRecord.dailyPM["feedEaten"] = $(pmFeedEatenNodes[i]).val();
			subjectRecord.dailyPM["feedRefused"] = $(pmFeedRefusedNodes[i]).val();
			subjectRecord.dailyPM["bloodGlucoseLevelPerMeal"] = $(pmBloodGlucoseLevelPerMeal[i]).val();
			subjectRecord.dailyPM["bloodGlucoseLevelPostMeal"] = $(pmBloodGlucoseLevelAfterMeal[i]).val();
			subjectRecord.dailyPM["period"] = "PM";
			
			self.subjectData.push(subjectRecord);
		});
		
		$.ajax({
			url : "../rest/subject/stzinductions/add",
		    type : "POST",
		    dataType : 'json',
		    contentType : 'application/json; charset=UTF-8',
		    data : JSON.stringify(self.subjectData),
		    success : function(xhresponse) {
	    		console.log(xhresponse);
	    		if(xhresponse["status"] === "Failed") {
		    		//alert("error");
		    		this.error(xhresponse);
		    	}
	    		else {
	    			if(successCallback !== undefined) {
	    				successCallback(xhresponse);
	    			}
	    		}
		    },
		    error: function(xhresponse) {
		    	console.log(xhresponse.status);
		    	// handle error in jquery version 2.2.4
		    	// where error handle is called even on success.
		    	if(xhresponse.status === 200 && xhresponse["status"] === "Success") {
		    		//alert("success");
		    		this.success(xhresponse);
		    	}
		    	else {
		    		// this is truly an error so handle it here.
		    		if(errorCallback !== undefined) {
		    			errorCallback(xhresponse);
		    		}
		    		console.log("update failed.")
		    		//alert("failed");
		    	}
		    }
		});
	}
	
	console.log("Daily Controller done constructing");
	return this;
};
	