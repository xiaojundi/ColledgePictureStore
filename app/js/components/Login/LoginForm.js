import React from 'react';
import $ from 'jquery'

const LoginForm=React.createClass({
	getInitialState(){
		return {
			userName: "",
			userPassword:"",
			isRemember:false,
			unameHelp:"",
			upwdHelp:"",
			isLoading:false
		};
	},
	changeUsername(e){
		let uname=e.target.value;
		this.setState({
			userName:uname
		});
		// console.log(this.state.userName);
	},
	changePassword(e){
		let upwd=e.target.value;
		this.setState({
			userPassword:upwd
		});
		// console.log(this.state.userPassword);
	},
	sendDataFromForm: function(){
		$.ajax({
			url: '/api/form',
			type:'post',
			data: this.state,
			success: function(data){
				//console.log(data);
				store.dispatch({type:"User_Login_Success", data});
				if(typeof data.username!="undefined")
				{
					sessionStorage.setItem('username',data.username);
					sessionStorage.setItem('password',data.password);
					window.location = data.redirect;
				}
				
			}.bind(this)
			,
		    error: function(xhr,status,err){
				console.log('/api', status, err.toString());
				//window.location = data.redirect;
			}.bind(this)
		});
	},
	handleClick(){
		if(this.state.userName===""||this.state.userName===null)
		{
			this.setSate({
				unameHelp:"user can not be empty"
			})
		}else if(this.state.userPassword===""||this.state.userPassword===null){
			this.setState({
				unameHelp:"",
				upwdHelp:"password can not be empty"
			})
		}else{
			this.setState({
				unameHelp:"",
				upwdHelp:""
			});
		}
			this.sendDataFromForm();
			//this.props.login(this.state.userName, this.state.userPassword);
			// console.log(this.state);	
	},
	render(){
		const {errors, identifier, password}= this.state;
		return (
			<div className="signin-wrapper">
				<h3 className="form-signin-heading"> login </h3>
				<form action="" className="form-signin">
					<div>
						<label className="control-label" htmlFor="uname">username</label>
						<input className="form-control" type="text" name="username" onChange={this.changeUsername}/>
					</div>

					<div>
						<label className="control-label" htmlFor="upass">password</label>
						<input className="form-control" type="password" name="password" onChange={this.changePassword}/>
					</div>
						<div className="form-group">
						<button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick} disabled={this.state.isLoading}>Login</button>
						</div>
				</form>

			</div>
		)
	}
})

export default LoginForm;