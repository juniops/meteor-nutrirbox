Meteor.methods({
    updateProfile: function (profile) {
        Meteor.users.update(
            {_id: Meteor.userId()},
            {$set: {"profile": profile}}
        );
    },

    updateUser: function (id, userData, roles) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin', 'manage'])) {
            throw new Meteor.Error(403, "Access denied")
        }
        Meteor.users.update(id, {$set: userData });
        Roles.setUserRoles(id, roles);
    },


    updateEmail: function (new_email) {
        var emails = Accounts.findUserByEmail(new_email);

        if(emails == null){
            Meteor.users.update(
                {_id: Meteor.userId()},
                {$set: {"emails": [{address: new_email}]}}
            );
        }else{
            return 'E-mail já cadastrado no sistema';
        }
    },

    saveDish: function (name, description, category, amount, unit, price, _id) {
        if (_id == '') {
            Dishes.save(name, description, category, amount, unit, price);
        } else {
            Dishes.alter(_id, name, description, category, amount, unit, price);
        }
    },
    deleteDish: function (_id) {
        Dishes.delete(_id);
    }
});