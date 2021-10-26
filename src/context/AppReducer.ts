const appReducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_PARTICIPANTS':
      return {
        ...state,
        participants: [...action.payload]
    }
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [action.payload, ...state.participants]
      }
    default:
      return state;
  }
}

export default appReducer;