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
    const { authedUser } = this.props

    if (!authedUser)
     return <Link to='/login'>Login</Link>

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

        {/* {authedUser ? (
          <ul className="nav-list">
            <li>
              <img src={user.avatarURL} className='avatar2' alt={`Avatar of ${user.name}`} />{user.name}
            </li>
            <li className="nav-item">
              <Link to="/">Would You Rather</Link>
            </li>
            <li className="nav-item green">
              <Link to="/add">+ Add new question</Link>
            </li>
            <li className="nav-item split">
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item log-out">
              <Link to="/logout">
                <button className="log-out-button">Log Out</button>
              </Link>
            </li>
          </ul>
        ) : (
            <ul className="nav-list">
              <Link to='/login'>Login</Link>
            </ul>
          )} */}
          
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
