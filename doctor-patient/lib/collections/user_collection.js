userSchema = new SimpleSchema({
	'profile':{
		type:Object,
		optional:true,		
	},
	'profile.firstname':{
		type:"String",
		label:"First Name",
		optional:true
	},
	'profile.lastname':{
		type:"String",
		label:"Last Name",
		optional:true
	},
	'profile.username':{
		type:"String",
		label:"First Name",
		optional:true,		
	},
	'email':{
		type:SimpleSchema.RegEx.Email,
		label:"Email",
		optional:true,
	},
	'profile.phone':{
		type:"text",
		optional:true,
	},
	"profile.gender":{
		type:String,
		autoform:{
			type:"select-radio-inline",
			options:[{label:'Male',value:'male'},{label:'Female',value:'female'}]
		},
		optional:true
	},
});
