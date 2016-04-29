Router.route('/profile', function () {
    var _id = Meteor.userId();

    this.render('profile');
},{
    name: "profile",
    fastRender: true
});

Template.profile.helpers({
    editProfile: function () {
        return Session.get("editProfile");
    }
});

Template.profileForm.events({

    "submit #form-profile": function (e, template) {
        e.preventDefault();

        var name = template.find("input[name=name]").value;
        var email = template.find("input[name=email]").value;
        var age = template.find("input[name=age]").value;
        var gender = template.find("input[name=gender]").value;
        var phone = template.find("input[name=phone]").value;
        var profile = {name:name, age:age, gender:gender, phone:phone};

        Meteor.call("updateProfile", name, function(error){
            console.log(error);
            if(error){
                console.log(error.reason); // Output error if registration fails
                swal("Erro ao criar usuário", "Entre em contato com administrador do sistema!", "error")
            } else {
                Router.go("dashboard1"); // Redirect user if registration succeeds
                swal("Usuário criado com sucesso", "Agora você fazer seu pedido!", "success")
            }
        });

        // Accounts.addEmail(Meteor.userId(), email, false);
    }
});