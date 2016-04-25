Template.dish.events({
    "submit form": function(e, template){
        e.preventDefault();
        var _id = template.find("input[name=_id]");
        var name = template.find("input[name=name]");
        var description = template.find("textarea[name=description]");
        var category = template.find("input[name=category]");
        var amount = template.find("input[name=amount]");
        var unit = template.find("select[name=unit]");
        Meteor.call("saveDish", name.value, description.value, category.value, amount.value, unit.value, _id.value);
        _id.value = "";
        name.value = "";
        description.value = "";
        category.value = "";
        amount.value = "";
        unit.value = "";
    },
    "click .btn-del-dish": function(e, template){
        if(confirm("Deseja apagar este prato?")){
            Meteor.call("deleteDish", this._id);
        }
    },
    "click .btn-edit-dish": function(e, template){
        template.find("input[name=_id]").value = this._id;
        template.find("input[name=name]").value = this.name;
        $("#description").val(this.description);
        template.find("input[name=category]").value = this.category;
        template.find("input[name=amount]").value = this.amount;
        $("#unit").val(this.unit);
    }
});