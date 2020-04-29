import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'


export default applyMiddleware(
    thunk,
    logger
)


// If the thunk middleware sees an action, that action will be sent to the next middleware in line - the logger middleware.
// If it sees a function, the thunk middleware will call that function. 
// That function can contain side effects - such as API calls - and dispatch actions, simple Javascript objects. 
// These dispatched actions will again go to all of the middleware. 
// The thunk middleware will see that it’s a simple action and pass the action on to the next middleware, the logger.