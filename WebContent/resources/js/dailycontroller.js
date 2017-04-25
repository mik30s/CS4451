module.exports =  function(){
	console.log("Daily Controller being constructed");
	var self = this;
	$("#am-tab-form, #pm-tab-form").on('submit', function(e){
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
		var iopNodes = $("#am-tab-form #am-tab-form-table input[name='IOP']");
		var weightNodes = $("#weekly-tab-form #weekly-tab-form-table input[name='weight']");
		var nameNodes = $("#am-tab-form #am-tab-form-table input[type='hidden'][name='name']");
		var idNodes = $("#am-tab-form #am-tab-form-table input[type='hidden'][name='id']");
	}
	
	console.log("Daily Controller done constructing");
	return this;
};
	