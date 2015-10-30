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
			<div className="col-md-6 col-md-offset-3 box-shadow--8dp formBlock">		
					<form onSubmit={this.onLogin} className="form-horizontal">
						<div className="form-group">
							<label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
							<div className="col-sm-10">
								<input type="text" ref="email" className="form-control" id="inputEmail3" placeholder="Username" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
							<div className="col-sm-10">
								<input type="password" ref="password" className="form-control" id="inputPassword3" placeholder="Password" />
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" className="btn btn-default">Sign in</button>
							</div>
						</div>
					</form>
				</div>
		);
	},
	onLogin: function(e){
		e.preventDefault();
		Parse.User.logIn(
			this.refs.email.value,
			this.refs.password.value,
			{
				success: (u) => {
						console.log('success')
						this.props.router.navigate('', {trigger: true});
						this.props.router.trigger('login');
				},
				error: (u, error) => {
					console.log('error')
					this.setState({
						error: error.message
					});
				}
			}
		)
	}



})