let actions = {

    Add_Comment: (postId, author,comment)=> {
        return {
            type: 'ADD_COMMENT',
            postId,
            author,
            comment
        }
    },
    Remove_Comment: (index, postId)=> {
        return {
            type: 'REMOVE_COMMENT',
            index,
            postId
        }
    },

    Increament_Like: (index)=> {
        return {
            type : 'INCREMENT_LIKES',
            index
        }
    }

}

export default actions;