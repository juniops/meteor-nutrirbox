Template.register.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        console.log('Template onLoad')
        $('.phone').inputmask({"mask": "(99) 9999-9999"});
    }
}

Template.register.events({
    'submit form': function(event){

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
                console.log(error.reason); // Output error if registration fails
                swal("Erro ao criar usuário", "Entre em contato com administrador do sistema!", "error")
            } else {
                Router.go("dashboard1"); // Redirect user if registration succeeds
                swal("Usuário criado com sucesso", "Agora você fazer seu pedido!", "success")
            }
        });

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
