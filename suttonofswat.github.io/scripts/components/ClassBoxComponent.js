var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');
var AssignmentModel = require('../models/AssignmentModel');
require('bootstrap');

module.exports = React.createClass({
	//class box with modal and form
	render: function(){
		return (
				<div className="col-xs-6 col-sm-3 col-md-4">
					<div className="thumbnail">
						<div className="caption">
							<h3>{this.props.subject}</h3>
							<button type="button" className="btn btn-primary" onClick={this.onModalLaunch}>add new</button>

							<div ref="classBox" className="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<form className="form-horizontal" onSubmit={this.onAddAssignment}>
											<h3>Add New {this.props.subject} Grade</h3>
											<input type="text" ref="assignmentName" className="form-control" placeholder="Assignment Name" />
											<div className="form-group" id="dropdown">
	  												<select ref="assignmentType" className="form-control">
														<option disabled selected>Assignment Type</option>
														<option>Homework</option>
														<option>Project</option>
														<option>Test</option>
													</select>
											</div>
											<input type="text" ref="grade" className="form-control" placeholder="Grade" />
											<textarea className="form-control" ref="notes" rows="3" placeholder="Notes"></textarea>
											<button>Add Assignment</button>
										</form>
									</div>
								</div>
							</div>
							<a href={`#assignmentDetails/${this.props.student.id}/${this.props.subject}`}>all assignments</a>
						</div>
					</div>
				</div>


		);
	},
	onModalLaunch: function() {
		//getting the modal to show
		$(this.refs.classBox).modal('show');
		this.refs.grade.value = '';
		
	},
	onAddAssignment: function(e){
	//creating points based on the grade given
		console.log(this.props);
		e.preventDefault();
		var gradePts = 0;
		if(this.refs.grade.value.toUpperCase() === 'A'){
			gradePts = parseFloat(10);
			console.log(gradePts)
		}else if(this.refs.grade.value.toUpperCase() === 'B'){
			gradePts = parseFloat(5);
			console.log(gradePts)
		}else if(this.refs.grade.value.toUpperCase() === 'D'){
			gradePts = parseFloat(-5);
			console.log(gradePts);
		}else if(this.refs.grade.value.toUpperCase() === 'C'){
			gradePts = parseFloat(0);
			console.log(gradePts);
		}else if(this.refs.grade.value.toUpperCase() === 'F'){
			gradePts = parseFloat(-10);
			console.log(gradePts);
		}else{
			console.log('please enter in a grade a-f');
		}
	//on submit, having the form save the new assignment model to the server
		var newAssignment = new AssignmentModel({
			assignmentName: this.refs.assignmentName.value,
			assignmentNotes: this.refs.notes.value,
			assignmentType: this.refs.assignmentType.value,
			child: this.props.student,
			assignmentGrade: this.refs.grade.value,
			assignmentPoints: parseFloat(gradePts),
			subjectName: this.props.subject

		})
		newAssignment.save();

		$(this.refs.classBox).modal('hide');
		this.props.dispatcher.trigger('assignmentSubmit');
	//having the points also saved to the student model's total points
		var totalPoints = this.props.student.get('points') + gradePts;
		this.props.student.save({points: totalPoints});
	}
	
	
	
})