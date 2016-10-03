if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('currentUserData', function () {
     console.log("------------",this.userId);
     return [Meteor.users.find({_id:this.userId}),userClass.find({userId:this.userId})];
  });
  Meteor.publish('doctorsList',function(){
  		return [Meteor.users.find({},{'profile.role':{$in:['doctor']}}),userClass.find({})]
  })
}
