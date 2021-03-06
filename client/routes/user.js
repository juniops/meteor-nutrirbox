Router.route('/login', function () {
    this.render('login');
    this.layout('blankLayout')
}, {
    name: 'login',
    // controller: AdminController
});

Router.route('/forgotPassword', function () {
    this.render('forgotPassword');
    this.layout('blankLayout')
});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout')
});

Router.route('/updatePassword', function () {
    this.render('updatePassword');
});

Router.route('/updateEmail', function () {
    this.render('updateEmail');
});

Router.route('/profile', function () {
    this.render('profile');
}, {
    name: "profile",
    fastRender: true
});

Router.route('/manageUsers', function () {
    this.render('manageUsers');
}, {
    name: "manageUsers",
    fastRender: true
});

