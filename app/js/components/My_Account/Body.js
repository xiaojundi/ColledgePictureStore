import React from 'react'
// import Post from './Post'
import $ from 'jquery'

const Body=React.createClass({
	getInitialState: function(){
		return {
			username:sessionStorage.username,

			items:[]
		};
	},
	loadDataFromServer: function(){
		$.ajax({
			url: '/api/favourit',
			type:'post',
			data: this.state,
			success: function(data){
				var pic=[];
				var mid={};
				for(var i in data)
				{
					mid.display_src=data[i].display_src;
					mid._id=data[i]._id;
					pic.push(mid)
					mid={};
				}
				this.setState({items:pic})
				console.log("state");
			}.bind(this)
			,
		    error: function(xhr,status,err){
				console.log('/api', status, err.toString());
			}.bind(this)
		});
	},
	// loadCollecttionsFromServer: function(){
	// 	$.ajax({
	// 		url: '/api/collections',
	// 		dataType: 'json',
	// 		cache:false,
	// 		success: function(data){
	// 			var pic=[]
	// 			for(var i in data)
	// 			{
	// 				if(data[i]["username"]==sessionStorage.username)
	// 				pic.push(data[i]["display_src"])
	// 			}
	// 			this.setState({collections:pic});
	// 		}.bind(this)
	// 		,
	// 	    error: function(xhr,status,err){
	// 			console.log('/api/collections', status, err.toString());
	// 		}.bind(this)
	// 	});
	// },
	componentWillMount:function(){
		this.loadDataFromServer();
		console.log("adsfasdfasd")
		console.log(this.state)
		//setInterval(this.loadDataFromServer, this.props.pollInterval);
	},

	render(){
		var listItem= this.state.items.map(function(item){
			return (
			 	<div key={item._id} className="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
					<div className="thumbnail">
					<a href={item.display_src} ><img  src={item.display_src} alt=""/></a>
					</div>
				</div>
				);
		});
		return (
			<div >
				<div style={{textAlign:"center"}}><h3 >My favourit</h3></div>
			<div>
				{listItem}
			</div>
			</div>
		);
	}
})


export default Body;


//<Post key={item} post={item} />