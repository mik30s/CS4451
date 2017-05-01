var Noty = require('noty');

module.exports = function(){
	var self = this;
	$('#').on('click', function(){
		var email = $();
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
	});
	
	this.deleteUser = function(userEmail){
		$.ajax({url : "../rest/admin/delete/"+userEmail,
		    type : "POST",
		    dataType : 'json',
		    contentType : 'application/json; charset=UTF-8',
		    data : JSON.stringify(self.subjectData),
		    success : function(xhresponse) {
		    	
		    },
		    
		});
	}
	
	this.editUser = function(userEmail) {
		// show user dialog
		// confirm edit and cancel.
	}
}