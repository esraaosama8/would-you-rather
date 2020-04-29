import React, { Component } from 'react';
import { connect } from 'react-redux'

class Users extends Component {

  render() {
    const { user } = this.props
    return (
      <div className="container">
        <img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`} />
        <span>{user.name}</span>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id]
  return {
    user: user
  }
}


export default connect(mapStateToProps)(Users)
