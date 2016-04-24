Meteor.publish("user", function(_id) {
    return Meteor.users.find({_id: _id});
});

Meteor.publish("dishes", function(){
    return Dishes.list();
});