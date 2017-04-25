/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports) {

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
	

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var DailyController = __webpack_require__(19);
var WeeklyController = __webpack_require__(20);

module.exports = function(mountId) {
	this.initialize = function() {
		var dc = new DailyController();
		var wc = new WeeklyController();
	}
	
	return this;
};

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

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
			return false;
		}
	});
	
	this.sendData = function(callback) {
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
		
		self.subjectData = [];
	}
	console.log("Weekly Controller done constructing");
	return this;
}

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var Technician = __webpack_require__(2);

var main = function(){
	console.log("App started");
	var technician = new Technician("technician-vue-instance");
	technician.initialize();
};

module.exports = main();


/***/ })

/******/ });