var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function(){
		return (
			<div className="box-shadow--8dp formBlock">
				<div className="row">
					<div className="col-sm-12">
						<h1>Login Page</h1>
						{errorElement}
						<form onSubmit={this.onLogin}>
							<div className="form-group">
								<label htmlFor="exampleInputEmail1">Email address</label>
								<input type="email" ref="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
							</div>
							<div className="form-group">
								<label htmlFor="exampleInputPassword1">Password</label>
								<input type="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
							</div>
							<button type="submit" className="btn btn-default">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
	
})