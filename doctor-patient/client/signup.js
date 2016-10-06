SimpleSchema.RegEx.phonenumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
Router.route('/signup',{
   name:'signup',
   path:'/signup',
   template:'signup',
   onAfterAction:function(){
   	console.log("Meteor.userId",Meteor.userId())
   	if(Meteor.userId()){
   	 	Router.go('/')
    }
   }
})

Router.route('/verify-email/:tokenId',{
    name:'signupVerification',
    path:'/verify-email/:tokenId',
    template:'signupVerification',
    action:function(){
      //   Accounts.verifyEmail( params.token, ( error ) =>{
      //       if ( error ) {
      //           toastr.error( error.reason, 'danger' );
		    // } else {
		    //     Router.route( '/' );
		    //     toastr.success( 'Email verified! Thanks!', 'success' );
		    // }
      //   });  
    }
})

Template.signup.events({
	'click #signinlink':function(){
		Router.go('/signin')
	},
	'click .submit_user_signup_form' :function( event, template ) {
	   var formValues = template.$("#signupform").serializeArray();
	   var email = template.$("#signupform input[name='email']").val();
	   var password = template.$("#signupform input[name='password']").val();
	   var obj = {};
	   _.each(formValues,function(a){obj[a.name]= a.value});
        
	    Meteor.call('add_user_to_collection',obj,function(error,response){
	   		if(error){
              toastr.error(error.reason)
	   		}
	   		else{
	   			toastr.success("User profile saved ");
	   			 Meteor.loginWithPassword(email, password);
	   			 Router.go('signupVerification');
	   		}
	    })
	}
});
Template.signup.helpers({
	
})

AutoForm.hooks({
  'signupform':{
  	onSuccess:function(formType,result){
  		console.log("doc",result);
  		Router.go('signupVerification');
  		Meteor.call( 'sendVerificationLink',	 ( error, response ) => {
	        if ( error ) {
	        	toastr.error( error, 'danger' );
	        } else {
	            toastr.success( 'Welcome!', 'success' );
	        }
	    });
  	},
  	onSubmit:function(doc){
  		console.log("------------------doc",doc);
  	},
  	onError: function(formType, error) {
  		toastr.error(error)
  	},

  }	
})



Router.route('/profile',{
	name:"userProfile",
	template:"userProfile",
	path:'/profile'
})

Template.userProfile.helpers({
	doc:function(){
		var doc = Meteor.users.findOne({_id:Meteor.userId()})
		
		if(doc.profile.roles == "doctor")
			doc.userClass = userClass.findOne({userId:Meteor.userId()})
		console.log("doc",doc);
		return doc;
	}
})

Router.route('/edit/profile/:userId',{
	name:'editProfileForm',
	template:"editProfile",
	path:'/edit/profile/:userId',
	onBeforeAction:function(){
		console.log(this.params);
		this.next()
	}
})

Template.userProfile.events({
	'click .glyphicon.glyphicon-edit':function(){
		console.log("00000000000000000000000000");
		Router.go('/edit/profile/'+Meteor.userId());
	}	
})
Template.editProfile.helpers({
	doc:function(){
		return Meteor.users.findOne(Meteor.userId())
	},
	usersSchema:function(){
		return 	new SimpleSchema({
			'profile':{
				type:Object,		
			},
			'profile.firstname':{
				type:"String",
				label:"First Name",
				optional:true
			},
			'profile.lastname':{
				type:"String",
				label:"Last Name",
			},
			'profile.username':{
				type:"String",
				label:"First Name",
				optional:true,		
			},
			'primaryEmailId':{
				type:SimpleSchema.RegEx.Email,
				label:"Email Address"
			},
			'profile.phone':{
				type:SimpleSchema.RegEx.phonenumber
			},
			'profile.address':{
				type:"text",

			},
			"profile.gender":{
				type:String,
				autoform:{
					type:"select-radio-inline",
					options:[{label:'Male',value:'male'},{label:'Female',value:'female'}]
				}
			},
		});	
	}
})

