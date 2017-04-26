var Noty = require('noty');

module.exports = function() {
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
			//alert("About to send weekly data.");
			//alert("sending data.");
			// ok send data
			BootstrapDialog.show({
				title: 'Confirm Action',
				message: 'You are about to update records. \
						  Click to confirm or cancel',
				buttons:[{
					label: 'Confirm',
					cssClass: 'btn-success',
					autospin: true,
					action: function(dref) {
						dref.enableButtons(false);
						// let sendData handle the closing
						// let sendData handle the closing
						self.sendData(function(resp) {
							// before closing the dialog call growl
							var noty = new Noty({
								text: resp["status"] +" "+ resp["reason"],
								timeout: 2500,
								progressBar: true,
								closeWith: ['click', 'button'],
								layout: 'topRight',
								theme: 'metroui',
								container: '#notification-holder',
								animation: {
									open: 'animated slideInDown',
									close: 'animated slideOutUp'
								},
								type: 'success'
							}).show();
							dref.close();
						}, function(resp){
							var noty = new Noty({
								text:resp["status"] +" "+ resp["reason"],
								timeout: 2500,
								progressBar: true,
								closeWith: ['click', 'button'],
								layout: 'topRight',
								theme: 'metroui',
								container: '#notification-holder',
								animation: {
									open: 'animated slideInDown',
									close: 'animated slideOutUp'
								},
								type: 'error'
							}).show();
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
			return false;
		}
	});
	
	this.sendData = function(successCallback, errorCallback) {
		console.log("sending data...");
		var _send_data_self = this;
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
		
		self.subjectData = [];
	}
	console.log("Weekly Controller done constructing");
	return this;
}