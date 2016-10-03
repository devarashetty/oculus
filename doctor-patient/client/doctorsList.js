Router.route('/doctorsList',{
	name:'doctorsList',
	path:'/doctorsList',	
	template:'doctorsList',
	// onBeforeAction:function(){
	// 	console.log("------------------",Meteor.userId());
	// 	Meteor.subscribe("userClass",Meteor.userId())
	// 	var checkUserClass = userClass.findOne({userId:Meteor.userId()});
	// 	if(checkUserClass){
	// 		Router.go('doctorsEditPage');
	// 	}
	// 	this.next();
	// }
});

Template.doctorsList.onRendered(function(){
	$(function() {
		var start = moment().subtract(29, 'days');
	    var end = moment();

	    function cb(start, end) {
	        $('#daterangefilter input').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	    }

	    $('#daterangefilter').daterangepicker({
	        startDate: start,
	        endDate: end,
	        ranges: {
	           'Today': [moment(), moment()],
	           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	           'This Month': [moment().startOf('month'), moment().endOf('month')],
	           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        }
	    }, cb);

	    cb(start, end);
   	})
})

Template.doctorsList.events({
	'click .add_appointment':function(e,t){
		Router.go('appointment')
	}
})