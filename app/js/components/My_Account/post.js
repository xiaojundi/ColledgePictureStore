import React from 'react'
import $ from 'jquery'

const Post=React.createClass({
	getInitialState(){
        return {
            like: 0,
            address: this.props.post,
            username: sessionStorage.username
        };
    },
    componentDidMount: function(){
    	const posts=this.props.post;
		const collections=this.props.collections;
		//console.log(this.props.collections)
		if(collections.indexOf(posts)!=-1)
    	this.setState({like:1})
    },
 //    componentDidMount:function(){
	// 	// this.loadDataFromServer();
	// 	// this.loadCollecttionsFromServer();
	// 	// console.log(this.state)
	// 	//setInterval(this.loadDataFromServer, this.props.pollInterval);
	// },

    onClick: function(){  //change to like// add
    	if(typeof sessionStorage.username =="undefined")
    		window.location="#/Login";
    	else
    	{
    	this.setState({like: 1});
        console.log(this.state);
    	this.modifyDatabase();    		
    	}

    	// this.modifyDatabase(); 
    },
    onClick2: function(){   //change to dislike// delete
    	this.setState({like: 0});
    //	console.log(this.state);
    	this.modifyDatabase();
    },
    checkOut: function(posts, collections){
    	if(collections.indexOf(posts)!=-1)
    	this.state.like=1;

    },
    modifyDatabase: function(){
    	$.ajax({
			url: '/api',
			dataType: 'json',
			cache:false,
			success: function(data){
				
			}.bind(this)
			,
		    error: function(xhr,status,err){
				console.log('/api', status, err.toString());
			}.bind(this)
		});
    },
	render:function(){
		const posts=this.props.post;
		const collections=this.props.collections;

		//this.checkOut(posts, collections);
		//console.log(collections)
		return (
			<div key={posts} className="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
			 <div className="thumbnail">
			 	<a href={posts} ><img className="imageList" src={posts} alt=""/></a>
			 	 <div className="caption">
			        <h3>Thumbnail label</h3>
			        <p>...</p> 
			      	<p>{this.state.like==1?<a onClick={this.onClick2}  className="glyphicon glyphicon-heart" role="button"></a>:<a className="glyphicon glyphicon-thumbs-up" onClick={this.onClick}></a>}
			      	<a href="" className="btn btn-default" style={{float:'right'}} role="button">Save</a>
			      	</p>
			      </div>
			   </div>	
			</div>
		)
	}
})

export default Post;

//<p> <a href="#" className="btn btn-default" role="button">Button</a></p>