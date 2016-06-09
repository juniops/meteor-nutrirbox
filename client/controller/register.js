Controller('register', {
    rendered: function () {
        $('.phone').inputmask({"mask": "(99) 99999-9999"});
    },
    helpers: {
        myHelper: function () {
            // Put something on the template.
        }
    },
    events: {
        'submit form': function (e, template) {
            var userData = organizeDataUser(template, e);
            var id = Accounts.createUser(userData, function (error) {
                if (error) {
                    var msg = "Entre em contato com administrador do sistema!";
                    if (error.reason == 'Email already exists.') {
                        msg = 'E-mail já cadastrado no sistema.'
                    }
                    if (error.reason == 'Email already exists.') {
                        msg = 'Usuário já existe no sistema.'
                    }
                    swal(msg, "", "error")
                } else {
                    Router.go("dashboard1");
                    swal("Usuário criado com sucesso", " Bem Vindo ao Nutrirbox!", "success")
                }
            });
            Roles.setUserRoles(id, [admin]);
        }
    }
});

function organizeDataUser(template, event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();

    var name = $('[name=name]').val();
    var phone = $('[name=phone]').val();
    var dateOfBirth = $('[name=dateOfBirth]').val();
    var gender = $('[name=gender]').val();

    var profile = {name: name, dateOfBirth: dateOfBirth, gender: gender, phone: phone};
    return {
        email: email,
        password: password,
        profile: profile
    };
}