Meteor.methods({
    profileUpdate: function (name, about) {
        Meteor.users.update(
            {_id: this.userId},
            {
                $set: {
                    "profile.name": name,
                    "profile.about": about
                }
            }
        );
        Posts.update(
            {userId: this.userId},
            {
                $set: {
                    name: name
                }
            },
            {multi: true}
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