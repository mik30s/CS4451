var DailyController = require('./dailycontroller');
var WeeklyController = require('./weeklycontroller');
var STZController = require('./stzinductioncontroller');

module.exports = function(mountId) {
	this.initialize = function() {
		var dc = new DailyController();
		var wc = new WeeklyController();
		var stz = new STZController();
	}
	
	return this;
};