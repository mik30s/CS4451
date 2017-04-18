module.exports = function(mountId){
	var vueInstance = new Vue({
		el: "#" + mountId,
		data: {
			greeting: "Hello VueJs!"
		}
	});

	return vueInstance;
};