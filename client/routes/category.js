Router.route("/category", function(){
    this.subscribe("categories").wait();
    this.render("category",{
        data: function(){
            return {
                categories: Categories.list()
            }
        }
    });
},{
    name: "category",
    fastRender: true
});