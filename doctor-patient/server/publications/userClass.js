if (Meteor.isServer) {
  Meteor.publish('userClass',function(id){
  	 return userClass.find({userId:id}); 
  });
}
