export function like(numb){
	return {
		type: "ADD_NUB"
	//	numb
	}
}


export function dislike(numb){
	return {
		type: "Decrease"
	//	numb:"hello"
	}
}

export function LoginSuccess(value){
	return {
		type: "LoginSuccess",
		value:value
	}
}