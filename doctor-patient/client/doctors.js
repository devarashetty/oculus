Router.route('/doctor/addDetails',{
	name:'doctorsPage',
	path:'/doctor/addDetails',	
	template:'doctorsTemplate',
	onBeforeAction:function(){
		var doc = Meteor.users.findOne(Meteor.userId());
		var userClassdoc = userClass.findOne({userId:Meteor.userId()})
		console.log("userClassdoc",userClassdoc);
		if(doc.profile.role != "doctor" || userClassdoc)
			Router.go('/')		
		
		this.next();
	}	
});

Router.route('/doctor/editDetails',{
	name:'doctorsEditPage',
	path:'/doctor/editDetails',	
	template:'doctorsEditTemplate',	
	onBeforeAction:function(){
		console.log("------------------",Meteor.userId());
		Meteor.subscribe("userClass",Meteor.userId())
		var checkUserClass = userClass.findOne({userId:Meteor.userId()});
		if(checkUserClass){
			Router.go('doctorsEditPage');
		}
		this.next();
	}
});

export var listOfDays = [
				          {label: "Mon", value: 'monday'},
				          {label: "Tue", value: 'tuesday'},
				          {label: "Wed", value: 'wednesday'},
				          {label: "Thur", value: 'thursday'},
				          {label: "Fri", value: 'friday'},
				          {label: "sat", value: 'saturday'},
				          {label: "sun", value: 'sunday'},
				        ];

export var typeOfDoctors = [
				          {label: "Surgeon", value: 'surgeon'},
				          {label: "Psychiatrists", value: 'psychiatrists'},
				          {label: "Obstetrician", value: 'obstetrician'},
				          {label: "ENT Specialist", value: 'entSpecialist'},
				          {label: "Dentist", value: 'dentist'},
				        ];

export  var  schema = new SimpleSchema({
			'availableDays':{
                type:[String],
                label:"choose Avilable Days",
                autoform: {
			        type: "select-checkbox-inline",
			        options: function () {
				        return listOfDays;
				    }
			    }
            },
			'userId':{
                type:SimpleSchema.RegEx.Id,
    			autoform:{
    				type:'hidden',
    				value:Meteor.userId(),
    			}
            },
			'checkInDateTime':{
                type: Date,
 				label:"Check In Time",
			    autoform: {
			      afFieldInput: {
			        type: "bootstrap-datetimepicker"
			      }
			    }  
			},
			'checkOutDateTime':{
				type: Date,
				label:"Check Out Time",
			    autoform: {
			        type: "bootstrap-datetimepicker"
			    }
			},
			'type':{
				type:String,
				label:"Choose Type",
				autoform:{
					type: "selectize",
				    options: typeOfDoctors,
				    isReactiveOptions:true
				}
			},
			'consultantfee':{
                type:Number,
                label:"Consultant Fee",
            }
		});
Template.doctorsTemplate.onRendered(function(){
	this.$('input[name="checkInDateTime"]').datetimepicker();
	this.$('input[name="checkOutDateTime"]').datetimepicker()
})

Template.doctorsEditTemplate.helpers({
	doc:function(){
		console.log("meowwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
		console.log(userClass.findOne({userId:Meteor.userId()}));
		return userClass.findOne({userId:Meteor.userId()})
	}
})

Template.doctorsTemplate.helpers({
	doctorsSchema:function(){
		return schema;
	}
});
Template.doctorsEditTemplate.helpers({
	doctorsSchema:function(){
		return schema;
	}
})

AutoForm.hooks({
  'create_doctor_form':{
  	onSuccess:function(formType,result){		
  		toastr.success("Your account has been saved");
  		console.log("result",result);
  	}
  },
  'edit_doctor_form':{
  	onSuccess:function(formType,result){
  		toastr.success("Account has been updated")		
  		console.log("result",result);
  	}
  }	
})
