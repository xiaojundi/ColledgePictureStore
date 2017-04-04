import React from 'react'

const Menu=React.createClass({
	render: function(){
		return (
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="#">Univerisity:</a>
				    </div>
				    <ul className="nav navbar-nav">
				      <li><a href="#">Princeton</a></li>
				      <li><a href="#">stevens Institute of Tech</a></li>
				      <li><a href="#">Liaoning technical university</a></li>
				    </ul>
				  </div>
				</nav>
			);
	}
});

export default Menu;