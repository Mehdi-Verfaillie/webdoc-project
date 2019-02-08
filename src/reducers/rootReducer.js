/* Initialize the state of the project with default values */
const initState = {
    answer: 'CHAOS',
    count: 0,
    impactCompleted: false,
    chaosCompleted: false,
    chanceCompleted: false,
    conclusionCompleted: false

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

    if (action.type === 'SET_IMPACT_COMPLETED') {
        let new_status = action.value;
        return {
            ...state,
            impactCompleted: new_status
        }
    }

    if (action.type === 'SET_CHAOS_COMPLETED') {
        let new_status = action.value;
        return {
            ...state,
            chaosCompleted: new_status
        }
    }

    if (action.type === 'SET_CHANCE_COMPLETED') {
        let new_status = action.value;
        return {
            ...state,
            chanceCompleted: new_status
        }
    }

    if (action.type === 'SET_CONCLUSION_COMPLETED') {
        let new_status = action.value;
        let new_answer = action.value;
        return {
            ...state,
            conclusionCompleted: new_status,
            answer: new_answer
        }
    }


    return state;
}

export default rootReducer;