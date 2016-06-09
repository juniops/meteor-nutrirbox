Controller('topNavbar', {
    events: {
        'click .logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go('/');
        }
    }
});

Controller('login', {
    events: {
        'submit form': function (event) {
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    console.log(error.reason);
                    swal("Erro ao criar usuário", "Entre em contato com administrador do sistema!", "error")
                } else {
                    Router.go("dashboard1");
                }
            });
        }
    }
});