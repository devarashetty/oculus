import userClass from '/lib/collections/userClass_collection.js';
var appointmentSchema = new SimpleSchema ({
	doctorId:{
		type:String,
		label:"Doctor Name",
		autoform:{
			type:"select",
		}
	},
	preferredGender:{
		type:'String',
		optional:true,
		autoform:{
			type:'selectize',
			isReactiveOptions:true,
			options:[{label:"Male",value:'male'},{label:"Female",value:"female"}]
		}
	},
	phone:{
		type:SimpleSchema.RegEx.phonenumber,
		optional:true,
		label:"Contact Number"
	},
	patientName:{
		type:String,
		label:"Patient Name"
	},
	patientId:{
		type:SimpleSchema.RegEx.Id,
		label:"",
		autoform:{
			type:"hidden",
		}
	},
	appointmentdate:{
		type:Date,
		label:'Appointment Date',
		autoform:{
			type: "bootstrap-datetimepicker"
		}
	},
});
	
Appointments = new Mongo.Collection('appointment');

Appointments.attachSchema(appointmentSchema);
