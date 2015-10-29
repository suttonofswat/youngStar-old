var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
			<div className="redeemBox">
				<div className="thumbnail">
					<div className="caption">
						<div>{this.props.points}</div>
						<div>{this.props.prize}</div>
						<button onClick={this.onRedeem}>Redeem Points</button>
					</div>
				</div>
			</div>
		);
	},
	onRedeem:function(){
		// console.log(this.props.student.get('points'));
		var totalPoints = this.props.student.get('points') - this.props.points;
		this.props.student.save({points: totalPoints});
		this.props.dispatcher.trigger('assignmentSubmit');

	}
	
})