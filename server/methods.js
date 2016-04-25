Meteor.methods({
    followUser: function (friendId) {
        Friendships.follow(friendId);
    },
    unfollowUser: function (friendId) {
        Friendships.unfollow(friendId);
    },
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
    publishPost: function (message, name) {
        Posts.publish(message, name);
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
    }
});