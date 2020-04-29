import React, { Component } from "react"
import { connect } from "react-redux"

class LeaderBoard extends Component {
    render() {
        const { users } = this.props

        return (
            <table id="leaderboard">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Questions Asked</th>
                        <th>Questions Answered</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td><img src={user.avatarURL} className='avatar2' alt={`Avatar of ${user.name}`} />{user.name}</td>
                            <td>{user.questions.length}</td>
                            <td>{Object.keys(user.answers).length}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
        )
    }
}

function mapStateToProps ({ users }) {
    const score = users =>
        Object.keys(users.answers).length + (users.questions).length
    return {
        users: Object.values(users).sort((a, b) => score(b) - score(a))
    }
}

export default connect(mapStateToProps)(LeaderBoard)
