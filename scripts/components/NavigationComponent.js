var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			allStudents: []
		}
	},
	componentWillMount: function() {
		this.fetchStudents();
		this.props.router.on('route', () => {
			this.forceUpdate();
		});

		this.props.router.on('login', () => {
			this.fetchStudents();
			
		});
			

	},
	render: function(){
		var currentUser = Parse.User.current();
		var Links = [];

		if(!currentUser){
			Links.push(this.createNavLink('login', 'Login'));
		}
		else {

			// for loop over students, the push to Links get first name
				this.state.allStudents.map(function(a){
					Links.push(<li><a href='#'>{a.get('firstName')}</a></li>);

				})
			
			Links.push(<li><a href='#' onClick={this.onLogout}>Logout</a></li>);
		}

		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">

						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#">youngStar</a>
						</div>


						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-right">
								{Links}
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	},
	onLogout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('register', {trigger: true});
	},
	createNavLink: function(url, label) {
		var currentUrl = Backbone.history.getFragment();
		if(currentUrl === url){
			return (<li className="active"><a href={'#'+url}>{label}</a></li>);
		}
		else{
			return(<li><a href={'#'+url}>{label}</a></li>);
		}
	},
	fetchStudents: function(){
		//finding the children assoicated with the logged in parent
			var query = new Parse.Query(StudentModel);
			query.equalTo('parent', Parse.User.current());
			query.find().then(
					(students) =>{
						this.setState({allStudents: students})
					}

				);
	}



})