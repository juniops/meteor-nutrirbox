Template.register.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('.phone').inputmask({"mask": "(99) 99999-9999"});
    }
}

Template.register.events({
    'submit form': function(event){
        createUser(event);
    }
});

Template.topNavbar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
                swal("Erro ao criar usuário", "Entre em contato com administrador do sistema!", "error")
            } else {
                Router.go("dashboard1");
            }
        });
    }
});

Template.manageUsers.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('.phone').inputmask({"mask": "(99) 99999-9999"});
    }
}

Template.manageUsers.events({
    "submit form": function(e, template){
        createUser(event);
    },
    "click .btn-del-dish": function(e, template){
        var _id = this._id;
        swal({
            title: "Deseja apagar este usuário?",
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

function createUser(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();

    var name = $('[name=name]').val();
    var phone = $('[name=phone]').val();
    var dateOfBirth = $('[name=dateOfBirth]').val();
    var gender = $('[name=gender]').val();
    var profile = {name:name, dateOfBirth:dateOfBirth, gender:gender, phone:phone};

    Accounts.createUser({
        username:username,
        email: email,
        password: password,
        profile:profile
    }, function(error){
        if(error){
            var msg = "Entre em contato com administrador do sistema!";
            if(error.reason == 'Email already exists.'){
                msg = 'E-mail já cadastrado no sistema.'
            }
            if(error.reason == 'Email already exists.'){
                msg = 'Usuário já existe no sistema.'
            }
            console.log(error.reason);
            swal(msg, "", "error")
        } else {
            Router.go("dashboard1");
            swal("Usuário criado com sucesso", "Agora você fazer seu pedido!", "success")
        }
    });
}