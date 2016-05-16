Template.profileForm.rendered = function() {
    if(!this._rendered) {
        $('.phone').inputmask({"mask": "(99) 99999-9999"});
    }
}

Template.updatePassword.rendered = function() {

    $('#form-update-password').validate({
        lang: 'pt-BR',
        errorPlacement: function (error, element) { element.before(error); },
        rules: {
            password: {
                required: true,
                minlength: 6
            },
            new_password: {
                required: true,
                minlength: 6
            },
            repeat_password: {
                required: true,
                minlength: 6,
                equalTo: "#new_password"
            }
        }
    });
}

Template.profile.helpers({
    name: function() {return Meteor.user().profile.name},
    email: function() {return Meteor.user().emails[0].address },
});

Template.profileForm.helpers({
    email: function() {console.log(Meteor.user().emails); return Meteor.user().emails[0].address},
    name: function() {return Meteor.user().profile.name},
    phone: function() {return Meteor.user().profile.phone},
    dateOfBirth: function() {return Meteor.user().profile.dateOfBirth},
    genderMale: function() { if('male' ===  Meteor.user().profile.gender ) { return "checked"; }},
    genderFemale: function() { if('female' ===  Meteor.user().profile.gender ) { return "checked"; } }
});