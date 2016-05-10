Router.route('/profile', function () {
    var _id = Meteor.userId();
    this.render('profile');
},{
    name: "profile",
    fastRender: true
});

Template.profile.helpers({
    name: function() {return Meteor.user().profile.name},
});

Template.profileForm.helpers({
    email: function() {console.log(Meteor.user().emails); return Meteor.user().emails[0].address},
    name: function() {return Meteor.user().profile.name},
    phone: function() {return Meteor.user().profile.phone},
    dateOfBirth: function() {return Meteor.user().profile.dateOfBirth},
    genderMale: function() { if('male' ===  Meteor.user().profile.gender ) { return "checked"; }},
    genderFemale: function() { if('female' ===  Meteor.user().profile.gender ) { return "checked"; } }
});

Template.profileForm.events({

    "submit #form-profile": function (e, template) {
        e.preventDefault();

        var name = template.find("input[name=name]").value;
        var _email = template.find("input[name=email]").value;
        var dateOfBirth = template.find("input[name=dateOfBirth]").value;
        var gender = template.find("input[name=gender]:checked").value;
        var phone = template.find("input[name=phone]").value;
        var profile = {name:name, dateOfBirth:dateOfBirth, gender:gender, phone:phone};
        var email = { "address" : _email , "verified" : false};

        Meteor.call("updateProfile", profile, email, function(error){
            console.log(error);
            if(error){
                console.log(error.reason); // Output error if registration fails
                swal("Erro ao criar usuário", "Entre em contato com administrador do sistema!", "error")
            } else {
                Router.go("profile"); // Redirect user if registration succeeds
                swal("Usuário criado com sucesso", "Agora você fazer seu pedido!", "success")
            }
        });
    }
});