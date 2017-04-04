import React from 'react';
import ReactDOM from 'react-dom'
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Home from './components/mainPage/Home';
import ContactForm from './components/contactPage/ContactForm';
import { Router, Route, useRouterHistory} from 'react-router';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import My_Account from './components/My_Account/My_Account';
import { createHashHistory } from 'history';
import tdoAPP from './reducers/clicklike';
import {createStore,listener} from 'redux'
//import {Modal, Button, Tab, Tabs} from 'react-bootstrap'
window.store = createStore(tdoAPP);

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const routes=(
			<Route >
			<Route path="/" component={Home}/>
			<Route path="/Login" component={LoginPage}/>
			<Route path="/SignUp" component={SignupPage}/>
			<Route path="/My_Account" component={My_Account}/>
			</Route>
	);

let Render=function(){
	ReactDOM.render(
	<Provider store={store}>
		<Router history={appHistory} >
			{routes}
		</Router>
	</Provider>,
	document.getElementById('app')
	); 
}
store.subscribe(Render)
Render();