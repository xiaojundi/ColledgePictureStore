import React from 'react'
import Header from '../mainPage/Header'
import Body from './Body'

const My_Account=React.createClass({

	render(){
		return (
		<div>
		<div><Header/></div>
	   	<div><Body /></div>
		</div>		
			);
	},

});

export default My_Account;