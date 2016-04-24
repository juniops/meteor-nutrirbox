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

Router.route("/dish-form", function(){
    this.render("dish-form", {
        data: function(){
            return {
                teste: "teste"
            }
        }
    });
},{
    name: "dish-form",
    fastRender: true
});