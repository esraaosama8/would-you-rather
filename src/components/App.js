import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Login from './Login'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import Logout from './Logout'
import QuestionPage from './QuestionPage'
// import Error from './Error'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div>
          <LoadingBar />
          <Switch>
          {this.props.loading === true
            ? <Route path='/' exact component={Login} />
            :
            <Fragment>
              <Nav />
              <PrivateRoute path='/' exact component={Dashboard} />
              <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
              <PrivateRoute path='/add'  exact component={NewQuestion} />
              <PrivateRoute path="/questions/:id"  excat component={QuestionPage} />
              <Route path='/logout' component={Logout} />
            </Fragment>
          }
          {/* <Route component={Error} /> */}
         </Switch>
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App);