if (Meteor.isServer) {
  	Meteor.publish('doctorAppointments',function(id){
  		var listOfAppointments = Appointments.find({doctorId:id}).fetch();
  		var patientIds = [];
  		_.each(listOfAppointments,function(a){
  			patientIds.push(a.patientId);
  		})
  		var uniquPatientIds = _.unique(patientIds);
  		return [Appointments.find({doctorId:id}),Meteor.users.find({},{_id:{$in:uniquPatientIds}})] 
  	});
  	Meteor.publish('patientAppointments',function(id){
  		var listOfAppointments = Appointments.find({doctorId:id}).fetch();
  		var doctorIds = [];
  		_.each(listOfAppointments,function(a){
  			doctorIds.push(a.doctorId);
  		})
  		var uniquDoctorIds = _.unique(doctorIds);
  		return [Appointments.find({patientId:id}),Meteor.users.find({},{_id:{$in:uniquDoctorIds}})] 
  	});
}
