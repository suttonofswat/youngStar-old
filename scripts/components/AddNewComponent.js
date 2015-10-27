var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');


module.exports = React.createClass({
	// getInitialState: function() {
	// 	return{
	// 		id: this.props.id,

	// 	}
	// },
	// componentWillMount: function() {
	// 	var query = new Parse.Query(StudentModel);
	// 		query
	// 		.equalTo('objectId', this.state.id)
	// 		.find().then(
	// 			(student) => {
	// 				this.setState({student: student});
	// 				console.log(this.state.id)
	// 			},
	// 			(err) => {
	// 				console.log(err);
	// 			}
	// 		)
			
	// },
	render: function(){
		return (
			<div>
				<h1></h1>
			</div>

		);
	}
	
})