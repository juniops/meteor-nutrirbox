//db.createCollection('categories')
Categories = new Mongo.Collection('categories');

Categories.new = function(name, identifier){
    var params = {
        name: name,
        identifier: identifier
    }
    this.insert(params);
    winston.info("Categories.new: ", params);
};

Categories.alter = function(_id, name, identifier){
    var params = {
        name: name,
        identifier: identifier
    }
    this.update(
        {_id: _id},
        params
    );
    winston.info("Categories.alter: ", params);
};

Categories.delete = function(_id){
    this.remove(_id);
    winston.info("Categories.delete: ", _id);
};

Categories.list = function(){
    return this.find();
};