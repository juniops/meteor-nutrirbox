Router.route("/dish", function(){
    var _id = Meteor.userId();
    this.subscribe("dishes").wait();
    this.subscribe("categories").wait();
    this.render("dish",{
        data: function(){
            return {
                dishes: Dishes.list(),
                categories: Categories.list()
            }
        }
    });
},{
    name: "dish",
    fastRender: true
});