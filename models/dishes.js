// db.createCollection('dishes')
Dishes = new Mongo.Collection('dishes');

Dishes.save = function(name, description, category, amount, unit, price){
    var params = {
        name: name,
        description: description,
        category: category,
        amount: amount,
        unit: unit,
        price: price
    };
    this.insert(params);
    winston.info("Dishes.save: ", params);
};

Dishes.delete = function(_id){
    this.remove(_id);
    winston.info("Dishes.delete: ", _id);
};

Dishes.alter = function(_id, name, description, category, amount, unit, price){
    var params = {
        name: name,
        description: description,
        category: category,
        amount: amount,
        unit: unit,
        price: price
    }
    this.update(
        {_id: _id},
        params
    );
};

Dishes.list = function(){
    var retorno = this.find();
    return retorno;
};

Dishes.listById = function(_id){
    return this.find(
        {_id: _id}
    );
}