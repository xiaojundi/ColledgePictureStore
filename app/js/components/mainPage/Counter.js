import React from 'react'
import {connect} from 'react-redux'
import * as CounterActions from '../../actions/like'


const Counter = React.createClass({

	render: function(){
		const {value, onIncrement}=this.props
		
		return (
			<p>
				clicked:{value}
				<button onClick={onIncrement}>
					+
				</button>
			</p>
		)
	}
})
function mapStateToProps(state){
	return {
		Counter: state.Counter
	}
}

// export default connect(mapStateToProps)(Counter)
export default Counter