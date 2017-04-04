import {combineReducers} from 'redux'
import {like, dislike} from '../actions/like'

// const initialState=1;

function test1(state=1, action){
	//console.log(state)
	switch(action.type){
		case 'Increase':
		return state +1
		case 'Decrease':
		return state +1
		default:
		return 1
	}
}

function test2(state={}, action){
	console.log(state);
	switch(action.type){
		case 'User_Login_Success':
		return {login: action.data}
	   default:
	   return state
	}
}

function test3(state={out:false}, action){
	console.log(state);
	switch(action.type){
		case 'clean':
		return {out: false}
		case 'regist':
		return {out: true}
	   default:
	   return state
	}
}

const tdoAPP= combineReducers({
	test1,
	test2,
	test3
})

export default tdoAPP