Router.route("/", function () {
    var _id = Meteor.userId();
    this.render("homelanding", {})
    this.layout('blankLayout');
}, {
    name: "home",
    // controller: AdminController,
    fastRender: true
});