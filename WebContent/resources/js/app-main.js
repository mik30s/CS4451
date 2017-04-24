var Technician = require('./technician');

var main = function(){
	console.log("App started");
	var technician = new Technician("technician-vue-instance");
	var dailyController = new technician.DailyController();
	var weeklyController = new technician.WeeklyController();
};

module.exports = main();
