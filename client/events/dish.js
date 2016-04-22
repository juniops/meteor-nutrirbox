Template.dish.events({
    "submit form": function(e, template){
        e.preventDefault();
        var name = template.find("input[name=name]");
        var description = template.find("textarea[name=description]");
        var category = template.find("input[name=category]");
        var amount = template.find("input[name=amount]");
        var unit = template.find("select[name=unit]");
        Meteor.call("saveDish", name.value, description.value, category.value, amount.value, unit.value);
        name.value = "";
        description.value = "";
        category.value = "";
        amount.value = "";
        unit.value = "";
    }
});