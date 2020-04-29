import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/shared'
import Users from './Users'
import { Card, CardHeader, CardBody, CardTitle, FormGroup, Label, Input, Form, Button, Row, Col } from 'reactstrap'


class QuestionPage extends Component {
    state = {
        optionSelected: ''
    }

    handleSelect = (e) => {
        this.setState({
            optionSelected: e.target.value
        })
    }

    handleQuestion = (e) => {
        e.preventDefault()
        this.props.saveQuestionAnswer(this.state.optionSelected)
    }

    render() {
        const { question, author, answer, total, percentageOne, percentageTwo, votesTwo, votesOne } = this.props
        const { optionSelected } = this.state

        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>
                            <Users id={author.id} />
                        </CardHeader>
                        <CardBody>
                            <CardTitle>Would You Rather</CardTitle>
                            {answer ?
                                <div>
                                    <FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" checked={answer === "optionOne"} readOnly/>
                                                Option One: {question.optionOne.text}
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" checked={answer === "optionTwo"} readOnly/>
                                                Option Two: {question.optionTwo.text}
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <div className="progress">
                                        <div className="progress-one" style={{ width: `${percentageOne}%` }}>{`${percentageOne}%`}{` (${votesOne} vote for Option One)`}</div>
                                        <div className="progress-two" style={{ width: `${percentageTwo}%` }}>{`${percentageTwo}%`}{` (${votesTwo} vote for Option Two)`}</div>
                                    </div>
                                    <div className="total">
                                        Total number of votes: {total}
                                    </div>
                                </div>
                                :
                                <Form onSubmit={this.handleQuestion}>
                                    <FormGroup tag="fieldset">
                                        <FormGroup >
                                            <Label >
                                                <Input type="radio" name="radio1" value="optionOne" onChange={this.handleSelect} />
                                                {question.optionOne.text}
                                            </Label>
                                        </FormGroup>
                                        <FormGroup >
                                            <Label >
                                                <Input type="radio" name="radio1" value="optionTwo" onChange={this.handleSelect} />
                                                {question.optionTwo.text}
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <Button disabled={optionSelected === ''}>Submit</Button>
                                </Form>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}


function mapStateToProps({ questions, users, authedUser }, { match }) {
    const answers = users[authedUser].answers
    const { id } = match.params
    const question = questions[id]
    const author = users[question.author]
    let answer, percentageOne, percentageTwo, total, votesOne, votesTwo

    votesOne = question.optionOne.votes.length
    votesTwo = question.optionTwo.votes.length
    total = question.optionOne.votes.length + question.optionTwo.votes.length
    percentageOne = (question.optionOne.votes.length / total) * 100
    percentageTwo = (question.optionTwo.votes.length / total) * 100

    if (answers.hasOwnProperty(question.id)) {
        answer = answers[question.id]
    }

    return {
        question,
        author,
        answer,
        total,
        percentageOne,
        percentageTwo,
        votesOne,
        votesTwo
    }
}

function mapDispatchToProps(dispatch, props) {
    const { id } = props.match.params

    return {
        saveQuestionAnswer: (answer) => {
            dispatch(handleSaveQuestionAnswer(id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)
