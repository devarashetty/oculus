Template.mainNav.helpers({
	user:function(id){
		return Meteor.users.findOne(id);
	},
	'isHome':function(){
		console.log(Router.current().route.path());
		return Router.current().route.path() == "/"
	}
})
Router.route('/',{
   path:'/',
   template:'homepage'
})
Template.mainNav.helpers({

})
Template.mainNav.events({
	'click .entry_signUp':function(e,t){
	   Router.go('signup')		
	},
	'click .entry_signIn':function(e,t){
	    Router.go('signin')		
	},
	'click .closebtn':function(e,t){
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
    	document.body.style.backgroundColor = "white";
	},
	'click .openbtn':function(e,t){
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
	    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	},
	'click .logout_user':function(e,t){
		Meteor.logout();
		Router.go('signin')
	}
})