Meteor.methods({
    updateProfile: function (name) {
        // console.log( profile.name )

        // Meteor.users.update(Meteor.userId(), {$set: {'profile.isAdmin': true}});

        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $set: {
                    //"profile.phone": profile.phone,
                    // "profile.name": profile.name,
                    "profile.name": name,
                    // "profile.gender": profile.gender,
                    // "profile.age": profile.age
                }
            }
        );
    },

    saveDish: function(name, description, category, amount, unit, _id){
        if(_id == '') {
            Dishes.save(name, description, category, amount, unit);
        } else {
            Dishes.alter(_id, name, description, category, amount, unit);
        }
    },
    deleteDish: function(_id){
        Dishes.delete(_id);
    },
    saveCategory: function(name, identifier, _id){
        if(_id == ''){
            Categories.new(name, identifier);
        } else {
            Categories.alter(_id, name, identifier);
        }
    },
    deleteCategory: function(_id){
        Categories.delete(_id);
    }
});