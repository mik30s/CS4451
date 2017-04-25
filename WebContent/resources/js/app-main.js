var Technician = require('./technician');

var main = function(){
	console.log("App started");
	var technician = new Technician("technician-vue-instance");
	technician.initialize();
};

module.exports = main();
