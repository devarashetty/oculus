
Router.route('/signin',{
   name:'signin',
   path:'/signin',
   template:'signin',
   onBeforeAction:function(){
   	 	if(Meteor.userId()){
   	 	  Router.go('/');
   	 	}
   	    this.next();	
   	}
})

Router.route('/forgotpassword',{
   name:'forgotpassword',
   path:'/forgotpassword',
   template:'forgotpassword',
   // onBeforeAction:function(){
   // 	 	if(Meteor.userId()){
   // 	 	  Router.go('/');
   // 	 	}
   // 	    this.next();	
   // 	}
})

Router.route('/verifyaccount',{
   name:'verificationAccount',
   path:'/verifyaccount',
   template:'verificationAccount',  
})

Router.route('/verify-email/:token',function(){
	console.log(this.params);
	var token = this.params.token;
	Accounts.verifyEmail(token,function(err,res){
		if(err){
			toastr.error(err);
		}
		else{
			toastr.success("Your email has been verified");
			Router.go('/')
		}
	})
})

Template.verificationAccount.events({
	'click #btn-verify':function(e,t){
		var emailId = t.$("#emailInput").val();
		var doc = Meteor.users.findOne({},{'emails.$.address':"marsai493@gmail.com"})
		if(doc._id){
			Meteor.call('sendVerificationLink',function(err,res){
				if(err)
					toastr.error(err);
				else	
					toastr.info("Please check the email account");		
			})
		}
		else
			toastr.error("Please enter the registered account emailId")
	}
})

Template.forgotpassword.events({
	'click #btn-reset':function(e,t){
		var emailId = t.$("#emailInput").val();
	}
})
Template.signin.events({
	'click .signup_link':function(e,t){
		Router.go('/signup')
	},
	'click #btn-login, keypress #loginform':function(e,t){
		if(e.type == "keypress" && e.keyCode != 13)
			return; 

		console.log("e",e);
		var email = $('#login-username').val();
		var password = $("#login-password").val();
		console.log(email,password);
		Meteor.loginWithPassword(email, password, function(err){
		    console.log("You initiated the login process.",err);
		    if(err)
		    	toastr.error(err.reason);
		});
	},
	'click .forgotPassword':function(e,t){
		console.log("00000000000000000000000000000");
		Router.go('/forgotpassword')
	}
})
