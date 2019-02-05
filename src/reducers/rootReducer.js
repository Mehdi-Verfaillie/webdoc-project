/* Initialize the state of the project with default values */
const initState = {
    answer: '',
    count: 0,

    /**
     * Dynamic content
        * Should come from DATABASE  
     */
    intro_sentence1: 'Think of the way a steady wind blowing across sand creates all kinds of shapes.',
    intro_sentence2: 'The grains self-organise into ripples, waves and dunes. This happens, even though the grains are virtually identical.',
    intro_sentence3: 'And have no knowledge of the shapes they became part of.',
    intro_sentence4: 'But what if all those patterns were to fall into chaos ?',
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