// Desktop Router
// =============

'use strict';

// Includes file dependencies
define([
        'jquery',
        'backbone',
        'models/Session',
        'views/Navbar',
        'views/TestView',
        'views/HomeView',
        'views/CreateView'
    ],
    function (
        $,
        Backbone,
        Session,
        Navbar,
        TestView,
        HomeView,
        CreateView) {

        // Extends Backbone.Router
        var MainRouter = Backbone.Router.extend({

            // The Router constructor
            initialize: function () {

                // main-contents views
                this.testView = new TestView({
                    el: '#main-contents'
                });
                var homeView = this.homeView = new HomeView({
                    el: '#main-contents'
                });

                // secondary views (such as dialog-based)
                this.createView = new CreateView({
                    el: '#create-dialog'
                });

                var navbar = new Navbar({
                    el: '#navbar'
                });
                navbar.render();

                Session.fetch({
                    success: function () {
                        // TODO : lookup session state to find where to put the user, depending on the current hash
                        // Shows home view by default on startup
                        homeView.render();
                        Backbone.history.start();
                    }
                });
            },

            // Backbone.js Routes
            routes: {
                '': 'home',
                'test': 'test',
                'create': 'create',
                'search/:query': 'search',
                'join': 'join',
                '*page': '404'
            },

            '404': function (page) {
                this.clearDialogs();
                $('#main-contents').empty().append('<h1>Not found</h1><p>TODO : create a not found view<br/>NOT-TODO : create such an XSS : ' + page + '</p>');
            },

            'test': function () {
                this.clearDialogs();
                this.testView.render();
            },

            'home': function () {
                // TODO : see if user is in a party, otherwise redirect to create
                this.clearDialogs();
                this.homeView.render();
            },

            'create': function () {
                this.createView.show();
            },

            'search': function (query) {
                this.clearDialogs();
                console.log('TODO');
            },

            'join': function () {
                this.clearDialogs();
                console.log('TODO');
                $('#main-contents').empty().append('TODO : handle non-dj users');
            },

            clearDialogs: function () {
                this.createView.hide();
            }

        });

        // Returns the Router class
        return MainRouter;
    });
