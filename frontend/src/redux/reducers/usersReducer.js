import { ADD_ITEM, FETCH_ITEMS } from '../actions/types'

const initialState = {
  users: [{ items: [] }],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case FETCH_ITEMS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}
