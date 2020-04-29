import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

import { showLoading, hideLoading } from 'react-redux-loading'

import { addUserQuestion, saveUserAnswer } from '../actions/users'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { addQuestion, saveAnswer } from '../actions/questions'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions})=> {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
        })
    }
}
export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addUserQuestion(authedUser, question.id))
            })
            .then(() => dispatch(hideLoading()))
    }
}

export function handleSaveQuestionAnswer(qid, option) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
    
        return _saveQuestionAnswer({
            qid,
            answer: option,
            authedUser: authedUser
        })
            .then(() => {
                dispatch(saveAnswer(authedUser,qid,option))
                dispatch(saveUserAnswer(authedUser, qid, option))
            })
    }
}