Controller('manageUsersForm', {
    rendered: function() {
        if (!this._rendered) {
            this._rendered = true;
            $('.phone').inputmask({"mask": "(99) 99999-9999"});
        }
    },
    events: {
        "submit form": function (e, template) {

            // $("#commentForm").valid();
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();

            var name = $('[name=name]').val();
            var phone = $('[name=phone]').val();
            var dateOfBirth = $('[name=dateOfBirth]').val();
            var gender = $('[name=gender]').val();

            var profile = {name: name, dateOfBirth: dateOfBirth, gender: gender, phone: phone};
            var userData = {
                email: email,
                password: password,
                profile: profile
            };

            var id = template.find("input[name=_id]").value;

            var roles = [];
            if (template.find('input:radio[name=role]:checked')){
                roles = [template.find('input:radio[name=role]:checked').value];
            }

            if (id) {
                Meteor.call("updateUser", id, userData, roles, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        swal("Usuário atualizado com sucesso", "", "success")
                    }
                });
            } else {
                Accounts.createUser(userData, function (error) {
                    if (error) {
                        var msg = "Entre em contato com administrador do sistema!";
                        if (error.reason == 'Email already exists.') {
                            msg = 'E-mail já cadastrado no sistema.'
                        }
                        if (error.reason == 'Email already exists.') {
                            msg = 'Usuário já existe no sistema.'
                        }
                        console.log(error.reason);
                        swal(msg, "", "error")
                    } else {
                        Router.go("dashboard1");
                        swal("Usuário criado com sucesso", "", "success")
                    }
                });
            }
        }
    }
});

Controller('manageUsers', {
    created: function() {
        this.subscribe("users");
    },
    events: {
        "click .btn-del-user": function (e, template) {
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
            }, function (isConfirm) {
                if (isConfirm) {
                    Meteor.call("deleteUser", _id);
                }
            });
        }

        , "click .btn-edit-user": function (e, template) {

            template.find("input[name=_id]").value = this._id;
            template.find("input[name=email]").value = this.emails[0].address;
            template.find("input[name=password]").value = this.password;
            if (this.profile.name) {
                template.find("input[name=name]").value = this.profile.name;
            }
            if (this.profile.phone) {
                template.find("input[name=phone]").value = this.profile.phone;
            }
            if (this.profile.dateOfBirth) {
                template.find("input[name=dateOfBirth]").value = this.profile.dateOfBirth;
            }
            if (this.profile.gender) {
                var $radiosGender = $('input:radio[name=gender]');
                $radiosGender.filter('[value=' + this.profile.gender + ']').prop('checked', true);
            }

            if (this.roles.length > 0) {
                var $radiosRole = $('input:radio[name=role]');

                $radiosRole.filter('[value=' + this.roles[0] + ']').prop('checked', true);
            }
        }
    }
});

Controller('userList', {
    helpers: {
        users: function () {
            return Meteor.users.find()
        },
        email: function () {
            return this.emails[0].address
        },
        roles: function () {
            if (!this.roles) {
                return '<none>'
            }
            return this.roles.join(',')
        }
    },
});
