import { FETCH_ITEMS } from '../actions/types'

const initialState = {
  users: [{ items: [] }],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}
