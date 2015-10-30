var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onRegister}>
						<h1>Register</h1>
						{errorElement}
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-2 control-label">UserName</label>
							<div className="col-sm-10">
								<input type="text" ref="username" className="form-control" id="inputEmail3" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
							<div className="col-sm-10">
								<input type="text" ref="email" className="form-control" id="inputEmail3" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
							<div className="col-sm-10">
								<input type="password" ref="password" className="form-control" id="inputPassword3" />
							</div>
						</div>
						<div className="row">
							<button>Register</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.signUp(
			{
				username: this.refs.username.value,
				password: this.refs.password.value,
				email: this.refs.email.value
			},
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true});
					console.log('it worked!')
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});