Accounts.onCreateUser(function (options, user) {
    if (user.services.facebook) {
        var facebook = user.services.facebook;
        user['profile'] = {
            name: facebook.name
        };
    } else {
        user['profile'] = options.profile;
    }
    return user;
});

/*
 Accounts.validateNewUser(function (user) {
 var loggedInUser = Meteor.user();

 if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
 return true;
 }

 throw new Meteor.Error(403, "Not authorized to create new users");
 });
 */