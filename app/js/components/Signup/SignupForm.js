import React from 'react';
import $ from 'jquery'

const SignupForm=React.createClass({
	getInitialState(){
		return {
			userName: " ",
			userPassword1:" ",
			userPassword2:" ",
			email:" "
		};
	},
	changeUsername(e){
		let uname=e.target.value;
		this.setState({
			userName:uname
		});
		console.log(this.state.userName);
	},
	changePassword1(e){
		let upwd=e.target.value;
		this.setState({
			userPassword1:upwd
		});
		console.log(this.state.userPassword1);
	},
	changePassword2(e){
		let upwd=e.target.value;
		this.setState({
			userPassword2:upwd
		});
		console.log(this.state.userPassword2);
	},
	changeEmail(e){
		let upwd=e.target.value;
		this.setState({
			email:upwd
		});
		console.log(this.state.email);
	},
	registDataFromForm: function(){
		$.ajax({
			url: '/api/form/save',
			type:'post',
			data: this.state,
			success: function(data){
				//console.log(data);
				// store.dispatch({type:"User_Login_Success", data});
				console.log("data")
				if(data.username!="undefined")
				{
					sessionStorage.setItem('username',data.username);
			    	sessionStorage.setItem('password',data.password);
			    	window.location = data.redirect;
				}
			    else
			    window.location = data.redirect;

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
			this.registDataFromForm();
			//this.props.login(this.state.userName, this.state.userPassword);
			// console.log(this.state);
		
	},
	render(){
		{console.log(this.state)}
		const {errors, identifier, password}= this.state;
		return (
			<div className="signin-wrapper">
				<h3 className="form-signin-heading"> Registrition </h3>
				<form action="" className="form-signin">
					<div>
						<label className="control-label" htmlFor="uname">username</label>
						<input className="form-control" type="text" name="username" onChange={this.changeUsername} autoFocus="autofocus" required="required" minLength="4"/>
					</div>

					<div>
						<label className="control-label" htmlFor="upass">password</label>
						<input className="form-control" type="password" name="password1" onChange={this.changePassword1} required="required" minLength="6"/>
					</div>
					<div>
						<label className="control-label" htmlFor="upass">password</label>
						<label className="control-label" htmlFor="upass" style={{float: 'right'}}>
							{
							(this.state.userPassword2==" "?"":((this.state.userPassword2!=this.state.userPassword1)? <div style={{color:'red'}}>Password not same</div>:""))
							}
						</label>
						<input className="form-control" type="password" name="password2" onChange={this.changePassword2} minLength="6" />
					</div>
					<div>
						<label className="control-label" htmlFor="upass">Email Address</label>
						<input className="form-control" type="email" name="email" onChange={this.changeEmail}/>
					</div>
					<div className="form-group">
						<button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick} disabled={this.state.isLoading}>regist</button>
						<button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.clean} disabled={this.state.isLoading}>clean</button>
					</div>
				</form>

			</div>
			)
	}
})

export default SignupForm;