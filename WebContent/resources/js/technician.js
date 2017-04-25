var DailyController = require('./dailycontroller');
var WeeklyController = require('./weeklycontroller');

module.exports = function(mountId) {
	this.initialize = function() {
		var dc = new DailyController();
		var wc = new WeeklyController();
	}
	
	return this;
};