/* Initialize the state of the project with default values */
const initState = {
    answer: '',
    count: 0,
}
const rootReducer = (state = initState, action) => {

    if (action.type === 'GET_ANSWER') {
        let new_answer = action.value;
        return {
            ...state,
            answer: new_answer
        }
    }
    if (action.type === 'SET_COUNT') {
        let new_count = action.value;
        return {
            ...state,
            count: new_count
        }
    }

    return state;
}

export default rootReducer;