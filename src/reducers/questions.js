// A Reducer describes how an application's state changes
import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                // the "..." indicates returning all the state/actions exisiting 
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [question.id]: question,
            }
        case SAVE_QUESTION_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state, //spread all the previous questions on the state, returning new state object and bringing the previous questions with it
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        default:
            return state
    }
}