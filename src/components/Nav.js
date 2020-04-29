import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Nav, NavItem, NavLink } from "reactstrap"
import Users from './Users'

class NavBar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { authedUser, user } = this.props;

    return (
      <div>
        <Nav>
          <NavItem>
            <Users id={authedUser} />
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/">Would You Rather</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/add">New Question</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/logout'>Logout</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}



function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser]
  return {
    authedUser,
    user
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))
