import { ADD_ITEM, FETCH_ITEMS } from './types'

export const submitForm = formData => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const res = await response.json()
    if (response.status === 201)
      dispatch({
        type: ADD_ITEM,
        payload: res,
      })
  } catch (error) {
    console.log(error)
  }
}

export const fetchItems = () => async dispatch => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/list`)
    const res = await response.json()
    dispatch({
      type: FETCH_ITEMS,
      payload: res,
    })
  } catch (error) {
    console.log(error)
  }
}
