Template.registerHelper('_id',function(){ return Meteor.userId()});
Template.registerHelper('getUserName',function(id){var doc = Meteor.users.findOne(id);return doc.profile.firstname+" "+doc.profile.lastname });
Template.registerHelper('getUserEmail',function(id){var doc = Meteor.users.findOne(id);console.log("---doc",doc);return doc.emails[0].address });
Template.registerHelper('getUserPhone',function(id){var doc = Meteor.users.findOne(id);return doc.profile.phone });

Router.route('/doctor/appointment/new',{
	name:'appointment',
	path:'doctor/appointment/new',
	template:'addAppointment',	
	onBeforeAction:function(){
		Meteor.subscribe('doctorsList');
		this.next();
	}
})

Router.route('/doctor/appointment/edit/:appointmentId',{
	name:'editAppointment',
	path:'/doctor/appointment/edit/:appointmentId',
	template:'editAppointment'	
})

Router.route('/appointments',{
	name:'appointmentsList',
	path:'/appointments',
	template:'showAppointments',
	onBeforeAction:function (argument) {
		
		var doc = Meteor.users.findOne(Meteor.userId());
		if(doc.profile.role=="doctor")
			Meteor.subscribe('doctorAppointments',Meteor.userId())
		else
			Meteor.subscribe('patientAppointments',Meteor.userId())			
		this.next();
	}
})
Template.addAppointment.onRendered(function(){
	var appointmentOptions = new ReactiveVar([])
})
Template.addAppointment.helpers({
	appointmentOptions:function(){
		var doctorOptions = [];
		var doctorDocs = _.clone(Meteor.users.find({'profile.role':"doctor"}).fetch());
		console.log("doctorDocs",doctorDocs);
		if(doctorDocs.length>0){
			_.each(doctorDocs,function (doc) {
				var output = {};
				output.label = doc.profile.firstname+ " "+doc.profile.lastname;
				output.value = doc._id;
				doctorOptions.push(output);
			})
		}
		return doctorOptions
	},
	isDoctor:function () {
		var doc = Meteor.users.findOne(Meteor.userId());
		if(doc.profile.role=="doctor")
			return true
		return false
	},
})
Template.showAppointments.helpers({
	isDoctor:function () {
		var doc = Meteor.users.findOne(Meteor.userId());
		if(doc.profile.role=="doctor")
			return true
		return false
	},
	appointmentList:function (argument) {
		var appointmentList = Appointments.find({},{sort: {appointmentdate: -1}}).fetch() ;
		console.log("appointmentList",appointmentList);
		return appointmentList;
	},
	timeFormat:function(string){
		return moment(string).format("DD-MM-YYYY hh:mm A");
	}
})


AutoForm.hooks({
	'appointment':{
		onError:function(err,er){
			console.log(err,er);
			toastr.error(err);
		},
		onSuccess:function(){
			toastr.success("appointment has been saved")
			Router.go('/appointments')
		}
	}
})