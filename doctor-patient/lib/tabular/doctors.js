var listOfDays = [
		          	{label: "Mon", value: 'monday'},
		          	{label: "Tue", value: 'tuesday'},
		          	{label: "Wed", value: 'wednesday'},
		          	{label: "Thur", value: 'thursday'},
		          	{label: "Fri", value: 'friday'},
		          	{label: "sat", value: 'saturday'},
		          	{label: "sun", value: 'sunday'},
		        ];

TabularTables = {};
TabularTables.doctors = new Tabular.Table({
  name: "doctorslist",
  collection:userClass,
  pub:'doctorsList',
  columns: [
    {
      data: "userId", 
      title: "Name",
      render:function(val){
        var userDoc = Meteor.users.findOne(val);
        return userDoc.profile.username
      }
    },
    {
      data: "userId", 
      title: "Gender",
      render:function(val){
        var userDoc = Meteor.users.findOne(val);
        return userDoc.profile.gender
      }
    },
    {
      data: "userId", 
      title: "Contact Number",
      render:function(val){
        var userDoc = Meteor.users.findOne(val);
        return userDoc.profile.phone
      }
    },
    {
      data: "availableDays",
      title: "Available Days",
      render: function (val) {
	      console.log("---------------------",val);
	      var array = [];
			  if(val){
  				_.each(val,function(day){
  		      array.push(_.findWhere(listOfDays,{value:day}).label)
  				})
			  }
			return array;
		}
    },
    {	
    	data: "checkInDateTime",
      title: "CheckIn Time",
    	render: function (val) {
        if(val)
        	return moment(val).format("hh:mm A")
		     return 'Not Mentioned';
	    }
    },
    {	
    	data: "checkOutDateTime",
      title: "CheckOut Time",
      render: function (val) {
	      if(val)
	        return moment(val).format("hh:mm A")
			  return 'Not Mentioned';
		  }
    },
    {
    	data: "_id",
    	title: "type",
    	render: function (val) {
        if(val)
			    return val;
	    }
    },
    {	
    	data: "",
      	title: "Make a Appointment",
      	render: function (val) {
	        console.log("---------------------",val);
	        return '<button class="btn add_appointment"> Appointment</button>'
		}
    }
    // {data: "author", title: "Author"},
    // {data: "copies", title: "Copies Available"},
    // {
    //   data: "lastCheckedOut",
    //   title: "Last Checkout",
    //   render: function (val, type, doc) {
    //     if (val instanceof Date) {
    //       return moment(val).calendar();
    //     } else {
    //       return "Never";
    //     }
    //   }
    // },
    // {data: "summary", title: "Summary"},
    // {
    //   tmpl: Meteor.isClient && Template.bookCheckOutCell
    // }
  ]
});