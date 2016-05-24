Meteor.publish("dishes", function () {
    var user = Meteor.users.findOne({_id: this.userId});
    if (Roles.userIsInRole(user, ["admin", "view-secrets"])) {
        // console.log('publishing users', this.userId)
        return Dishes.list();
    }
    this.stop();
    return;
});


// Authorized users can manage user accounts
Meteor.publish("users", function () {
    var user = Meteor.users.findOne({_id: this.userId});

    if (Roles.userIsInRole(user, ["admin", "manage-users"])) {
        return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
    }

    this.stop();
    return;
});

Meteor.publish("user", function (_id) {
    var user = Meteor.users.findOne({_id: this.userId});
    if (Roles.userIsInRole(user, ["admin", "manage-users",  "view-secrets"])) {
        return Meteor.users.find({_id: _id});
    }
    this.stop();
    return;
});