import React, { Component } from 'react'
import { connect } from 'react-redux'
import Questions from './Questions'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

class Dashboard extends Component {
  state = {
    activeTab: '1'
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    console.log(this.props)
    const { unansweredQuestions, answeredQuestions, user } = this.props;

    return (
      <div>
        
        <h3>{`${user.name}'s Dashboard`}</h3>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }} >
              Unanswered Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }} >
              Answered Questions
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {unansweredQuestions.map(id =>
                <Col key={id} sm="6">
                  <Questions id={id} />
                </Col>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {answeredQuestions.map(id =>
                <Col key={id} sm="6">
                  <Questions id={id} />
                </Col>
              )}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const user = users[authedUser]
  const answeredQuestions = Object.keys(user.answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unansweredQuestions: Object.keys(questions).filter(id => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
    user
  }
}


export default connect(mapStateToProps)(Dashboard)



