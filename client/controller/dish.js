Controller('dish', {
    rendered: function() {
        $('.money').maskMoney({
            affixesStay:"true",
            thousands:".",
            decimal:","
        });
    },
    events: {
        "submit form": function(e, template){
            e.preventDefault();
            var _id = template.find("input[name=_id]");
            var name = template.find("input[name=name]");
            var description = template.find("textarea[name=description]");
            var category = template.find("select[name=category]");
            var amount = template.find("input[name=amount]");
            var unit = template.find("select[name=unit]");
            var price = template.find("input[name=price]");
            price.value = accounting.unformat(price.value, ',');

            Meteor.call("saveDish", name.value, description.value, category.value, amount.value, unit.value, price.value, _id.value);
            swal("Prato criado com sucesso!", "", "success")

            _id.value = "";
            name.value = "";
            description.value = "";
            category.value = "";
            amount.value = "";
            unit.value = "";
            price.value = "";
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
            template.find("textarea[name=description]").value = this.description;
            template.find("select[name=category]").value = this.category;
            template.find("input[name=amount]").value = this.amount;
            template.find("select[name=unit]").value = this.unit;
            template.find("input[name=price]").value = ( this.price ? this.price : 0 );
        }
    }
});