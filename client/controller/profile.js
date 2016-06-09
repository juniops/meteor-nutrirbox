Controller('profileForm', {
    events: {
        "submit #form-profile": function (e, template) {
            e.preventDefault();

            var name = template.find("input[name=name]").value;
            var dateOfBirth = template.find("input[name=dateOfBirth]").value;
            var gender = template.find("input[name=gender]:checked").value;
            var phone = template.find("input[name=phone]").value;

            var profile = {name: name, dateOfBirth: dateOfBirth, gender: gender, phone: phone};

            Meteor.call("updateProfile", profile, function (error) {
                if (error) {
                    console.log(error.reason);
                    swal("Erro ao atualizar perfil", "Entre em contato com administrador do sistema!", "error")
                } else {
                    Router.go("profile");
                    swal("Perfil atualizado com sucesso", "", "success")
                }
            });
        }
    }
});

Controller('updatePassword', {
    events: {
        "submit #form-update-password": function (e, template) {
            e.preventDefault();

            var old_password = template.find("input[name=password]").value;
            var new_password = template.find("input[name=new_password]").value;

            Accounts.changePassword(old_password, new_password, function (error) {
                if (error) {
                    var msg = "Entre em contato com administrador do sistema!";
                    if (error.reason == 'Incorrect password') {
                        msg = 'Senha incorreta';
                    }
                    swal("Erro ao criar usuário", msg, "error")
                } else {
                    Router.go("profile");
                    swal("Senha atualizada com sucesso", "", "success")
                }
            });
        }
    }
});

Controller('updateEmail', {
    events: {
        "submit #form-update-email": function (e, template) {
            e.preventDefault();
            var new_email = template.find("input[name=new_email]").value;
            Meteor.call("updateEmail", new_email, function (error, result) {
                if (result) {
                    swal(result, '', "error")
                } else if (error) {
                    swal("Erro ao atualizar perfil", "Entre em contato com administrador do sistema!", "error")
                } else {
                    Router.go("profile");
                    swal("Perfil atualizado com sucesso", "", "success")
                }
            });
        }
    }
});