Template.register.events({
    'submit form': function(event){

        event.preventDefault();
        var email = $('[name=email]').val();
        var name = $('[name=name]').val();
        var password = $('[name=password]').val();

        Accounts.createUser({
            username:name,
            email: email,
            password: password,
            profile: 'guest'
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
