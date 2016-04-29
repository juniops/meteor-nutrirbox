Template.navigation.rendered = function(){
    $('#side-menu').metisMenu();
};

Template.navigation.helpers({
    user: function () {
        return Meteor.user();
    }
});


// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }

});