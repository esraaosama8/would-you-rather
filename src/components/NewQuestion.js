import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Jumbotron, Col, Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label, Row, } from 'reactstrap'
import {Redirect} from'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleOptionOne= (e) => {
        const optionOne = e.target.value
        this.setState(() => ({
            optionOne
        }))
    }

    handleOptionTwo = (e) => {
        const optionTwo = e.target.value
        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState({
            toHome: true
        })
    }

    render() {

        console.log(this.state)

        if (this.state.toHome) {
            return <Redirect to='/' />
          }

        const { optionOne, optionTwo } = this.state
        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 12 }}>
                    <div>
                        <Card>
                            <CardBody>
                                <CardImg top width="20%" src="https://static.parade.com/wp-content/uploads/2019/12/Would-You-Rather_Questions.jpg" alt="Card image cap" />
                                <Jumbotron>
                                    <h3 className="display-3">Would You Rather ..</h3>
                                </Jumbotron>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="optionOne">Option One</Label>
                                        <Input type="text"
                                            defaultValue={optionOne}
                                            onChange={this.handleOptionOne}
                                            placeholder="Option One" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="optionTwo">Option Two</Label>
                                        <Input type="text"
                                            defaultValue={optionTwo}
                                            onChange={this.handleOptionTwo}
                                            placeholder="Option Two" />
                                    </FormGroup>
                                    <Button disabled={optionOne === '' || optionTwo === ''}>Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}


export default connect()(NewQuestion)