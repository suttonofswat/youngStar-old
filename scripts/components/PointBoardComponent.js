var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel');
var ClassBoxComponent = require('./ClassBoxComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			student: null
		}
	},
	componentWillMount: function() {
		this.dispatcher = {};
   		_.extend(this.dispatcher, Backbone.Events);
		this.dispatcher.on('assignmentSubmit', () => {
      	this.forceUpdate();
   	 });
		this.props.router.on('route', () => {
			this.fetchBoard();
		});
		this.fetchBoard();
	},
	render: function(){
		if(!this.state.student){
			return(
					<div>
						Loading..
					</div>
				)
		}else{
			console.log(this.state.student);
			return (
				<div>
					<div>
						<h2 className="col-md-8">{this.state.student.get('firstName')}s Star Board</h2>
						<h3 className="col-md-4"><span className="currentPts">Current Points: {this.state.student.get('points')}</span></h3>
					</div>
					<div className="row col-md-8" id="subjectBoxes">
						<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Math"/>
						<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Science"/>
						<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Reading"/>
						<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Social Studies"/>
					</div>
				</div>
					

			);
		}
	},
	fetchBoard: function(){
		var query = new Parse.Query(StudentModel);
			query.get(this.props.studentId).then(
				(student) => {
					console.log('got student', student);
					this.setState({student: student});
				},
				(err) => {
					console.log(err);
				}
			)
	}
	
})