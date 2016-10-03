Meteor.startup(function(){
  process.env.MAIL_URL = "smtp://postmaster@sandboxfca6c35d00d54a65a213dbbd619b06e6.mailgun.org:e490b0064bdf4dd9660f9b868de2d493@smtp.googlemail.com:465"	
  toastr.options ={
  	"positionClass": "toast-top-center",
  }	
  if(Meteor.userId()) {
  	Meteor.subscribe('currentUserData')
  }

})

Router.configure({
  // the default layout
  	layoutTemplate: 'mainNav',
    notFoundTemplate:'noFound',
  	onBeforeAction:function(){
      var path = Router.current().route.path()
	   var userDoc = Meteor.users.findOne(Meteor.userId());
    	console.log("-------------------",Meteor.userId());
      var exceptionalRoutesList = ["/signin","/signup","/","/forgotpassword"]
      if( userDoc && !userDoc.emails[0].verified){
      	Router.go('verificationAccount');
      }
      else if(!Meteor.userId() && !_.contains(exceptionalRoutesList,path)){
	  		Router.go('signin');
	  	}
      else if(userDoc && userDoc.profile.role == "doctor" && !userClass.findOne()){
        toastr.info("Doctor user need to fill the below form")
        Router.go('doctorsPage');
      }
	   
      this.next()
    }
});

