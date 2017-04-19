var vueMultiSelect = require('vue-multiselect');
var $ = require('jquery');
//Vue.use(require('vue-resource'));

//Vue.component(vueMultiSelect);

module.exports = function(mountId){
	var vueInstance = new Vue({
		components: {vueMultiSelect},
		el: "#" + mountId,
		data: {
			greeting: "Hello VueJs!",
			currentSubjectId: '',
			subjectNames: [],
			subjectData: {},
			
		},
		ready: function() {
			$.getJSON('../rest/subject/names', function(data){
				this.subjectNames = data;
				console.log("subject names are: " + this.subjectNames);
			});
			
			console.log("in ready" );
		},
		methods:{
			sendData: function() {
				var self = this;
				id = this.currentSubjectId.split('(');
				console.log(this.currentSubjectId.split('('));
				id = id[1].substring(0, id.length); 
				$.ajax({
			        type: "POST",
			        //the url where you want to sent the userName and password to
			        url: '../rest/subject/'+id+'/update',
			        dataType: 'json',
			        async: true,
			        //json object to sent to the authentication url
			        data: JSON.stringify(this.subjectData),
			        success: function () {
			        	alert("Thanks!"); 
			        }
			    });
			},
			loadData: function() {
				var self = this;
				id = this.currentSubjectId.split('(');
				console.log(this.currentSubjectId.split('('));
				id = id[1].substring(0, id.length); 
				$.getJSON('../rest/subject/'+id, function(data){
					this.subjectData = data;
					console.log(this.subjectData);
					console.log("got "+ self.currentSubjectId +" data");
				});
			}
		}
	});

	return vueInstance;
};