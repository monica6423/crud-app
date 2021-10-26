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
    case 'DELETE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((participant: any) => participant.id !== action.payload)
      }
    case 'EDIT_PARTICIPANT':
      const editParticipant = state.participants.map((p: any) => {
        if (p.id === action.payload.id) return action.payload
        return p
      })

      return {
        ...state,
        participants: editParticipant
      }
    default:
      return state;
  }
}

export default appReducer;