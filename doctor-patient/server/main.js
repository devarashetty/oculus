import { Meteor } from 'meteor/meteor';
Meteor.settings.email = {};
Meteor.settings.email.port = 587;
Meteor.settings.email.username = "marsai493@gmail.com";
Meteor.settings.email.password = "swhspkbzjmeoitgc";
Meteor.settings.email.host = "smtp.gmail.com";
process.env.MAIL_URL = "smtp://" + Meteor.settings.email.username + ':' + Meteor.settings.email.password + '@' + Meteor.settings.email.host + ':' + Meteor.settings.email.port

Meteor.startup(() => {
  // code to run on server at startup
});
