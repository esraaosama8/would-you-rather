import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'

class Error extends React.Component {
  render() {
    return <Card>
      <CardHeader>Error 404. </CardHeader>
      <CardBody>
        <CardTitle>PAGE NOT FOUND!</CardTitle>
        <p style={{ textAlign: "left" }}>
          <button> <Link to="/"> Go to Home </Link> </button>
        </p>
      </CardBody>
    </Card>
  }
}
export default Error
