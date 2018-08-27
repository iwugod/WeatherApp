function getId(state) {
	return state.todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	},-1) + 1
}

let reducer = (state,action) => {
    
    return state;
}

export default reducer;