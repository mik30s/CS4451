var vueUI = require('vue-ui');
var $ = require('jquery');
//Vue.use(require('vue-resource'));

module.exports = function(mountId){
	var vueInstance = new Vue({
		el: "#" + mountId,
		data: {
			greeting: "Hello VueJs!",
			subjectNames: [],
		},
		ready: function() {
			$.getJSON('../rest/subject/names', function(data){
				this.$set("subjectNames", ["hint"]);
			});
			
			console.log("in ready" + this.$get("subjectNames"));
		},
		methods:{
			sendData: function(subjectName) {
				
			},
			loadData: function(subjectName){
				
			}
		}
	});

	return vueInstance;
};