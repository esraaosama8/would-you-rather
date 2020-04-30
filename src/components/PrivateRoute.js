import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authedUser,...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);




// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { fakeAuth } from '../utils/helpers';

// const PrivateRoute = ({ component: Component,  ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{
//             pathname: '/',
//             state: { from: props.location }
//           }} />
//       )
//     }
//   />
// );

// export default PrivateRoute

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { fakeAuth } from '../utils/helpers';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// const PrivateRoute = ({component: Component, ...rest}) => {
//     const {isAuthenticated} = rest;
  
//     return (
//       <Route {...rest} render={props => (
//         isAuthenticated ? (
//           <Component {...props}/>
//         ) : (
//           <Redirect to={{
//             pathname: '/',
//             state: {from: props.location}
//           }}/>
//         )
//       )}
//       />
//     );
//   };
  
//   PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//   };
  
//   function mapStateToProps(state) {
//     return {
//       isAuthenticated: state.user.isAuthenticated,
//     };
//   }
  
//   export default connect(mapStateToProps)(PrivateRoute);