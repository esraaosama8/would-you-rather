export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function formatQuestion ({ optionOneText, optionTwoText, author }) {
    //console.log("formatQuestion");
    //console.log(optionOneText, optionTwoText, author)
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }

  // export const fakeAuth = {
  //   isAuthenticated: false,
  //   authenticate(cb) {
  //     this.isAuthenticated = true
  //     setTimeout(cb, 100) // fake async
  //   },
  //   signout(cb) {
  //     this.isAuthenticated = false
  //     setTimeout(cb, 100) // fake async
  //   }
  // }