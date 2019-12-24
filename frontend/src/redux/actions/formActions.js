import { ADD_ITEM } from './types'

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
    dispatch({
      type: ADD_ITEM,
      payload: formData,
    })
  } catch (error) {
    console.log(error)
  }
}
