// db.createCollection('dishes')
Dishes = new Mongo.Collection('dishes');

Dishes.save = function(name, description, category, amount, unit){
    var params = {
        name: name,
        description: description,
        category: category,
        amount: amount,
        unit: unit
    };
    this.insert(params);
    winston.info("Dishes.save: ", params);
};

Dishes.list = function(){
    var retorno = this.find();
    return retorno;
};