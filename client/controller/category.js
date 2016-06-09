Controller('category', {
    events: {
        "submit form": function (e, template) {
            e.preventDefault();
            var _id = $("#_id").val();
            var name = $("#name").val();
            var identifier = $("#identifier").val();
            Meteor.call("saveCategory", name, identifier, _id);
            $("#_id").val("");
            $("#name").val("");
            $("#identifier").val("");
        },
        "click .btn-del-category": function (e, template) {
            var _id = this._id;
            swal({
                title: "Deseja apagar esta categoria?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    Meteor.call("deleteCategory", _id);
                }
            });
        },
        "click .btn-edit-category": function (e, template) {
            $("#_id").val(this._id);
            $("#name").val(this.name);
            $("#identifier").val(this.identifier);
        }
    }
});