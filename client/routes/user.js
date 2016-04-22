Router.route("/user/:_id", function () {
    var _id = this.params._id;
    this.subscribe("user", _id);
    var isFollowing = Friendships.isFollowing(_id);
    Session.set("currentUserId", _id);
    this.render("user", {
        data: function () {
            return {
                user: Meteor.users.findOne({_id: _id}),
            }
        }
    });
}, {
    name: "user",
    fastRender: true
});