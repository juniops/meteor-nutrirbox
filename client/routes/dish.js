Router.route("/dish", function(){
    var _id = Meteor.userId();
    this.subscribe("dishes").wait();
    this.render("dish",{
        data: function(){
            return {
                dishes: Dishes.list()
            }
        }
    });
},{
    name: "dish",
    fastRender: true
});