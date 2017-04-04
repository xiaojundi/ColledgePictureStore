
import React from 'react';
import {Link, IndexLink} from 'react-router';


const Navbars=React.createClass({
     getInitialState(){
        return {
            username:sessionStorage.username,
            password:sessionStorage.password,
        };
    },
    componentDidMount(){

      if((typeof sessionStorage.username)=="undefined")
      {
        store.dispatch({type:"clean"});
      }
      else
      store.dispatch({type:"regist"});


    },
    cleantheStore(){
        sessionStorage.clear();
        store.dispatch({type:"clean"});
        window.location.reload();
    },
    // componentDidUpdate: function(preProps, prevState){
    //     addtheStore();
    //     console.log(store.getState().test3.out)
    // },
	render: function(){
      //  const {isAuthenticated}=this.props.priority;

        const userLinks=(
            <ul className="nav navbar-nav navbar-right">
                <li><a href="">Welcome!</a></li>
                <li><a href="">{sessionStorage.getItem('username')}</a></li>
                <li><Link to="/My_Account">{'My_Account'}</Link></li>
                <li onClick={this.cleantheStore}><Link to="/">Logout</Link></li>
            </ul>
        );
         const guestLinks=(
            <ul className="nav navbar-nav navbar-right">
                 <li ><Link  to="/Login">Login</Link></li>
                  <li ><Link  to="/SignUp">SignUp</Link></li>
            </ul>
        );

		return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top" >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to='/' style={{height:50,width:100,padding: "5px 8px"}}><img style={{height:'100%',width:'100%'}} src="http://www.visitor.is/img/visitor_merki.svg"alt="no img"/></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><IndexLink to="/">Home</IndexLink></li>
                            <li><Link to="/">Contact</Link></li>
                        </ul>
                        <form className="navbar-form navbar-left" onSubmit={this.submit}>
                            <div className="form-group">
                                <input ref="searchText" type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-default">Search</button>
                        </form>
                        {console.log("asdf")}
                        {console.log(store.getState().test3)}
                        {store.getState().test3.out?userLinks:guestLinks}
                    </div>
                   </div>
                 </nav>
                 <img id="title" src="https://www.princeton.edu/main/images/banner/20140512_CL_SprProspectGardenFrist_0291b.jpg" alt=""/>
            </div>
			)
	}
});

function mapStateToProps(state){
    return {
        priority: state.priority
    }
} 


export default Navbars;

//  {this.state.username=="undefined"?guestLinks: userLinks}

