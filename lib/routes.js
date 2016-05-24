AdminController = RouteController.extend({
    onBeforeAction: function() {
        var loggedInUser = Meteor.userId(),
            isAdminPath = Router.current().url.indexOf('admin') >= 0;

        if (!!loggedInUser) {
            if (Roles.userIsInRole(loggedInUser, 'admin')) {
                if (!isAdminPath) {
                    Router.go('admin');
                    this.stop();
                }
            } else {
                Router.go('account');
                this.stop();
            }
        } else {
            if (isAdminPath) {
                Router.go('login');
                this.stop();
            }
        }
        this.next();
    }
});