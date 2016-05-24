Meteor.methods({
    updateProfile: function (profile) {
        Meteor.users.update(
            {_id: Meteor.userId()},
            {$set: {"profile": profile}}
        );
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