import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { withRouter } from 'react-router';

class Login extends Component {
    state = {
        userID: '',
        redirectToReferrer: false
    }

    handleChange = (event) => {
        const userID = event.target.value
        this.setState({
            userID
        })
    }

    handleLogin(event) {
        event.preventDefault();
        const { userID } = this.state
        const from = this.props.location !== undefined && this.props.location.state !== undefined
            ? this.props.location.state.from
            :  '/' 
        this.props.dispatch(setAuthedUser(userID));
        this.props.history.push(`${from}`);
    }

    render() {

        const { users } = this.props
        const { userID } = this.state

        return (
            <Form onSubmit={this.handleLogin.bind(this)}>
                <FormGroup>
                    <Label for="selectUser">Select User</Label>
                    <Input id="selectUser" type="select" value={userID} onChange={this.handleChange.bind(this)}>
                        <option value="" disabled>Please select</option>
                        {
                            Object.keys(users).map(user =>
                                <option key={user} value={user}>
                                    {users[user].name}
                                </option>)
                        }
                    </Input>
                </FormGroup>
                <input disabled={userID === ''} type="submit" value="Login" />
            </Form>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login));
