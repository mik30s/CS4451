var vueUI = require('vue-ui');

module.exports = function(mountId){
	var vueInstance = new Vue({
		el: "#" + mountId,
		data: {
			greeting: "Hello VueJs!"
		},
		methods:{
			loadData: function(){

			}
		}
	});

	return vueInstance;
};