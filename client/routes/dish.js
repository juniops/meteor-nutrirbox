Router.route("/dish", function(){
    var _id = Meteor.userId();
    this.subscribe("dishes").wait();
    this.render("dish",{
        data: function(){
            return {
                dishes: Dishes.list(),
                categories: [
                    {identifier:'carne', name:'CARNE'},
                    {identifier:'acompanhamento', name:'ACOMPANHAMENTO'},
                    {identifier:'salada', name:'SALADA'},
                    {identifier:'suco_composto', name:'SUCOS COMPOSTOS'},
                    {identifier:'suco_simples', name:'SUCOS SIMPLES'},
                    {identifier:'sanduiche', name:'SANDUÍCHES'}
                ]
            }
        }
    });
},{
    name: "dish",
    fastRender: true
});