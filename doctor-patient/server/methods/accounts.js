Meteor.methods({
  sendVerificationLink(id) {
    let userId = Meteor.userId();
    console.log("userId",userId);
    if ( id) {
      return Accounts.sendVerificationEmail( id );
    }
  },
  add_user_to_collection:function(doc){
	  	console.log("------------",doc);
        var storeData = {};
        storeData.profile={};
	  	var result = Accounts.createUser(doc);
	  	console.log("result",result);
	  	
	  	if(doc.email){
	  		storeData.primaryEmailId = doc.email	  	
	  	}
	  	if(doc.username){
	  		storeData.profile.username = doc.username;
	  	}
	  	if(doc.firstname){
	  		storeData.profile.firstname= doc.firstname;
	  	}
	  	if(doc.lastname){
	  		storeData.profile.lastname= doc.lastname;
	  	}
	  	if(doc.gender){
	  		storeData.profile.gender= doc.gender;
	  	}
	  	if(doc.gender){
	  	    storeData.profile.phone= doc.phone;	  		
	  	}
	  	if(doc.role){
	  	    storeData.profile.role= doc.role;	  		
	  	}
	  	console.log("0000000000000000000",result, storeData);
        Meteor.users.update({_id:result},{$set:{'profile':storeData['profile'],'gender':storeData['gender'],'primaryEmailId':storeData.primaryEmailId}});
    }
});