Template.dish.events({
    "submit form": function(e, template){
        e.preventDefault();
        var _id = template.find("input[name=_id]");
        var name = template.find("input[name=name]");
        var description = template.find("textarea[name=description]");
        var category = Categories.find({identifier: $("#category").val()}).fetch();
        var amount = template.find("input[name=amount]");
        var unit = template.find("select[name=unit]");
        Meteor.call("saveDish", name.value, description.value, category, amount.value, unit.value, _id.value);
        _id.value = "";
        name.value = "";
        description.value = "";
        $("#category").val("");
        amount.value = "";
        unit.value = "";
    },
    "click .btn-del-dish": function(e, template){
        var _id = this._id;
        swal({
            title: "Deseja apagar este prato?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm){
            if(isConfirm){
                Meteor.call("deleteDish", _id);
            }
        });
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