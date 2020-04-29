//  we're going to create a logger middleware that will help us view the actions
// and state of the store as we interact with our application.
// const logger = (store) => (next) => (action) => {...}

const logger = (store) => (next) => (action) => {
    //console.group(action.type)
    //console.log('The action: ', action)
    const returnValue = next(action)
    //console.log('The new state: ', store.getState())
    //console.groupEnd()
    return returnValue
};

export default logger