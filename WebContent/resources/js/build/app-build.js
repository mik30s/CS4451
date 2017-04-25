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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Technician = __webpack_require__(0);

var main = function(){
	console.log("App started");
	var technician = new Technician("technician-vue-instance");
	var dailyController = new technician.DailyController();
	var weeklyController = new technician.WeeklyController();
};

module.exports = main();


/***/ })
/******/ ]);