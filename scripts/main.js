'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
require('bootstrap');

var app = document.getElementById('app');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var HomeComponent = require('./components/HomeComponent');
var RegisterComponent = require('./components/RegisterComponent');
// var StudentModel = require('./models/StudentModel');
var PointBoardComponent = require('./components/PointBoardComponent');
var ClassBoxComponent = require('./components/ClassBoxComponent');

Parse.initialize(
	's8ymxzLxffDiYnjpMiXv6WMSebgMvt3FFwWoiBNK',
	'zI8sNxFoFKso2OgRpwXiviI9qmuP3vu4x9X0vRDG'
);

var Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'login' : 'login',
		'register': 'register',
		'pointBoard/:id': 'pointBoard'
	},
	home: function() {
		ReactDOM.render(<HomeComponent />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	pointBoard: function(id) {
		ReactDOM.render(
			<PointBoardComponent studentId={id} router={r} />,
			app
		);
	},
	login: function() {
		if(Parse.User.current()) {
			this.navigate('', {trigger: true});
		}
		else {
			ReactDOM.render(
				<LoginComponent router={r} />,
				app
			);
		}
	}
})
var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);

