import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import reducer from '../reducers'

const createStoreWithMiddleware=applyMiddleware(thunk)(createStore)


export default function configureStore(initialState){
	const store = createStoreWithMiddleware(reducer, initialState)
	return store
};

