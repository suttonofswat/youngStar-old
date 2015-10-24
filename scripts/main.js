'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
require('react-bootstrap');

var NavigationComponent = require('./components/NavigationComponent');

Parse.initialize(
	's8ymxzLxffDiYnjpMiXv6WMSebgMvt3FFwWoiBNK',
	'zI8sNxFoFKso2OgRpwXiviI9qmuP3vu4x9X0vRDG'
);

var Router = Backbone.Router.extend({

});
var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);

