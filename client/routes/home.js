Router.route("/", function () {
    var _id = Meteor.userId();
    this.render("home", {
    });
}, {
    name: "home",
    fastRender: true
});