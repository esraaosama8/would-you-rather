import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardTitle, Card, CardBody } from 'reactstrap'
import {  withRouter } from 'react-router-dom'

class Questions extends Component {

    toQuestion(e, id) {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`);
      }

    render() {

       // console.log(this.props)
        const { question ,authedUser} = this.props

        if (question == null) {
            return <p> this question doesn't exist</p>
        }

        return (
            <Card onClick={(e) => this.toQuestion(e, question.id)}>
                <span> <h4>{`${question.author} asked:`}</h4> </span>
                <CardBody>
                    <CardTitle> Would you rather: </CardTitle>
                    <ul>
                    <li className={question.optionOne.votes.includes(authedUser) ? "check" : ""}>{question.optionOne.text}</li>
                    <li className={question.optionTwo.votes.includes(authedUser) ? "check" : ""}>{question.optionTwo.text}</li>
                    </ul>
                </CardBody>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    return {
        authedUser,
        users,
        question: question
      
    }
}

export default withRouter(connect(mapStateToProps)(Questions))