var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel');
var ClassBoxComponent = require('./ClassBoxComponent');
var RedeemBoxComponent = require('./RedeemBoxComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			student: null
		}
	},
	componentWillMount: function() {
	//once new grade is added, dispatcher will update the grade automatically without a refresh
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
		//checking to make sure the student and subject has loaded.
		if(!this.state.student){
			return(
					<div>
						Loading..
					</div>
				)
		}else{
		//passing through information about the student and subject to the classboxcomponent.
			console.log(this.state.student);
			return (
				<div>
					<div>
						<h2 className="col-md-8">{this.state.student.get('firstName')}s Star Board</h2>
						<h3 className="col-md-3 col-md-offset-1"><span className="currentPts">Current Points: {this.state.student.get('points')}</span></h3>
					</div>
					<div>
						<div className="row col-md-8" id="subjectBoxes">
							<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Math"/>
							<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Science"/>
							<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Reading"/>
							<ClassBoxComponent dispatcher={this.dispatcher} student={this.state.student} subject="Social Studies"/>
						</div>
						<div className="col-md-3 col-md-offset-1" id="redeemHolder">
							<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="40" prize="afternoon activity"/>
							<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="60" prize="favorite dinner"/>
							<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="80" prize="movie night"/>
							<RedeemBoxComponent dispatcher={this.dispatcher} student={this.state.student} points="100" prize="yogurt trip"/>
						</div>
					</div>
				</div>
					

			);
		}
	},
	fetchBoard: function(){
	//setting the state for the student
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