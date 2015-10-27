var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');
var ClassBoxComponent = require('./ClassBoxComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			student:[]
		}
	},
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.fetchBoard();
		});
		this.fetchBoard();
	},
	render: function(){
		var content = this.state.student.map(function(child) {
			return (
				<div key={'childinfo'}>
					<h1>{child.get('firstName')} Star Board</h1>
					<div>Current Points {child.get('points')}</div>
				</div>


			)
		})
		return (
			<div>
				{content}
				<div className="row">
					<ClassBoxComponent studentId={this.props.studentId} subject="Math"/>
					<ClassBoxComponent studentId={this.props.studentId} subject="Science"/>
					<ClassBoxComponent studentId={this.props.studentId} subject="Reading"/>
					<ClassBoxComponent studentId={this.props.studentId} subject="Social Studies"/>
				</div>
			</div>
				

		);
	},
	fetchBoard: function(){
		//set loading
		var query = new Parse.Query(StudentModel);
			query
			.equalTo('objectId', this.props.studentId)
			.find().then(
				(student) => {
					this.setState({student: student});
				},
				(err) => {
					console.log(err);
				}
			)
	}
	
})