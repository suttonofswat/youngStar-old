var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Home</h1>
				<form onSubmit={this.onAddChild}>
						<div className="form-group">
							<label className="col-sm-2 control-label">Childs First Name:</label>
							<div className="col-sm-10">
								<input type="text" ref="firstName" className="form-control" id="inputEmail3" />
							</div>
						</div>
						<div className="row">
							<button>Add youngStar</button>
						</div>
				</form>
			</div>
		);
	},
	onAddChild: function(){
		var newChild = new StudentModel({
			firstName: this.refs.firstName.value,
			parent: Parse.User.current(),
			points: 0
		})
		newChild.save();

	}
	
})