import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
          <Nav />
          {this.props.loading === true
                            ? null
                            : 
          <Switch>
              <Route path='/login' exact component={Login} />
              <PrivateRoute path='/' exact component={Dashboard} />
              <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
              <PrivateRoute path='/add'  exact component={NewQuestion} />
              <PrivateRoute path="/questions/:id"  excat component={QuestionPage} />
              <Route path='/logout' component={Logout} />
          {/* <Route component={Error} /> */}
         </Switch>
  }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {

  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App);