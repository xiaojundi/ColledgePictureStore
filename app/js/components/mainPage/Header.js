import React from 'react'
import Navbars from './Navbars'
import Menu from './Menu'

module.exports=React.createClass({

	render: function(){
		return (
					<header>
							<Navbars />
							<Menu />
					</header>
			)
	}
}); 