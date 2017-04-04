import React from 'react'
import Post from './Post'
import $ from 'jquery'

const Body=React.createClass({
	getInitialState: function(){
		return {
			items:[],
			collections:[]
		};
	},
	loadDataFromServer: function(){
		$.ajax({
			url: '/api',
			dataType: 'json',
			cache:false,
			success: function(data){
				var pic=[]
				for(var i in data)
				{
					pic.push(data[i]["display_src"])
				}
				this.setState({items:pic});
			}.bind(this)
			,
		    error: function(xhr,status,err){
				console.log('/api', status, err.toString());
			}.bind(this)
		});
	},
	loadCollecttionsFromServer: function(){
		$.ajax({
			url: '/api/collections',
			dataType: 'json',
			cache:false,
			success: function(data){
				var pic=[]
				for(var i in data)
				{
					if(data[i]["username"]==sessionStorage.username)
					pic.push(data[i]["display_src"])
				}
				this.setState({collections:pic});
			}.bind(this)
			,
		    error: function(xhr,status,err){
				console.log('/api/collections', status, err.toString());
			}.bind(this)
		});
	},
	componentWillMount:function(){
		this.loadCollecttionsFromServer();
		this.loadDataFromServer();
		console.log("adsfasdfasd")
		console.log(this.state)
		//setInterval(this.loadDataFromServer, this.props.pollInterval);
	},
	onClick: function(){
		alert(this.props.url)
		this.setState({items:[5,6,7]})
	},

	render(){
		var w=this.state;
		console.log(w);
		var listItem= this.state.items.map(function(item){
			return (
				<Post key={item} post={item} collections={w.collections}/>
				);
		});
		return (
			<div >
			<div >
				{listItem}
			</div>
			</div>
		);
	}
})


export default Body;