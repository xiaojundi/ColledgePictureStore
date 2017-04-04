
import React from 'react';
import {createStore,listener} from 'redux'
import Header from './Header';
import Footer from './Footer';
import Counter from './Counter';
import tdoAPP from '../../reducers/clicklike';
import {like, dislike} from '../../actions/like';
import QuestionApp from '../questions/QuestionApp';
import Body from './Body';



const Home=React.createClass({

	render(){
		return (
		<div>
		<div><Header/></div>
	    <div><Body /></div>
		</div>		
			);
	},

});



// store.subscribe(()=>{
// 	//console.log(this.props.store.getState().test1)

// });

export default Home;
	
// )
// ReactDOM.render(a, document.getElementById('app'))



/*
const store= createStore(counter)

const Home = React.createClass({

	render: function(){
		
		//return (<div><Header/></div>)
		return (<Counter 
			value={store.getState()} 
			onIncrement={()=>store.dispatch({type:'Increase'})} />)
	}

})

export default Home

		<div className="middlePart">
	    <button onClick={this.Increase}>clickme</button>
	    {store.getState().test1}
		</div>

*/
